import React, { Component, PropTypes } from 'react';

export default class WrapperDashboard extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
