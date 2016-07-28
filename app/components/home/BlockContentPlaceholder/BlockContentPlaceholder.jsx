import React, { Component, PropTypes } from 'react';
import './BlockContentPlaceholder.scss';

export default class BlockContentPlaceholder extends Component {
  render() {
    return (
      <div className="block-content-placeholder content-placeholder block">
        <div className="animated-background">
          <div className="background-masker header-top"></div>
          <div className="background-masker subheader-right-above"></div>
          <div className="background-masker header-bottom"></div>
          <div className="background-masker subheader-right"></div>
          <div className="background-masker subheader-bottom"></div>

          <div className="background-masker content-first-left"></div>
          <div className="background-masker content-second-delim"></div>
          <div className="background-masker content-second-left"></div>
          <div className="background-masker content-third-delim"></div>
          <div className="background-masker content-third-left"></div>
          <div className="background-masker content-forth-delim"></div>
          <div className="background-masker content-last"></div>
        </div>
      </div>
    )
  }
}
