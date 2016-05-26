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
      // TODO: This routes depend on route configuration at routes.js. If order is changed, it wouldn't worked.
      const adminRoutes = this.props.routes[1].childRoutes || [];
      page = <AdminPage children={this.props.children} onAdminSignOut={this.props.signOutAdmin} adminRoutes={adminRoutes} />
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
    isAdminAuthenticated:        state.auth.isAdminAuthenticated,
    shouldUpdateAdminAuthStatus: state.auth.shouldUpdateAdminAuthStatus
  }
};

Admin.propTypes = {
  checkAdminAuthStatus:  PropTypes.func.isRequired,
  isAdminAuthenticated:  PropTypes.bool.isRequired,
  signOutAdmin        :  PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  checkAdminAuthStatus,
  adminAuthStatusIsUpdated,
  signOutAdmin
})(Admin)
