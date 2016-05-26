import React, { Component, PropTypes } from 'react';
import './Breadcrumb.scss';
import classNames from 'classnames';

export default class Breadcrumb extends Component {
  render() {
    return (
      <div className="admin-breadcrumb">
        <h2>
          <i className={classNames('fa', this.props.activeRoute.component.faIcon)}></i>
          {this.props.activeRoute.component.title}
          <span>{this.props.activeRoute.component.description}</span>
        </h2>
      </div>
    );
  }
}
