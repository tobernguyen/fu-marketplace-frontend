import { connect } from 'react-redux';
import FormBanUser from 'app/components/admin/FormBanUser';
import { adminBanUser, adminUnbanUser } from 'app/actions/admin';

const mapStateToProps = (state) => ({
  formStatus: state.admin.editUserFormStatus
});

export default connect(mapStateToProps, {
  adminBanUser,
  adminUnbanUser
})(FormBanUser);