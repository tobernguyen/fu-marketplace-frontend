import React, { Component } from 'react';
import { connect } from 'react-redux';
import Infinite from 'react-infinite';
import BlockShopFeedItem from 'app/components/home/BlockShopFeedItem';
import { getShopsOfPage } from 'app/actions/feed';
import { getShopsFeed } from 'app/selectors';

class ShopsFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInfiniteLoading: false,
      loadedPage: 0,
      loadedShops: 0
    };

    this.handleInfiniteLoad = () => {
      this.props.getShopsOfPage(this.state.loadedPage + 1);
      this.setState({
        isInfiniteLoading: true
      });
    };

    this.elementInfiniteLoad = () => {
      return (
        <div>Loading</div>
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
  }

  render() {
    const { shops } = this.props;
    return (
      <div>
        <Infinite elementHeight={250}
                  containerHeight={window.innerHeight}
                  infiniteLoadBeginEdgeOffset={200}
                  onInfiniteLoad={this.handleInfiniteLoad}
                  loadingSpinnerDelegate={this.elementInfiniteLoad()}
                  isInfiniteLoading={this.state.isInfiniteLoading}
                  useWindowAsScrollContainer>
        {shops.map((shop, key) =>
          <BlockShopFeedItem key={key} shop={shop} />
        )}
        </Infinite>
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
