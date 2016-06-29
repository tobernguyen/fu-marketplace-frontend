import React, { Component, PropTypes } from 'react';
import CheckOutForm from './CheckOutForm';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';

class CheckOutPage extends Component {
  constructor(props) {
    super(props);
    this.handleCheckOutSubmit = (formValues) => {
      const orderValues = _.assign({}, formValues, {
        note: formValues.note,
        shipAddress: formValues.shipAddress,
        items: _.map(formValues.items, (item) => ({
          id: item.id,
          quantity: item.quantity,
          note: item.note
        }))
      });
      // TODO:
      console.log(orderValues);
    }
  }

  render() {
    return (
      <Modal className="form-check-out" show={this.props.show} onHide={this.props.onHide} bsSize={this.props.bsSize}>
        <Modal.Header closeButton>
          <Modal.Title>
            Check out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CheckOutForm onSubmit={this.handleCheckOutSubmit} items={this.props.items} />
        </Modal.Body>
      </Modal>
    )
  }
}

CheckOutPage.propTypes = {
  items: PropTypes.array.isRequired
};

export default CheckOutPage;
