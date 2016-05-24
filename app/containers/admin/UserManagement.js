import React, { Component, PropTypes } from 'react';
import UserManagement from 'app/components/admin/UserManagement';
import { connect } from 'react-redux';
import { adminGetUsers } from 'app/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(adminGetUsers());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
