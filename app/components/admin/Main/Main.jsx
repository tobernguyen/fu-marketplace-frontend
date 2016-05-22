import React, { Component, PropTypes } from 'react';
import './Main.scss';
import Header from '../Header';

export default class Main extends Component {
  render() {
    return (
      <div className="admin-main">
        <Header onAdminSignOut={this.props.onAdminSignOut} />
        {this.props.children}
      </div>
    );
  }
}

Main.propTypes = {
  onAdminSignOut: PropTypes.func.isRequired
};
