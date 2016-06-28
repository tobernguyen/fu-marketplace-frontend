import { reduxForm } from 'redux-form';
import FormBuyNow from 'app/components/home/FormBuyNow';

export const fields = [ 'shipAddress', 'quantity', 'note' ];

const validate = values => {
  const errors = {};

  if (!values.shipAddress) {
    errors.shipAddress = 'shipAddress required';
  }

  if (!values.quantity) {
    errors.quantity = 'quantity required';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    initialValues: {
      quantity:  1
    }
  }
};

export default reduxForm({
  form: 'FormBuyNow',
  fields,
  validate
}, mapStateToProps)(FormBuyNow)
