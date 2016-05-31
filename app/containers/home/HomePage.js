import React, { Component, PropTypes } from 'react';
import Header from 'app/components/home/Header';
import { Modal } from 'react-bootstrap';
import BlockItemList from 'app/components/home/BlockItemList';
import BlockDormList from 'app/components/home/BlockDormList';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
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

    return (
      <div className="home-page">
        <Header onSignOut={this.props.onSignOut} />
        <div className="container home-body">
          <div className="row">
            <div className="col-md-3">
              <BlockItemList />
              <BlockDormList />
            </div>
            <div className="col-md-6">
              Center
            </div>
            <div className="col-md-3">
              Right
            </div>
          </div>
        </div>
        {childPage}
      </div>
    );
  }
}

HomePage.propTypes = {
  onSignOut: PropTypes.func.isRequired
};
