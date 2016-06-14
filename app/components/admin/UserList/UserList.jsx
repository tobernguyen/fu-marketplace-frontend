import React, { Component, PropTypes } from 'react';
import UserListRow from 'app/components/admin/UserListRow';
import { Panel, Table } from 'react-bootstrap';
import './UserList.scss';

class UserList extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <div className="container-fluid">
        <Table striped condensed hover>
          <thead>
            <tr>
              <th className="col-lg-1">#</th>
              <th className="col-lg-2">Email</th>
              <th className="col-lg-3">Full Name</th>
              <th className="col-lg-2">Roles</th>
              <th className="col-lg-1">Banned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {this.props.users.map(user =>
            <UserListRow key={user.id} user={user} />
          )}
          </tbody>
        </Table>
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