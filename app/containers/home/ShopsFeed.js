import React, { Component, PropTypes } from 'react';
import BlockShopFeedItem from 'app/components/home/BlockShopFeedItem';

export default class ShopsFeed extends Component {
  render() {
    return (
      <div>
        <BlockShopFeedItem />
        <BlockShopFeedItem />
        <BlockShopFeedItem />
        <BlockShopFeedItem />
      </div>
    );
  }
}
