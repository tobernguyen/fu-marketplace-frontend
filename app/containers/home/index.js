import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
import BlockBookmarks from 'app/components/home/BlockBookmarks';
import ShopsFeed from './ShopsFeed';
import { getMetadata } from 'app/actions/common';
import { getCategories, getShipPlaces, getAggregations } from 'app/selectors';
import NavigationBar from './NavigationBar';
import { signOutGoogle } from 'app/actions';
import _ from 'lodash';
import { withRouter } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null
    };

    this.handleSearch = (keyword) => {
      this.props.router.push({
        pathname: '/',
        query: _.assign({}, this.state.query, {
          keyword: keyword
        })
      })
    }
  }

  componentWillMount() {
    if (_.isEmpty(this.props.categories)) {
      this.props.getMetadata();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      const { status } = nextProps.error;
      if (status === 401) {
        this.props.signOutGoogle();
      }
    }

    if (nextProps.location) {
      const { query } = nextProps.location;
      if (!_.isEqual(this.state.query, query)) {
        this.setState({
          query: query
        })
      }
    }
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
        }
    } = this.props;

    const { query } = this.state;
    return (
      <div className="home-page">
        <NavigationBar
          displaySearch={true}
          handleSearch={this.handleSearch}
          query={query} />
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
                  <ShopsFeed query={this.state.query} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.children && <Modal show={true} bsSize={this.props.modalSize}>
          {this.props.children}
        </Modal>}
      </div>
    );
  }
}

Home.propTypes = {
  signOutGoogle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { user, common } = state;
  return {
    error:        user.error,
    modalSize:    common.modalSize,
    modalMode:    common.modalMode,
    shipPlaces:   getShipPlaces(state),
    categories:   getCategories(state),
    aggregations: getAggregations(state)
  }
};


export default withRouter(connect(mapStateToProps, {
  getMetadata,
  signOutGoogle
})(Home))
