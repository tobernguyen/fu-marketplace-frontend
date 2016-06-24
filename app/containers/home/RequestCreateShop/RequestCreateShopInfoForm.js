import { reduxForm } from 'redux-form';
import FormRequestCreateShopInfo from 'app/components/home/FormRequestCreateShopInfo';

export const fields = [ 'phone', 'identityNumber', 'shopName', 'description', 'address' ];

const validate = values => {
  const errors = {};
  if (!values.shopName) {
    errors.shopName = {
      id: 'shop.form.validation.shopName.required',
      defaultMessage: 'shop name is required'
    };
  }

  if (!values.description) {
    errors.description = {
      id: 'shop.form.validation.description.required',
      defaultMessage: 'shop description is required'
    };
  }

  if (!values.address) {
    errors.address = {
      id: 'shop.form.validation.address.required',
      defaultMessage: 'shop address is required'
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
