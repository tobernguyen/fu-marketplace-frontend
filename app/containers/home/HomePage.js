import React, { Component, PropTypes } from 'react';
import Header from 'app/components/home/Header';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
import BlockBookmarks from 'app/components/home/BlockBookmarks';
import ShopsFeed from './ShopsFeed';
import { getCurrentUser, signOutGoogle } from '../../actions';
import { getMetadata } from 'app/actions/common';
import { getCategories, getShipPlaces, getUser } from 'app/selectors';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasChildren: true
    }
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

    this.setState({
      hasChildren: !(nextProps.children === null)
    });
  }

  render() {
    const { children } = this.props;
    var childPage;
    if (this.props.modalMode) {
      childPage = (
        <div>
          <Modal show={true} bsSize={this.props.modalSize}>
            {children}
          </Modal>
        </div>
      );
    } else {
      childPage = children;
    }

    const { currentUser, onSignOut, categories, shipPlaces } = this.props;
    return (
      <div className="home-page">
        <Header onSignOut={onSignOut} currentUser={currentUser} />
        <div className="container home-body">
          {(this.props.modalMode || !this.state.hasChildren) && <div className="row">
            <div className="col-md-3">
              <BlockItemList categories={categories}/>
              <BlockDormList shipPlaces={shipPlaces} />
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
          </div>}
          {childPage}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  onSignOut:      PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  signOutGoogle:  PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { user, common } = state;
  return {
    currentUser:  getUser(state),
    error:        user.error,
    modalSize:    common.modalSize,
    modalMode:    common.modalMode,
    shipPlaces:   getShipPlaces(state),
    categories:   getCategories(state)
  }
};


export default connect(mapStateToProps, {
  getCurrentUser,
  signOutGoogle,
  getMetadata
})(HomePage)
