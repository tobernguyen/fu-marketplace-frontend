import React, { Component } from 'react';
import { Link } from 'react-router';
import './SideBar.scss';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/admin/SideBar/SideBar.i18n';


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
              <Link to="/admin" className={shortTitleClass}>FUM</Link>
            </li>
            <li>
              <Link to="/admin/dashboard" activeClassName="active">
                <i className="fa fa-th-large" />
                <span>
                  <FormattedMessage {...messages.sideBar.dashboard}/>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/users" activeClassName="active">
                <i className="fa fa-users" />
                <span>
                  <FormattedMessage {...messages.sideBar.userManagement} />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/shops" activeClassName="active">
                <i className="fa fa-shopping-bag" />
                <span>
                  <FormattedMessage {...messages.sideBar.shopManagement} />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/promotions" activeClassName="active">
                <i className="fa fa-arrow-up" />
                <span>
                  <FormattedMessage {...messages.sideBar.promotionManagement} />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/requests" activeClassName="active">
                <i className="fa fa-envelope" />
                <span>
                  <FormattedMessage {...messages.sideBar.requestManagement} />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/tickets" activeClassName="active">
                <i className="fa fa-ticket" />
                <span>
                  <FormattedMessage {...messages.sideBar.ticketManagement} />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/admin/changepwd" activeClassName="active">
                <i className="fa fa-key" />
                <span>
                  <FormattedMessage {...messages.sideBar.changePassword} />
                </span>
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
