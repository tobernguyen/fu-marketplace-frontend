import React, { Component, PropTypes } from 'react';
import './Main.scss';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb'
import ClassNames from 'classnames';

export default class Main extends Component {
  render() {
    const adminMainClass = ClassNames({
      'admin-main': true,
      'margin-left-220px': this.props.sideBarIsExpanded,
      'margin-left-60px': !this.props.sideBarIsExpanded
    });

    return (
      <div className={adminMainClass}>
        <Header
          onAdminSignOut={this.props.onAdminSignOut}
          toggleExpandSideBar={this.props.toggleExpandSideBar}/>
        <Breadcrumb activeRoute={this.props.activeRoute} />
        <div className="admin-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  onAdminSignOut: PropTypes.func.isRequired,
  activeRoute: PropTypes.object.isRequired
};
