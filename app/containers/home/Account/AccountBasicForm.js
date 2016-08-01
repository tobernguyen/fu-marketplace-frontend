import { reduxForm } from 'redux-form';
import FormAccountBasic from 'app/components/home/FormAccountBasic';

export const fields = [ 'room', 'phone' ];

const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.phone = {
      id: 'shop.form.validation.phone.required',
      defaultMessage: 'Phone number is required'
    };
  } else if (isNaN(Number(values.phone))) {
    errors.phone = {
      id: 'common.form.validation.phone.number',
      defaultMessage: 'Phone number must be numeric string'
    };
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    initialValues: {
      room:   user.currentUser ? user.currentUser.room : '',
      phone:  user.currentUser ? user.currentUser.phone: ''
    },
    avatarUploading: user.avatarUploading
  }
};

export default reduxForm({
  form: 'AccountBasicForm',
  fields,
  validate
},
mapStateToProps)(FormAccountBasic)
