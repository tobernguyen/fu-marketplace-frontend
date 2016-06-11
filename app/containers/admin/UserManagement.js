import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { adminGetUsers, adminEditUser } from 'app/actions';
import UserList from 'app/components/admin/UserList';

class UserManagement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

UserManagement.path = '/users';
UserManagement.title = 'User management';
UserManagement.description = 'User management';
UserManagement.faIcon = 'fa-users';

export default UserManagement