import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
import BlockBookmarks from 'app/components/home/BlockBookmarks';
import ShopsFeed from './ShopsFeed';
import { getShops, getTopFeedSlideShow } from 'app/actions/feed';
import { getCategories, getShipPlaces, getAggregations, getPinnedShops } from 'app/selectors';


class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  componentWillMount() {
    this.props.getShops();
    this.props.getTopFeedSlideShow();
  }

  render() {
    const {
      categories,
      shipPlaces,
      pinnedShops,
      aggregations:
        {
          category,
          shipPlace,
          total
        },
      query
    } = this.props;
    return (
      <div className="container home-body">
        <div className="row">
          <div className="col-md-3">
            <BlockItemList
              query={query}
              categories={categories}
              categoryCounter={category}
              totalCategory={total} />
            <BlockDormList
              query={query}
              shipPlaces={shipPlaces}
              shipPlaceCounter={shipPlace}
              totalShipPlace={total} />
          </div>
          <div className="col-md-9">
            <div className="row">
              <CarouselPinnedItems pinnedShops={pinnedShops} />
              <div className="main-column col-md-12">
                <ShopsFeed/>
              </div>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shipPlaces:   getShipPlaces(state),
    categories:   getCategories(state),
    aggregations: getAggregations(state),
    query:        state.common.query,
    pinnedShops:  getPinnedShops(state)
  }
};


export default connect(mapStateToProps, {
  getShops,
  getTopFeedSlideShow
})(Wrapper)
