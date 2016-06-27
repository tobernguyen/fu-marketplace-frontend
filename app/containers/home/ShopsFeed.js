import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockShopFeedItem from 'app/components/home/BlockShopFeedItem';
import { getShops } from 'app/actions/feed';

class ShopsFeed extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getShops();
  }

  render() {
    const { shops } = this.props;

    return (
      <div>
        {shops.map((shop, key) => {
          return (
            <BlockShopFeedItem key={key} shop={shop} />
          )
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { feed: { shops } } = state;
  return {
    shops: shops
  }
};

export default connect(mapStateToProps, {
  getShops
})(ShopsFeed)
