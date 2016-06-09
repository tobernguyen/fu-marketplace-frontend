import { reduxForm } from 'redux-form'
import FormRequestCreateShopInfo from 'app/components/home/FormRequestCreateShopInfo';

export const fields = [ 'phone', 'identityNumber', 'shopName', 'description', 'headOffice' ];

const validate = values => {
  const errors = {};
  if (!values.shopName) {
    errors.shopName = 'shop.form.validation.shopName.required';
  }

  if (!values.description) {
    errors.description = 'shop.form.validation.description.required';
  }

  if (!values.headOffice) {
    errors.headOffice = 'shop.form.validation.headOffice.required';
  }

  return errors;
};



export default reduxForm({
  form: 'wizard',
  fields,
  destroyOnUnmount: false,
  validate
})(FormRequestCreateShopInfo)
