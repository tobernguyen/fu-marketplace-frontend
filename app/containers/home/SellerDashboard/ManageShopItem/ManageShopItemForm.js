import { reduxForm } from 'redux-form';
import FormManageShopItem from 'app/components/home/FormManageShopItem';

export const fields = [ 'id', 'name', 'description', 'quantity', 'price', 'imageData', 'categoryId' ];

const validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = {
      id: 'shopItem.name.validation.required',
      defaultMessage: 'name required'
    };
  }

  if (values.quantity && values.quantity.length > 0) {
    if (isNaN(values.quantity)) {
      errors.quantity = {
        id: 'shopItem.quantity.validation.number',
        defaultMessage: 'quantity value must be number'
      };
    }
  }

  if (!values.price) {
    errors.price = {
      id: 'shopItem.price.validation.required',
      defaultMessage: 'price required'
    };
  } else if (isNaN(values.price)) {
    errors.price = {
      id: 'shopItem.price.validation.number',
      defaultMessage: 'price must be number'
    };
  }

  if (!props.updateMode && !values.imageData) {
    errors.imageData = {
      id: 'shopItem.photo.validation.required',
      defaultMessage: 'photo required'
    };
  }

  if (!values.categoryId) {
    errors.categoryId = {
      id: 'shopItem.categoryId.validation.required',
      defaultMessage: 'categoryId required'
    };
  }

  return errors;
};

const mapStateToProps = (state, ownProps) => {

  const { item } = state;

  let newState = {
    itemCategories: item.categories
  };

  if (ownProps.updateMode) {
    const { shop: { toBeUpdatedItem } } = state;
    const { id, name, description, price, quantity, categoryId, image } = toBeUpdatedItem || {};
    newState.oldItemImage = image;
    newState.initialValues = {
      id: id || '',
      name: name || '',
      description: description  || '',
      quantity: quantity  || '',
      price: price  || '',
      categoryId: categoryId || undefined
    }
  }

  return newState;
};

export default reduxForm({
  form: 'ManageShopItemForm',
  fields,
  validate
}, mapStateToProps)(FormManageShopItem)
