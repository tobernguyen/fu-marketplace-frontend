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
  } else if (values.name.length > 50) {
    errors.name = {
      id: 'shopItem.name.validation.maxLength',
      defaultMessage: 'item length must be shorter than 50 characters'
    };
  }

  if (values.quantity && values.quantity.length > 0) {
    if (isNaN(values.quantity)) {
      errors.quantity = {
        id: 'shopItem.quantity.validation.number',
        defaultMessage: 'quantity value must be number'
      };
    } else if (values.quantity < 0) {
      errors.quantity = {
        id: 'shopItem.quantity.validation.notNegative',
        defaultMessage: 'quantity must be greater than 0'
      };
    }
  }

  if (values.description && values.description.length > 125) {
    errors.description = {
      id: 'shopItem.description.validation.maxLength',
      defaultMessage: 'shop description must be shorter than 50 characters'
    };
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
  } else if (values.price < 0) {
    errors.price = {
      id: 'shopItem.price.validation.notNegative',
      defaultMessage: 'price must be greater than 0'
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

  const { item, shop } = state;

  let newState = {
    itemCategories: item.categories,
    formSubmitting: shop.formSubmitting
  };

  if (ownProps.updateMode) {
    const { id, name, description, price, quantity, categoryId, image } = shop.toBeUpdatedItem || {};
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
