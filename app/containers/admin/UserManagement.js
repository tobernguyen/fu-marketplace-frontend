import React, { Component } from 'react';

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
