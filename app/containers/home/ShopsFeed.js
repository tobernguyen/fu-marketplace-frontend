import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'app/components/common/InfiniteScroll';
import BlockShopFeedItem from 'app/components/home/BlockShopFeedItem';
import BlockFeedItemPlaceholder from 'app/components/home/BlockFeedItemPlaceholder';
import BlockNoShopMessage from 'app/components/home/BlockNoShopMessage';
import { getShopsOfPage, clearShopsFeed, updateShop } from 'app/actions/feed';
import { getShopsFeed } from 'app/selectors';
import { EVENTS } from 'app/shared/socketIOEvents';
import { toFilterParams } from 'app/shared/normalizeParams';
import _ from 'lodash';

class ShopsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      elements: [],
      wsLoaded: false
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

  componentWillMount() {
    if (this.props.query) {
      this.setState({
        query: this.props.query
      }, () => {
        this.handleFetchFeed()
      })
    }
  }

  componentWillUnmount() {
    const { socket } = this.props;
    if (socket) {
      socket.off(EVENTS.SHOP_FEED_UPDATE);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { query, shops, socket } = nextProps;
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
            <BlockShopFeedItem query={this.state.query} key={shop.id} shop={shop} />
          )
        });
      }
    }

    if (socket && !this.state.wsLoaded) {
      this.setState({
        wsLoaded: true
      });
      socket.on(EVENTS.SHOP_FEED_UPDATE, (shop) => {
        this.props.updateShop(shop);
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.elements.length > 0 &&
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMore}
            hasMore={this.props.hasMore}>
            {this.state.elements}
          </InfiniteScroll>}
        {this.props.firstLoad && <BlockFeedItemPlaceholder />}
        {this.props.noShop && <BlockNoShopMessage />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { feed } = state;
  return {
    shops: getShopsFeed(state),
    hasMore: feed.hasMore,
    socket: state.common.socket,
    query: state.common.query,
    firstLoad: feed.firstLoad,
    noShop: feed.noShop
  }
};

export default connect(mapStateToProps, {
  getShopsOfPage,
  clearShopsFeed,
  updateShop
})(ShopsFeed)
