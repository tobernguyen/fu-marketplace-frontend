import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'app/components/common/InfiniteScroll';
import BlockShopFeedItem from 'app/components/home/BlockShopFeedItem';
import { getShopsOfPage, clearShopsFeed, updateShop } from 'app/actions/feed';
import { getShopsFeed } from 'app/selectors';
import { PulseLoader } from 'halogen';
import { EVENTS } from 'app/shared/socketIOEvents';
import { toFilterParams } from 'app/shared/normalizeParams';
import _ from 'lodash';

class ShopsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      elements: []
    };

    this.loadMore = (page) => {
      let params = toFilterParams(this.state.query);
      params['page'] = page;
      this.props.getShopsOfPage(params)
    };

    this.handleFetchFeed = () => {
      this.props.clearShopsFeed();
      let params = toFilterParams(this.state.query);
      params['page'] = 1;
      this.props.getShopsOfPage(params);
    }
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on(EVENTS.SHOP_FEED_UPDATE, (shop) => {
      this.props.updateShop(shop);
    });
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off(EVENTS.SHOP_FEED_UPDATE);
  }

  componentWillReceiveProps(nextProps) {
    const { query, shops } = nextProps;
    if (query) {
      if (!_.isEqual(query, this.state.query)) {
        this.setState({
          query: query
        }, () => {
          this.handleFetchFeed()
        })
      }

      if (shops) {
        this.setState({
          elements: shops.map((shop) =>
            <BlockShopFeedItem key={shop.id} shop={shop} />
          )
        });
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.elements.length > 0 &&
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMore}
            hasMore={this.props.hasMore}
            loader={<PulseLoader className="feed-loader" color="#C0392B" size="12px" />}>
            {this.state.elements}
          </InfiniteScroll>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { feed } = state;
  return {
    shops: getShopsFeed(state),
    hasMore: feed.hasMore
  }
};

export default connect(mapStateToProps, {
  getShopsOfPage,
  clearShopsFeed,
  updateShop
})(ShopsFeed)
