import {reduxForm} from 'redux-form';
import FormEditUserRole from 'app/components/admin/FormEditUserRole'
import { adminUpdateUserRole } from 'app/actions/admin';

const validate = (values) => {
  let errors = {};
  let hasErrors = false;
  
  return hasErrors && errors;
}

const mapStateToProps = (state, ownProps) => ({
  formStatus: state.admin.editUserFormStatus
});

export default reduxForm({
  form: 'EditUserRole',
  fields: [
    'id',
    'roles'
  ],
  null,
  null,
  validate
}, mapStateToProps, {
  adminUpdateUserRole
})(FormEditUserRole);