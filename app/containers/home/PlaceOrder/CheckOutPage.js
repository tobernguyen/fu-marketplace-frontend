import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

class CheckOutPage extends Component {
  render() {
    return (
      <Modal className="form-check-out" show={this.props.show} onHide={this.props.onHide} bsSize={this.props.bsSize}>
        <Modal.Header closeButton>
          <Modal.Title>
            Check out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Checkout screen
        </Modal.Body>
      </Modal>
    )
  }
}

CheckOutPage.propTypes = {
  items: PropTypes.array.isRequired
};

export default CheckOutPage;
