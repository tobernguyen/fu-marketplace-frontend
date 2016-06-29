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
  } else if (values.quantity && isNaN(Number(values.quantity))) {
    errors.quantity = 'number only';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    initialValues: {
      quantity:  1,
      note: '',
      shipAddress: ''
    },
    placeOrderResult: state.order.expressOrderResult
  }
};

export default reduxForm({
  form: 'FormBuyNow',
  fields,
  validate
}, mapStateToProps)(FormBuyNow)
