import React, { Component, PropTypes } from 'react';
import UserManagementRow from 'app/components/admin/UserManagementRow';
import './UserList.scss';

export default class UserList extends Component {
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>User Name</td>
            <td>Email</td>
            <td>Full Name</td>
            <td>Room</td>
            <td>Phone</td>
            <td>Ban Status</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
        {this.props.users.map(user =>
          <UserManagementRow key={user.id} user={user} />
        )}
        </tbody>
      </table>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

UserList.defaultProps = {
  users: []
};
