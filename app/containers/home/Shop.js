import React, { Component } from 'react';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import { connect } from 'react-redux';
import { updateModalMode, updateModalSize } from '../../actions/common';
import SellingItemList from './SellingItemList';
import { getUserShop } from 'app/actions/user';
import { placeOrder, clearOrderResult } from 'app/actions/order';
import { Link } from 'react-router';
import _ from 'lodash';
import BuyNowForm from './PlaceOrder/BuyNowForm';
import CheckOutPage from './PlaceOrder/CheckOutPage';
import classNames from 'classnames';

class Shop extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = { shopValid: true, showModal: false };
      this.props.getUserShop(shopID);
    }

    this.handleCheckOut = () => {
      this.setState({ showModal: true, bsSize: null });
    };

    this.handleBuyNow = (item) => {
      this.setState({ showModal: true, bsSize: 'sm', item: item });
    };

    this.close = () => {
      this.setState({ showModal: false, item: null });
      this.props.clearOrderResult();
      this.setState({ showModal: false });
    };

    this.handleExpressOrder = (formData) => {
      const { shopID } = this.props.params;
      const { item } = this.state;
      const order = {
        items: [
          {
            id: item.id,
            quantity: formData.quantity,
            note: formData.note
          }
        ],
        note: '',
        shipAddress: formData.shipAddress
      };
      this.props.placeOrder(shopID, order);
    };
  }

  componentWillMount() {
    this.props.updateModalSize('lg');
    this.props.updateModalMode(true);
  }

  componentWillUnmount() {
    this.props.updateModalMode(false);
  }

  render() {
    let orderForm;
    if (this.state.item) {
      orderForm = <BuyNowForm
        show={this.state.showModal}
        onHide={this.close}
        bsSize={this.state.bsSize}
        item={this.state.item}
        onSubmit={this.handleExpressOrder} />
    } else {
      orderForm = <CheckOutPage
        shopID={this.props.params.shopID}
        show={this.state.showModal}
        onHide={this.close}
        bsSize={this.state.bsSize} />
    }
    return (
      <div className={classNames('shop-detail-modal', {'dim': this.state.showModal})}>
        {this.state.shopValid && <div>
          <BlockShopHeader shop={this.props.shop} sellerMode={false} />
          <SellingItemList
            shopID={parseInt(this.props.params.shopID)}
            sellerMode={false}
            checkOut={this.handleCheckOut}
            buyNow={this.handleBuyNow} />
          <Link to='/' className="close"><span>×</span></Link>
        </div>}
        {orderForm}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { user: { currentViewedShop } } = state;

  const { seller } = currentViewedShop;
  const shop = _.pickBy(currentViewedShop, (value, key) => {
    return _.indexOf(['Items', 'shipPlaces', 'seller'], key) === -1
  });

  return {
    shop: shop,
    seller: seller
  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  updateModalMode,
  getUserShop,
  placeOrder,
  clearOrderResult
})(Shop)
