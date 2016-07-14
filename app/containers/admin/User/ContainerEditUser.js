import React from 'react';
import { connect } from 'react-redux';
import FormEditUserInformation from 'app/components/admin/FormEditUserInformation';
import FormEditUserRole from 'app/components/admin/FormEditUserRole';
import FormEditUserBanStatus from 'app/components/admin/FormEditUserBanStatus';
import {
  adminGetUser,
  adminUpdateUserInformation,
  adminUpdateUserRole,
  adminBanUser,
  adminUnbanUser
} from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
class ContainerEditUser extends React.Component {
  componentWillMount() {
    this.props.adminGetUser(this.props.params.userId);
  }
  render() {

    const {
      userManagement,
      adminUpdateUserInformation,
      adminUpdateUserRole,
      adminUnbanUser,
      adminBanUser
    } = this.props;
    if(userManagement.isFetching || userManagement.isSubmitting) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return (
        <div className="container-fluid">
          <FormEditUserInformation adminUpdateUserInformation={(user) => adminUpdateUserInformation(user)}/>
          <hr />
          <FormEditUserRole
            user={userManagement.selectedUser}
            adminUpdateUserRole={adminUpdateUserRole}
            submitResult={userManagement.submitResult}
            isSubmitting={userManagement.isSubmitting}/>
          <hr />
          <FormEditUserBanStatus
            user={userManagement.selectedUser}
            adminUnbanUser={adminUnbanUser}
            adminBanUser={adminBanUser}
            submitResult={userManagement.submitResult}
            isSubmitting={userManagement.isSubmitting}/>
        </div>
      );
    }
  }
}

ContainerEditUser.path = ':userId/edit';
ContainerEditUser.title = 'Edit user';
ContainerEditUser.description = 'Edit user information/Assign role/Ban and release user';
ContainerEditUser.faIcon = 'fa-user';

const mapStateToProps = (state) => ({
  userManagement: state.admin.userManagement
});

export default connect(mapStateToProps, {
  adminGetUser,
  adminUpdateUserInformation,
  adminUpdateUserRole,
  adminBanUser,
  adminUnbanUser
})(ContainerEditUser);
