import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './SideBar.scss';
import classNames from 'classnames';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.toggleNavCollapse = this.toggleNavCollapse.bind(this);
  }

  toggleNavCollapse(e) {
    e.preventDefault();
    this.props.toggleExpandSideBar();
  }

  render() {
    const { isExpand } = this.props;
    const sideBarClass = classNames({
      'sidebar': true,
      'navbar-default': true,
      'navbar-static-side': true,
      'sidebar-expanded': isExpand,
      'sidebar-collapsed': !isExpand
    });
    const navHeaderClass = classNames({
      'nav-header': true,
      'text-center': !isExpand
    });
    const fullTitleClass = classNames({
      hide: !isExpand
    });
    const shortTitleClass = classNames({
      hide: isExpand
    });
    return (
      <div className={sideBarClass}>
        <div className="sidebar-collapse">
          <ul className="nav">
            <li className={navHeaderClass}>
              <Link to="/admin" className={fullTitleClass}>FU Marketplace</Link>
              <Link to="/admin" className={shortTitleClass}>FU Marketplace</Link>
            </li>
            <li>
              <Link to="/admin/dashboard" activeClassName="active">
                <i className="fa fa-th-large" /><span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" activeClassName="active">
                <i className="fa fa-users" /><span>User Management</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/shops" activeClassName="active">
                <i className="fa fa-shopping-bag" /><span>Shop Management</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/requests" activeClassName="active">
                <i className="fa fa-envelope" /><span>Request Management</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/changepwd" activeClassName="active">
                <i className="fa fa-key" /><span>Change password</span>
              </Link>
            </li>
          </ul>
          <div className="collapse-nav">
            <a className="toggle-nav-collapse" href="#" onClick={this.toggleNavCollapse}>
              {isExpand && <i className="fa fa-angle-left" />}
              {!isExpand && <i className="fa fa-angle-right" />}
           </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
