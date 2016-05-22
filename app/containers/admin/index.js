import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAdminAuthStatus, adminAuthStatusIsUpdated, signOutAdmin } from '../../actions';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';


class Admin extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.checkAdminAuthStatus();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldUpdateAdminAuthStatus) {
      this.props.checkAdminAuthStatus();
      // Set shouldUpdateAuthStatus state to false
      this.props.adminAuthStatusIsUpdated();
    }
  }

  render() {
    var page;

    const { isAdminAuthenticated } = this.props;
    if (isAdminAuthenticated) {
      page = <AdminPage children={this.props.children} onAdminSignOut={this.props.signOutAdmin} />
    } else {
      page = <LoginPage />
    }

    return (
      <div>{page}</div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    isAdminAuthenticated:        state.authenticate.isAdminAuthenticated,
    shouldUpdateAdminAuthStatus: state.authenticate.shouldUpdateAdminAuthStatus
  }
};

Admin.propTypes = {
  checkAdminAuthStatus:  PropTypes.func.isRequired,
  isAdminAuthenticated:  PropTypes.bool.isRequired,
  signOutAdmin        :  PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  checkAdminAuthStatus,
  adminAuthStatusIsUpdated,
  signOutAdmin
})(Admin)
