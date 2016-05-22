import React, { Component, PropTypes } from 'react';
import './SideBar.scss';

export default class SideBar extends Component {
  render() {
    return (
      <div className="sidebar navbar-default navbar-static-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            <li className="nav-header">
              <a href="#">FU Marketplace</a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-th-large"></i>
                <span className="nav-label">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-user"></i>
                <span className="nav-label">User Management</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-shopping-bag"></i>
                <span className="nav-label">Shop Management</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

