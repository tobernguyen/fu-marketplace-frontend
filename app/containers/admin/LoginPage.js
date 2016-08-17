import { reduxForm } from 'redux-form';
import LoginForm from 'app/components/admin/LoginForm';
import { signInAdmin } from '../../actions';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = {
      id: 'loginForm.validation.email.blank',
      defaultMessage: 'Email can\'t be blank'
    };
    hasErrors = true;
  }
  if(!values.password || values.password.trim() === '') {
    errors.password = {
      id: 'loginForm.validation.password.blank',
      defaultMessage: 'Password can\'t be blank'
    };
    hasErrors = true;
  }
  return hasErrors && errors;
}

const reduxFormConfig = {
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
};

const mapStateToProps = (state) => ({
  loginResult: state.auth.loginResult
});

export default reduxForm(reduxFormConfig, mapStateToProps, {
  signInAdmin
})(LoginForm);
