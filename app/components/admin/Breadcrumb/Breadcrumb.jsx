import React, { Component } from 'react';
import './Breadcrumb.scss';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

export default class Breadcrumb extends Component {
  render() {
    return (
      <div className="admin-breadcrumb">
        <h2>
          <i className={classNames('fa', this.props.activeRoute.component.faIcon)}></i>
            <FormattedMessage {...this.props.activeRoute.component.title} />
          <span><FormattedMessage {...this.props.activeRoute.component.description} /></span>
        </h2>
      </div>
    );
  }
}
