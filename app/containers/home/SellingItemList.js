import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockSellingItemList from 'app/components/home/BlockSellingItemList';
import { getSellerShopItems } from 'app/actions/shop';
import { addItemToCart } from 'app/actions/user';
import { getHashCategories } from 'app/selectors';

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
    const { checkOut, buyNow, sellingItems, shopID, cartItems, sellerMode, allCategories } = this.props;
    return (
      <BlockSellingItemList
        items={sellingItems}
        shopID={shopID}
        checkOut={checkOut}
        buyNow={buyNow}
        allCategories={allCategories}
        addToCart={this.handleAddToCart}
        cartItems={cartItems}
        sellerMode={sellerMode} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { shop: { sellingItems }, user: { cartItems } } = state;
  if (ownProps.sellerMode) {
    return {
      sellingItems: sellingItems,
      allCategories: getHashCategories(state)
    }
  } else {
    return {
      cartItems: cartItems,
      sellingItems: ownProps.sellingItems,
      allCategories: getHashCategories(state)
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
