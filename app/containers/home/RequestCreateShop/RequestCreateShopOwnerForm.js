import { reduxForm } from 'redux-form'
import FormRequestCreateShopOwner from 'app/components/home/FormRequestCreateShopOwner';

export const fields = [ 'phone', 'identityNumber' ];

const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.phone = 'Required';
  }

  if (!values.identityNumber) {
    errors.identityNumber = 'Required';
  }

  return errors;
};



export default reduxForm({
  form: 'wizard',
  fields,
  destroyOnUnmount: false,
  validate
})(FormRequestCreateShopOwner)
