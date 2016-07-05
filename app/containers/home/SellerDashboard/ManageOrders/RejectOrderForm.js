import { reduxForm } from 'redux-form';
import FormRejectOrder from 'app/components/home/FormRejectOrder';

export const fields = ['reason'];

const validate = values => {
  let errors = {};
  let hasErrors = false;

  if(!values.reason) {
    errors.reason = 'reason is required';
    hasErrors = true;
  }

  return hasErrors &&  errors;
};

export default reduxForm({
  form: 'FormRejectOrder',
  fields,
  validate
})(FormRejectOrder);
