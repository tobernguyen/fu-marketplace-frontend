import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { adminGetUsers, adminEditUser } from 'app/actions';
import UserList from 'app/components/admin/UserList';

class UserManagement extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.adminGetUsers();
  }

  render() {
    return (
      <div>
        <UserList users={this.props.users} editUser={this.props.adminEditUser} />
      </div>
    );
  }
}

UserManagement.propTypes = {
  adminGetUsers:  PropTypes.func.isRequired,
  adminEditUser:  PropTypes.func.isRequired,
  users:          PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    users: state.admin.users
  }
};

export default connect(mapStateToProps, {
  adminGetUsers,
  adminEditUser
})(UserManagement)
