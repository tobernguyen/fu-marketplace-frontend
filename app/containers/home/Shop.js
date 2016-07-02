import React, { Component } from 'react';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import { connect } from 'react-redux';
import { updateModalSize } from '../../actions/common';
import SellingItemList from './SellingItemList';
import { getUserShop } from 'app/actions/user';
import { placeOrder, clearOrderResult } from 'app/actions/order';
import { Link } from 'react-router';
import BuyNowForm from './PlaceOrder/BuyNowForm';
import CheckOutPage from './PlaceOrder/CheckOutPage';
import classNames from 'classnames';
import { getCurrentViewedShop } from 'app/selectors';

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
            sellingItems={this.props.sellingItems}
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
  const currentViewedShop = getCurrentViewedShop(state);
  const { shopInfo, seller, sellingItems } = currentViewedShop;
  return {
    shop: shopInfo,
    seller: seller,
    sellingItems: sellingItems
  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  getUserShop,
  placeOrder,
  clearOrderResult
})(Shop)
