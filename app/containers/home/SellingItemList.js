import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockSellingItemList from 'app/components/home/BlockSellingItemList';
import { getSellerShopItems } from 'app/actions/shop';
import { addItemToCart } from 'app/actions/user';

class SellingItemList extends Component {
  constructor(props) {
    super(props);

    const { shopID, sellerMode } = this.props;
    if (sellerMode) {
      this.props.getSellerShopItems(shopID);
    }

    this.handleAddToCart = (item) => {
      this.props.addItemToCart(item);
    }
  }

  render() {
    const { checkOut, buyNow } = this.props;
    return (
      <BlockSellingItemList
        items={this.props.sellingItems}
        shopID={this.props.shopID}
        checkOut={checkOut}
        buyNow={buyNow}
        addToCart={this.handleAddToCart}
        cartItems={this.props.cartItems}
        sellerMode={this.props.sellerMode} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { shop, user: { cartItems, currentViewedShop } } = state;
  if (ownProps.sellerMode) {
    return {
      sellingItems: shop.sellingItems
    }
  } else {
    return {
      cartItems: cartItems,
      sellingItems: currentViewedShop.items || []
    }
  }

};

SellingItemList.propTypes = {
  sellerMode: PropTypes.bool.isRequired,
  shopID: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {
  getSellerShopItems,
  addItemToCart
})(SellingItemList)
