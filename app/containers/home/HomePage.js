import React, { Component, PropTypes } from 'react';
import Header from 'app/components/home/Header';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';
import CarouselPinnedItems from 'app/components/home/CarouselPinnedItems';
import BlockBookmarks from 'app/components/home/BlockBookmarks';
import ShopsFeed from './ShopsFeed';
import { getCurrentUser } from '../../actions';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { children } = this.props;
    var overlayMode = false;
    var bsSize = null;
    if (children) {
      overlayMode = children.props.route.overlayMode;
      bsSize = children.props.route.bsSize || null;
    }
    var childPage;
    if (overlayMode) {
      childPage = (
        <div>
          <Modal show={true} bsSize={bsSize}>
            {children}
          </Modal>
        </div>
      );
    } else {
      childPage = children;
    }

    const { currentUser, onSignOut } = this.props;
    return (
      <div className="home-page">
        <Header onSignOut={onSignOut} currentUser={currentUser} />
        <div className="container home-body">
          <div className="row">
            <div className="col-md-3">
              <BlockItemList />
              <BlockDormList />
            </div>
            <div className="col-md-9">
              <div className="row">
                <CarouselPinnedItems />
                <div className="main-column">
                  <div className="col-md-8 feed">
                    <ShopsFeed />
                  </div>
                  <div className="col-md-4">
                    <BlockBookmarks />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {childPage}
      </div>
    );
  }
}

HomePage.propTypes = {
  onSignOut:      PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    currentUser: user.currentUser
  }
};


export default connect(mapStateToProps, {
  getCurrentUser
})(HomePage)
