import React, { Component, PropTypes } from 'react';
import './Main.scss';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb'

export default class Main extends Component {
  render() {
    return (
      <div className="admin-main">
        <Header onAdminSignOut={this.props.onAdminSignOut} />
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
