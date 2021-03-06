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
      queryLoaded: false
    };
  }

  componentWillMount() {
    this.props.getShops();
    this.props.getTopFeedSlideShow();
  }

  componentWillReceiveProps(nextProps) {
    const nextQuery = nextProps.query;
    const currentQuery = this.props.query;

    if (nextQuery && !this.state.queryLoaded) {
      this.setState({
        queryLoaded: true
      });

      let query = {};

      if (nextQuery.keyword) {
        query.keyword = nextQuery.keyword;
      }

      if (nextQuery.ship_to && !isNaN(nextQuery.ship_to)) {
        query.shipPlaceId = parseInt(nextQuery.ship_to);
      }

      this.props.getShops(query);
    }

    if (currentQuery && currentQuery) {
      if (nextQuery.keyword !== currentQuery.keyword || nextQuery.ship_to !== currentQuery.ship_to) {

        let query = {};

        if (nextQuery.keyword) {
          query.keyword = nextQuery.keyword;
        }

        if (nextQuery.ship_to && !isNaN(nextQuery.ship_to)) {
          query.shipPlaceId = parseInt(nextQuery.ship_to);
        }

        this.props.getShops(query);
      }
    }
  }


  render() {
    const {
      categories,
      shipPlaces,
      pinnedShops,
      aggregations:
        {
          category,
          total
        },
      query
    } = this.props;
    const loaded = categories.length > 0;
    return (
      <div className="container home-body">
        <div className="row">
          <div className="col-sm-3 filter-tools">
            {loaded ? <BlockItemList
              className="col-md-6"
              query={query}
              categories={categories}
              categoryCounter={category}
              totalCategory={total} /> : <BlockContentPlaceholder />}

            {loaded ? <BlockDormList
              className="col-md-6"
              query={query}
              shipPlaces={shipPlaces} /> : <BlockContentPlaceholder />}
          </div>
          <div className="col-sm-9">
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
