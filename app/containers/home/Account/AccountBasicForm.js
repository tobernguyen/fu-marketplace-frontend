import { reduxForm } from 'redux-form';
import FormAccountBasic from 'app/components/home/FormAccountBasic';

export const fields = [ 'room', 'phone' ];

const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.phone = 'user.account_basic.form.validation.phone.required';
  } else if (isNaN(Number(values.phone))) {
    errors.phone = 'common.form.validation.phone.number';
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    initialValues: {
      room:   user.currentUser ? user.currentUser.room : '',
      phone:  user.currentUser ? user.currentUser.phone: ''
    }
  }
};

export default reduxForm({
  form: 'AccountBasicForm',
  fields,
  validate
},
mapStateToProps)(FormAccountBasic)
