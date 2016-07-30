import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import BlockContentPlaceholder from 'app/components/home/BlockContentPlaceholder';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
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
    const loaded = categories.length > 0;
    return (
      <div className="container home-body">
        <div className="row">
          <div className="col-md-3">
            {loaded ? <BlockItemList
              query={query}
              categories={categories}
              categoryCounter={category}
              totalCategory={total} /> : <BlockContentPlaceholder />}

            {loaded ? <BlockDormList
              query={query}
              shipPlaces={shipPlaces}
              shipPlaceCounter={shipPlace}
              totalShipPlace={total} /> : <BlockContentPlaceholder />}
          </div>
          <div className="col-md-9">
            <div className="row">
              <CarouselPinnedItems query={query} pinnedShops={pinnedShops} />
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
