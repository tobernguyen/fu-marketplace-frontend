import { reduxForm } from 'redux-form';
import FormRequestCreateShopInfo from 'app/components/home/FormRequestCreateShopInfo';

export const fields = [ 'phone', 'identityNumber', 'shopName', 'description', 'address', 'shopPhone' ];

const validate = values => {
  const errors = {};
  if (!values.shopName) {
    errors.shopName = {
      id: 'shop.form.validation.shopName.required',
      defaultMessage: 'shop name is required'
    };
  } else if (values.shopName.length > 255) {
    errors.shopName = {
      id: 'shop.form.validation.shopName.maxLength',
      defaultMessage: 'shop name must be shorter than 255'
    };
  }

  if (!values.description) {
    errors.description = {
      id: 'shop.form.validation.description.required',
      defaultMessage: 'shop description is required'
    };
  } else if (values.description.length > 255) {
    errors.description = {
      id: 'shop.form.validation.description.maxLength',
      defaultMessage: 'shop description must be shorter than 255'
    };
  }

  if (!values.address) {
    errors.address = {
      id: 'shop.form.validation.address.required',
      defaultMessage: 'shop address is required'
    };
  } else if (values.address.length > 255) {
    errors.address = {
      id: 'shop.form.validation.address.maxLength',
      defaultMessage: 'shop address is required'
    };
  }

  if (!values.shopPhone) {
    errors.shopPhone = {
      id: 'shop.form.validation.shopPhone.required',
      defaultMessage: 'shopPhone number is required'
    };
  } else if (isNaN(Number(values.shopPhone))) {
    errors.shopPhone = {
      id: 'common.form.validation.shopPhone.number',
      defaultMessage: 'shopPhone number is not valid'
    };
  } else if (values.shopPhone.length > 20) {
    errors.shopPhone = {
      id: 'common.form.validation.shopPhone.valid',
      defaultMessage: 'shopPhone number is not valid'
    };
  }

  return errors;
};



export default reduxForm({
  form: 'wizard',
  fields,
  destroyOnUnmount: false,
  validate
})(FormRequestCreateShopInfo)
