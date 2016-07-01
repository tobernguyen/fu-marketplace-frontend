import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Header from 'app/components/home/Header';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
import BlockBookmarks from 'app/components/home/BlockBookmarks';
import ShopsFeed from './ShopsFeed';
import { signOutGoogle, getCurrentUser } from 'app/actions';
import { getMetadata } from 'app/actions/common';
import { getCategories, getShipPlaces, getUser, getAggregations } from 'app/selectors';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSignOut = () => {
      this.props.signOutGoogle();
    };
  }

  componentWillMount() {
    this.props.getCurrentUser();
    this.props.getMetadata();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      const { status } = nextProps.error;
      if (status === 401) {
        this.props.signOutGoogle();
      }
    }
  }


  render() {
    const {
      currentUser,
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
    return (
      <div className="home-page">
        <Header
          onSignOut={this.props.signOutGoogle}
          currentUser={currentUser} />
        <div className="container home-body">
          <div className="row">
            <div className="col-md-3">
              <BlockItemList
                categories={categories}
                categoryCounter={category}
                totalCategory={totalCategory} />
              <BlockDormList
                shipPlaces={shipPlaces}
                shipPlaceCounter={shipPlace}
                totalShipPlace={totalShipPlace} />
              <BlockBookmarks />
            </div>
            <div className="col-md-9">
              <div className="row">
                <CarouselPinnedItems />
                <div className="main-column col-md-12">
                  <ShopsFeed />
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
  signOutGoogle:    PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { user, common } = state;
  return {
    currentUser:  getUser(state),
    error:        user.error,
    modalSize:    common.modalSize,
    modalMode:    common.modalMode,
    shipPlaces:   getShipPlaces(state),
    categories:   getCategories(state),
    aggregations: getAggregations(state)
  }
};



export default connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle,
  getMetadata
})(Home)
