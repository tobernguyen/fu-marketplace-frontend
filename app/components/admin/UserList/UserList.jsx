import React, { Component, PropTypes } from 'react';
import UserListRow from 'app/components/admin/UserListRow';
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
          <UserListRow key={user.id} user={user} editUser={this.props.editUser}/>
        )}
        </tbody>
      </table>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  editUser: PropTypes.func.isRequired
};

UserList.defaultProps = {
  users: []
};
