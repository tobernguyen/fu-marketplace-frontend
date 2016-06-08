import { reduxForm } from 'redux-form';
import FormEditUserInformation from 'app/components/admin/FormEditUserInformation';
import { adminUpdateUserInformation } from 'app/actions/admin';

const validate = (values) => {
  let errors = {};
  let hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Email cannot be blank';
    hasErrors = true;
  }
  return hasErrors && errors;
}

const mapStateToProps = (state, ownProps) => ({
  formStatus: state.admin.editUserFormStatus,
  initialValues: state.admin.editUserFormStatus.user
});

export default reduxForm({
  form: 'EditUserInformation',
  fields: [
    'id',
    'email',
    'fullName',
    'gender',
    'identityNumber',
    'room',
    'phone'
  ],
  null,
  null,
  validate
}, mapStateToProps,{
  adminUpdateUserInformation
})(FormEditUserInformation);