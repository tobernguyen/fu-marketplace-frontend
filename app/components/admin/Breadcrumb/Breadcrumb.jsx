import React, { Component, PropTypes } from 'react';
import './Breadcrumb.scss';

export default class Breadcrumb extends Component {
  render() {
    return (
      <div className="admin-breadcrumb">
        <h2>
          <i className="fa fa-home"></i>
          Dashboard
          <span>Shop opening request & statistics</span>
        </h2>
      </div>
    );
  }
}
