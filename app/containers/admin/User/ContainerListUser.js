import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UserList from 'app/components/admin/UserList';
import { adminGetUsers } from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class UserListContainer extends React.Component {
  componentWillMount() {
    this.props.adminGetUsers();
  }
  
  render() {
    const { userManagement } = this.props;
    if(userManagement.isFetching) {
      return (
        <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <UserList users={userManagement.userList} />
      );
    }
  }
}


const mapStateToProps = (state) => ({
   userManagement: state.admin.userManagement
});

UserListContainer.path = '/users';
UserListContainer.title = 'User management';
UserListContainer.description = 'User management';
UserListContainer.faIcon = 'fa-users';

export default connect(mapStateToProps, {
  adminGetUsers
})(UserListContainer);