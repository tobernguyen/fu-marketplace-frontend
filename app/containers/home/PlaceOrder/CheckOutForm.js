import { reduxForm } from 'redux-form'
import FormCheckOut from 'app/components/home/FormCheckOut';

export const fields = [
  'note',
  'shipAddress',
  'items[].id',
  'items[].quantity',
  'items[].note',
  'items[].name',
  'items[].price',
  'items[].image'
];

const validate = values => {
  const errors = {};

  if (!values.shipAddress) {
    errors.shipAddress = {
      id: 'formCheckOut.validation.shipAddress.blank',
      defaultMessage: 'Ship address is required'
    };
  }

  if (values.items && values.items.length === 0) {
    errors.items = 'no item to check out';
  }

  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const items = ownProps.items.map((item) => {
    return {
      id: item.id,
      quantity: 1,
      note: '',
      name: item.name,
      price: item.price,
      image: item.image
    }
  });
  return {
    initialValues: {
      note:  '',
      shipAddress: '',
      items: items
    },
    orderResult: state.order.orderResult
  }
};

export default reduxForm({
  form: 'FormCheckOut',
  fields,
  validate
}, mapStateToProps)(FormCheckOut)
