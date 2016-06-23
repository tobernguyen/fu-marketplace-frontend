import { reduxForm } from 'redux-form';
import FormManageShopItem from 'app/components/home/FormManageShopItem';

export const fields = [ 'name', 'description', 'quantity', 'price', 'imageData', 'categoryId' ];

const validate = values => {
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

  if (!values.imageData) {
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

const mapStateToProps = (state) => {
  const { item } = state;
  return {
    itemCategories: item.categories
  }
};

export default reduxForm({
  form: 'ManageShopItemForm',
  fields,
  validate
}, mapStateToProps)(FormManageShopItem)
