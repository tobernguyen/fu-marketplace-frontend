import { reduxForm, addArrayValue } from 'redux-form'
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
    errors.shipAddress = 'shipAddress required';
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
    }
  }
};

export default reduxForm({
  form: 'FormCheckOut',
  fields,
  validate
}, mapStateToProps)(FormCheckOut)



