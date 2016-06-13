import React, { Component, PropTypes } from 'react';
import './BlockSellingItem.scss';

export default class BlockSellingItem extends Component {
  render() {
    return (
      <div className="block-selling-item col-md-3 col-xs-4">
        <div className="row item">
          <a href="#" className="item-image">
            <img className="img-responsive" src="http://www.giftstokolkata.com/image/cache/Restaurant-Food-250x250.jpg" />
          </a>
          <div className="info">
            <a href="#" className="name">Bún chả</a>
            <span className="price">18.000 ₫</span>
          </div>
        </div>
      </div>
    )
  }
}
