import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './SideBar.scss';
import classNames from 'classnames';

export default class SideBar extends Component {
  render() {
    return (
      <div className="sidebar navbar-default navbar-static-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            <li className="nav-header">
              <a href="/admin">FU Marketplace</a>
            </li>
            {this.props.adminRoutes.map((item, index) =>
              <li key={index}>
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

