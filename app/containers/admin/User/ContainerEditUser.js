import React, { PropTypes } from 'react';
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
    if(userManagement.isFetching) {
      return <div>...Loading</div>;
    } else {
      return (
        <div className="container">
          <FormEditUserInformation adminUpdateUserInformation={(user) => adminUpdateUserInformation(user)}/>
          <FormEditUserRole
            user={userManagement.selectedUser}
            adminUpdateUserRole={adminUpdateUserRole}
            submitResult={userManagement.submitResult}
            isSubmitting={userManagement.isSubmitting}/>
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