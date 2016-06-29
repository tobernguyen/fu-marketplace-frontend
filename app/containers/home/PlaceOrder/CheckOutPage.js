import React, { Component, PropTypes } from 'react';
import CheckOutForm from './CheckOutForm';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { removeItemFromCart } from 'app/actions/user';

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
      // TODO: @dong.do: Invoke API
      console.log(orderValues);
    };

    this.handleRemoveFromCartItem = (itemID) => {
      this.props.removeItemFromCart(itemID);
    }
  }

  render() {
    return (
      <Modal
        className="form-check-out"
        show={this.props.show}
        onHide={this.props.onHide}
        bsSize={this.props.bsSize}>
        <Modal.Header closeButton>
          <Modal.Title>
            Check out
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CheckOutForm
            onSubmit={this.handleCheckOutSubmit}
            removeFromCartItem={this.handleRemoveFromCartItem}
            items={this.props.items} />
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    items: user.cartItems
  }
};

CheckOutPage.propTypes = {
  removeItemFromCart: PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  removeItemFromCart
})(CheckOutPage)

