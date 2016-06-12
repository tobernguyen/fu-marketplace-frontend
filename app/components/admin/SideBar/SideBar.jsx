import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './SideBar.scss';
import classNames from 'classnames';

export default class SideBar extends Component {
  render() {
    const { isExpand, adminRoutes } = this.props;
    const sideBarClass = classNames({
      'sidebar': true,
      'navbar-default': true,
      'navbar-static-side': true,
      'sidebar-expanded': isExpand,
      'sidebar-collapsed': !isExpand
    });
    console.log('Current ROute: ');
    console.log(adminRoutes);
    let filteredAdminRoutes = adminRoutes;
    if(isExpand === true) {
      return (
        <div className={sideBarClass}>
          <div className="sidebar-collapse">
            <ul className="nav">
              <li className="nav-header">
                <a href="/admin">FU Marketplace</a>
              </li>
              {filteredAdminRoutes.map((item, index) =>
                <li key={index} className={classNames({'active': index == this.props.activeRouteIndex})}>
                  <Link to={`admin/${item.path}`}>
                    <i className={classNames('fa', item.component.faIcon)}></i> <span>{item.component.title}</span>
                    
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className={sideBarClass}>
          <div className="sidebar-collapse">
            <ul className="nav">
              <li className="nav-header text-center">
                <a href="/admin">FUM</a>
              </li>
              {filteredAdminRoutes.map((item, index) =>
                <li key={index} className={classNames({'active': index == this.props.activeRouteIndex})}>
                  <Link to={`admin/${item.path}`}>
                    <i className={classNames('fa', item.component.faIcon)}></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      );
    }
    
  }
}

SideBar.propsTypes = {
  activeRouteIndex: PropTypes.bool.isRequired
};
