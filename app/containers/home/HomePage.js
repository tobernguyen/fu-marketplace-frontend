import React, { Component, PropTypes } from 'react';
import Header from 'app/components/home/Header';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.children.props.route);
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
      <div>
        <Header onSignOut={this.props.onSignOut} />
        Newsfeed gone here
        {childPage}
      </div>
    );
  }
}

HomePage.propTypes = {
  onSignOut: PropTypes.func.isRequired
};
