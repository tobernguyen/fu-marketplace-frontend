import React, { Component, PropTypes } from 'react';
import Main from 'app/components/admin/Main';
import SideBar from 'app/components/admin/SideBar';

export default class AdminPage extends Component {
  render() {
    const { adminRoutes, activeRoute, onAdminSignOut, children } = this.props;
    const activeRouteIndex = adminRoutes.indexOf(activeRoute);
    return (
      <div className="admin-page">
        <SideBar adminRoutes={adminRoutes} activeRouteIndex={activeRouteIndex} />
        <Main children={children}
              onAdminSignOut={onAdminSignOut}
              activeRoute={activeRoute}/>
      </div>
    )
  }
}

AdminPage.propTypes = {
  onAdminSignOut: PropTypes.func.isRequired,
  adminRoutes:    PropTypes.array.isRequired,
  activeRoute:    PropTypes.object.isRequired
};
