import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAdminAuthStatus, adminAuthStatusIsUpdated, signOutAdmin } from '../../actions';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unauthorized: false
    }
  }

  componentWillMount() {
    this.props.checkAdminAuthStatus();
    document.body.classList.add('admin-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('admin-page');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      const { status } = nextProps.error;
      if (status === 401 && !this.state.unauthorized) {
        this.props.signOutAdmin();
        this.setState({
          unauthorized: true
        });
      }
    }

    if (nextProps.shouldUpdateAdminAuthStatus) {
      this.props.checkAdminAuthStatus();
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
  const { auth, admin } = state;
  return {
    isAdminAuthenticated:         auth.isAdminAuthenticated,
    shouldUpdateAdminAuthStatus:  auth.shouldUpdateAdminAuthStatus,
    error:                        admin.error
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
