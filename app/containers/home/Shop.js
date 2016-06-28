import React, { Component } from 'react';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import { connect } from 'react-redux';
import { updateModalMode, updateModalSize } from '../../actions/common';
import SellingItemList from './SellingItemList';
import { getUserShop, placeOrder } from 'app/actions/user';
import { Link } from 'react-router';
import _ from 'lodash';
import BuyNowForm from './PlaceOrder/BuyNowForm';
import classNames from 'classnames';

class Shop extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopValid: true,
        showModal: false
      };
      this.props.getUserShop(shopID);
    }

    this.handleAddToCard = (item) => {
      console.log('Add to card', item);
    };

    this.handleBuyNow = (item) => {
      this.setState({
        showModal: true,
        bsSize: "sm",
        item: item
      });
      console.log('Buy now', item)
    };

    this.close = () => {
      this.setState({ showModal: false });
    }

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
    return (
      <div className={classNames('shop-detail-modal', {'dim': this.state.showModal})}>
        {this.state.shopValid && <div>
          <BlockShopHeader shop={this.props.shop} sellerMode={false} />
          <SellingItemList
            shopID={this.props.params.shopID}
            sellerMode={false}
            addToCard={this.handleAddToCard}
            buyNow={this.handleBuyNow} />
          <Link to='/' className="close"><span>×</span></Link>
        </div>}
        <BuyNowForm
          show={this.state.showModal}
          onHide={this.close}
          bsSize={this.state.bsSize}
          item={this.state.item}
          onSubmit={this.handleExpressOrder}/>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { user: { currentViewedShop } } = state;

  const { seller, shipPlaces, Items } = currentViewedShop || {};
  const shop = _.pickBy(currentViewedShop, (value, key) => {
    return _.indexOf(['Items', 'shipPlaces', 'seller'], key) === -1
  });

  return {
    shop: shop,
    seller: seller,
    sellingItems: Items
  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  updateModalMode,
  getUserShop,
  placeOrder
})(Shop)
