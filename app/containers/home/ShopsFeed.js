import React, { Component } from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';
import BlockShopFeedItem from 'app/components/home/BlockShopFeedItem';
import { getShopsOfPage } from 'app/actions/feed';
import { getShopsFeed } from 'app/selectors';
import { PulseLoader } from 'halogen';

class ShopsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfiniteLoading: false,
      loadedPage: 0,
      loadedShops: 0,
      query: null
    };

    this.handleInfiniteLoad = () => {
      const { query } = this.state;
      let params = {
        page: this.state.loadedPage + 1
      };

      if (query) {
        if (query.hasOwnProperty('ship_to')) {
          params.shipPlaceId = parseInt(query['ship_to'])
        }
        if (query.hasOwnProperty('category')) {
          params.categoryIds = [parseInt(query['category'])]
        }
      }
      this.props.getShopsOfPage(params, this.state.loadedPage === 0);
      this.setState({
        isInfiniteLoading: true
      });
    };

    this.elementInfiniteLoad = () => {
      return (
        <PulseLoader className="feed-loader" color="#C0392B" size="12px" />
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shops && nextProps.shops.length > 0) {
      if (nextProps.shops.length > this.state.loadedShops) {
        this.setState({
          loadedShops: nextProps.shops.length,
          loadedPage: this.state.loadedPage + 1
        })
      }
      this.setState({
        isInfiniteLoading: false
      })
    }

    if (nextProps.query) {
      const { query } = nextProps;
      if (!_.isEqual(this.state.query, query)) {
        this.setState({
          query: query,
          loadedShops: 0,
          loadedPage: 0
        }, () => {
          this.handleInfiniteLoad()
        });
      }
    }
  }

  render() {
    const { shops } = this.props;
    return (
      <div>
        {this.state.query && <Infinite elementHeight={250}
                                       containerHeight={window.innerHeight}
                                       infiniteLoadBeginEdgeOffset={200}
                                       onInfiniteLoad={this.handleInfiniteLoad}
                                       loadingSpinnerDelegate={this.elementInfiniteLoad()}
                                       isInfiniteLoading={this.state.isInfiniteLoading}
                                       useWindowAsScrollContainer>
          {shops.map((shop, key) =>
            <BlockShopFeedItem key={key} shop={shop} />
          )}
        </Infinite>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shops: getShopsFeed(state)
  }
};

export default connect(mapStateToProps, {
  getShopsOfPage
})(ShopsFeed)
