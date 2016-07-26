import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockSellingItemList from 'app/components/home/BlockSellingItemList';
import { addItemToCart } from 'app/actions/user';
import { getHashCategories } from 'app/selectors';
import { updateShopItem } from 'app/actions/shop';

class SellingItemList extends Component {
  constructor(props) {
    super(props);

    this.handleAddToCart = (item) => {
      this.props.addItemToCart(item);
    };

    this.toggleItemStatus = (item) => {
      console.log(item);
      // this.props.updateShopItem(this.props.shopID, item.id, {
      //   status: Number(!item.checked)
      // });
    }
  }

  render() {
    const { checkOut, buyNow, sellingItems, shopID, cartItems, sellerMode, allCategories, shopOpening, ownerView } = this.props;
    return (
      <BlockSellingItemList
        toggleItemStatus={this.toggleItemStatus}
        ownerView={ownerView}
        shopOpening={shopOpening}
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
  sellerMode: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {
  addItemToCart,
  updateShopItem
})(SellingItemList)
