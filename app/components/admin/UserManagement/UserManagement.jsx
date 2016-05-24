import React, { Component, PropTypes } from 'react';
import UserManagementRow from 'app/components/admin/UserManagementRow';
import { adminGetUser } from 'app/actions';
import './UserManagement.scss';

export default class UserManagement extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  getData() {
    return this.props.users;
  }
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
          {this.getData().map(user =>
            <UserManagementRow key={user.id} user={user} />
          )}
        </tbody>
      </table>
    );
  }
}
