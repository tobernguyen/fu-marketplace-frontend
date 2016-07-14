import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
import BlockBookmarks from 'app/components/home/BlockBookmarks';
import ShopsFeed from './ShopsFeed';
import { getCategories, getShipPlaces, getAggregations } from 'app/selectors';


class Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }
  render() {
    const {
      categories,
      shipPlaces,
      aggregations:
        {
          category,
          shipPlace,
          totalCategory,
          totalShipPlace
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
              totalCategory={totalCategory} />
            <BlockDormList
              query={query}
              shipPlaces={shipPlaces}
              shipPlaceCounter={shipPlace}
              totalShipPlace={totalShipPlace} />
            <BlockBookmarks />
          </div>
          <div className="col-md-9">
            <div className="row">
              <CarouselPinnedItems />
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
    query: state.common.query
  }
};


export default connect(mapStateToProps, {

})(Wrapper)
