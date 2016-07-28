import React, { Component, PropTypes } from 'react';
import './BlockFeedItemPlaceholder.scss';

export default class BlockFeedItemPlaceholder extends Component {
  render() {
    return (
      <div className="block-feed-item-placeholder content-placeholder block row block-shop-feed-item">
        <div className="animated-background">
          <div className="background-masker first-delim"></div>
          <div className="background-masker first-line"></div>
          <div className="background-masker second-delim"></div>
          <div className="background-masker second-line"></div>
          <div className="background-masker third-delim"></div>
          <div className="background-masker third-line"></div>
          <div className="background-masker forth-delim"></div>
          <div className="background-masker fifth-delim"></div>
          <div className="background-masker forth-line"></div>
        </div>
      </div>
    )
  }
}
