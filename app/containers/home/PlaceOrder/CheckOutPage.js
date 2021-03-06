import React, { Component, PropTypes } from 'react';
import CheckOutForm from './CheckOutForm';
import BlockEnablePushSuggestion from 'app/components/home/BlockEnablePushSuggestion';
import { Modal } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { removeItemFromCart } from 'app/actions/user';
import { placeOrder } from 'app/actions/order';
import { FormattedMessage } from 'react-intl';


class CheckOutPage extends Component {
  constructor(props) {
    super(props);

    this.handleCheckOutSubmit = (formValues) => {
      const { shopID } = this.props;
      const orderValues = _.assign({}, formValues, {
        note: formValues.note,
        shipAddress: formValues.shipAddress,
        items: _.map(formValues.items, (item) => ({
          id: item.id,
          quantity: item.quantity,
          note: item.note
        }))
      });
      this.props.placeOrder(shopID, orderValues);
    };

    this.handleRemoveFromCartItem = (itemID) => {
      this.props.removeItemFromCart(itemID);
    }
  }

  render() {
    const { pushNotificationEnabled, oneSignalRegistered } = this.props;
    return (
      <Modal
        className="form-check-out"
        show={this.props.show}
        onHide={this.props.onHide}
        bsSize={this.props.bsSize}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage {...{id: 'cart.title', defaultMessage: 'Shopping cart'}} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BlockEnablePushSuggestion pushNotificationEnabled={pushNotificationEnabled} oneSignalRegistered={oneSignalRegistered} />
          <CheckOutForm
            submitOrder={this.handleCheckOutSubmit}
            removeFromCartItem={this.handleRemoveFromCartItem}
            items={this.props.items}
            hideModal={this.props.onHide}
            isSubmitting={this.props.isSubmitting}
            />
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    items: user.cartItems,
    isSubmitting: state.order.isSubmitting
  }
};

CheckOutPage.propTypes = {
  removeItemFromCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  removeItemFromCart,
  placeOrder
})(CheckOutPage)
