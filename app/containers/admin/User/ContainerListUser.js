import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UserList from 'app/components/admin/UserList';
import { adminGetUsers } from 'app/actions/admin';

class UserListContainer extends React.Component {
  componentWillMount() {
    this.props.adminGetUsers();
  }
  
  render() {
    const { userManagement } = this.props;
    if(userManagement.isFetching) {
      return (
        <div>
          ...Loading
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

export default connect(mapStateToProps, {
  adminGetUsers
})(UserListContainer);