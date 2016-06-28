import { reduxForm } from 'redux-form';
import FormBuyNow from 'app/components/home/FormBuyNow';

export const fields = [ 'shipAddress', 'quantity', 'note' ];

const validate = values => {
  const errors = {};

  if (!values.shipAddress) {
    errors.shipAddress = 'shipAddress required';
  } else if (values.shipAddress && !values.shipAddress.match(/([A-F]{1})([0-9]{3})/g)) {
    errors.shipAddress = 'wrong room format';
  }

  if (!values.quantity) {
    errors.quantity = 'quantity required';
  } else if (values.quantity && isNaN(Number(values.quantity))) {
    errors.quantity = 'number only';
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
