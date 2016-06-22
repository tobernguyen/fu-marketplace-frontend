import { reduxForm } from 'redux-form';
import FormManageShopItem from 'app/components/home/FormManageShopItem';

export const fields = [ 'name', 'description', 'quantity', 'price', 'imageData', 'categoryId' ];

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'shop.shopItem.validation.name.required';
  }

  if (!values.quantity) {
    errors.quantity = 'shop.shopItem.validation.quantity.required';
  }

  if (!values.price) {
    errors.price = 'shop.shopItem.validation.price.required';
  }

  if (!values.imageData) {
    errors.imageData = 'shop.shopItem.validation.imageData.required';
  }

  if (!values.categoryId) {
    errors.categoryId = 'shop.shopItem.validation.categoryId.required';
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
