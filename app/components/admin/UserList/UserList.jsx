import React, { Component, PropTypes } from 'react';
import UserListRow from 'app/components/admin/UserListRow';
import './UserList.scss';

class UserList extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Identity Number</th>
              <th>Room</th>
              <th>Phone</th>
              <th>Roles</th>
              <th>Banned</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.props.users.map(user =>
            <UserListRow key={user.id} user={user} />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
};

UserList.defaultProps = {
  users: []
};

export default UserList;