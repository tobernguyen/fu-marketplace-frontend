import React, { Component, PropTypes } from 'react';
import './Main.scss';
import Breadcrumb from '../Breadcrumb'
import ClassNames from 'classnames';

export default class Main extends Component {
  render() {
    const adminMainClass = ClassNames({
      'admin-main': true,
      'margin-left-250px': this.props.sideBarIsExpanded,
      'margin-left-60px': !this.props.sideBarIsExpanded
    });

    return (
      <div className={adminMainClass}>
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
