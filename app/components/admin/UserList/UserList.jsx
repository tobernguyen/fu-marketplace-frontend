import React, { Component, PropTypes } from 'react';
import UserListRow from 'app/components/admin/UserListRow';
import ModalEditUser from 'app/components/admin/ModalEditUser';
import './UserList.scss';

class UserList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showUserEditModal: false,
      userToBeEdited: {}
    };
    
    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
  }
  
  openEditModal(userToBeEdited) {
    this.setState({
      userToBeEdited,
      showUserEditModal: true
    });
  }
  
  closeEditModal() {
    this.setState({
      showUserEditModal: false
    });
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
            <UserListRow key={user.id} user={user} openEditModal={this.openEditModal} />
          )}
          </tbody>
        </table>
        <ModalEditUser
          showModal={this.state.showUserEditModal}
          closeModal={this.closeEditModal}
          user={this.state.userToBeEdited}
          saveUser={this.props.editUser}
          />
      </div>
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

export default UserList;