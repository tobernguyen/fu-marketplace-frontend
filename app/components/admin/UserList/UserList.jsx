import React, { Component, PropTypes } from 'react';
import UserManagementRow from 'app/components/admin/UserManagementRow';
import './UserList.scss';

export default class UserList extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Room</th>
            <th>Phone</th>
            <th>Banned</th>
            <th></th>
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
