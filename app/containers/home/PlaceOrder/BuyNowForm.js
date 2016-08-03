import { reduxForm } from 'redux-form';
import FormBuyNow from 'app/components/home/FormBuyNow';
export const fields = [ 'shipAddress', 'quantity', 'note' ];

const validate = values => {
  const errors = {};

  if (!values.shipAddress) {
    errors.shipAddress = {
      id: 'formCheckOut.validation.shipAddress.blank',
      defaultMessage: 'Ship address is required'
    };
  }

  if (values.note && values.note.length > 255 ) {
    errors.note = {
      id: 'formCheckOut.validation.note.long',
      defaultMessage: 'Order note must be shorter than 255 characters'
    };
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state;
  const shipAddress = user.currentUser.room || '';
  return {
    initialValues: {
      quantity:  1,
      note: '',
      shipAddress: shipAddress
    },
    placeOrderResult: state.order.orderResult
  }
};

export default reduxForm({
  form: 'FormBuyNow',
  fields,
  validate
}, mapStateToProps)(FormBuyNow)
