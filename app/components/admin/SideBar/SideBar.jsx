import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './SideBar.scss';

export default class SideBar extends Component {
  render() {
    return (
      <div className="sidebar navbar-default navbar-static-side">
        <div className="sidebar-collapse">
          <ul className="nav">
            <li className="nav-header">
              <a href="/admin">FU Marketplace</a>
            </li>
            <li>
              <Link to="/admin/dashboard"><i className="fa fa-th-large"></i> Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/users"><i className="fa fa-user"></i> User Management</Link>
            </li>
            <li>
              <Link to="/admin/shops"><i className="fa fa-shopping-bag"></i> Shop Management</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

