import { reduxForm } from 'redux-form'
import FormRequestCreateShopInfo from 'app/components/home/FormRequestCreateShopInfo';

export const fields = [ 'phone', 'identityNumber', 'shopName', 'description', 'headOffice' ];

const validate = values => {
  const errors = {};
  if (!values.shopName) {
    errors.shopName = 'Required';
  }

  if (!values.description) {
    errors.description = 'Required';
  }

  if (!values.headOffice) {
    errors.headOffice = 'Required';
  }

  return errors;
};



export default reduxForm({
  form: 'wizard',
  fields,
  destroyOnUnmount: false,
  validate
})(FormRequestCreateShopInfo)
