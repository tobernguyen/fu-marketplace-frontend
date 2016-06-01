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
      const routes = this.props.routes;
      const adminRoutes = routes[1].childRoutes || [];
      const activeRoute = routes[routes.length - 1];
      page = <AdminPage children={this.props.children}
                        onAdminSignOut={this.props.signOutAdmin}
                        adminRoutes={adminRoutes}
                        activeRoute={activeRoute} />
    } else {
      page = <LoginPage />
    }

    return (
      <div>{page}</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  return {
    isAdminAuthenticated:         auth.isAdminAuthenticated,
    shouldUpdateAdminAuthStatus:  auth.shouldUpdateAdminAuthStatus
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
