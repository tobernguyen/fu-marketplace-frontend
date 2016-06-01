import { reduxForm } from 'redux-form';
import LoginForm from 'app/components/admin/LoginForm';
import { signInAdmin } from '../../actions';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if(!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  return hasErrors && errors;
}

const mapStateToProps = (state) => {

};


const reduxFormConfig = {
  form: 'LoginForm',
  fields: ['email', 'password'],
  null,
  null,
  validate
};

export default reduxForm(reduxFormConfig, mapStateToProps, {
  signInAdmin
})(LoginForm);
