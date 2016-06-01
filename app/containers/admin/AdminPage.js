import React, { Component, PropTypes } from 'react';
import Main from 'app/components/admin/Main';
import SideBar from 'app/components/admin/SideBar';

export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideBarIsExpanded: true
    };
    this.toggleExpandSideBar = this.toggleExpandSideBar.bind(this);
  }

  toggleExpandSideBar() {
    this.setState({ sideBarIsExpanded: !this.state.sideBarIsExpanded });
  }

  render() {
    const { adminRoutes, activeRoute, onAdminSignOut, children } = this.props;
    const activeRouteIndex = adminRoutes.indexOf(activeRoute);
    return (
      <div className="admin-page">
        <SideBar
          adminRoutes={adminRoutes}
          activeRouteIndex={activeRouteIndex}
          isExpand={this.state.sideBarIsExpanded}
          />
        <Main
          children={children}
          onAdminSignOut={onAdminSignOut}
          activeRoute={activeRoute}
          sideBarIsExpanded={this.state.sideBarIsExpanded}
          toggleExpandSideBar={this.toggleExpandSideBar}
          />
      </div>
    )
  }
}

AdminPage.propTypes = {
  onAdminSignOut: PropTypes.func.isRequired,
  adminRoutes:    PropTypes.array.isRequired,
  activeRoute:    PropTypes.object.isRequired
};
