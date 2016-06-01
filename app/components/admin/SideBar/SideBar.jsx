import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './SideBar.scss';
import classNames from 'classnames';

export default class SideBar extends Component {
  render() {
    const sideBarClass = classNames({
      'sidebar': true,
      'navbar-default': true,
      'navbar-static-side': true,
      'hide': !this.props.isExpand
    });

    return (
      <div className={sideBarClass}>
        <div className="sidebar-collapse">
          <ul className="nav">
            <li className="nav-header">
              <a href="/admin">FU Marketplace</a>
            </li>
            {this.props.adminRoutes.map((item, index) =>
              <li key={index} className={classNames({'active': index == this.props.activeRouteIndex})}>
                <Link to={`admin/${item.path}`}>
                  <i className={classNames('fa', item.component.faIcon)}></i> {item.component.title}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

SideBar.propsTypes = {
  activeRouteIndex: PropTypes.bool.isRequired
};
