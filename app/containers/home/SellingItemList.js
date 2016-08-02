import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockSellingItemList from 'app/components/home/BlockSellingItemList';
import { addItemToCart } from 'app/actions/user';
import { getHashCategories } from 'app/selectors';
import { setItemStatus, getSellerShopItems } from 'app/actions/shop';

class SellingItemList extends Component {
  constructor(props) {
    super(props);

    this.handleAddToCart = (item) => {
      this.props.addItemToCart(item);
    };

    this.toggleItemStatus = (item) => {
      this.props.setItemStatus(this.props.shopID, item.id, Number(!item.checked));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldRefresh === true) {
      this.props.getSellerShopItems(this.props.shopID);
    }
  }

  render() {
    const {
      checkOut,
      buyNow,
      sellingItems,
      shopID,
      cartItems,
      sellerMode,
      allCategories,
      shopOpening,
      ownerView,
      isFetchingItems
    } = this.props;

    return (
      <BlockSellingItemList
        isFetchingItems={isFetchingItems}
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
  const {
    shop: {
      sellingItems,
      shouldRefresh,
      isFetchingItems
    },
    user: {
      cartItems
    }
  } = state;
  if (ownProps.sellerMode) {
    return {
      sellingItems: sellingItems,
      allCategories: getHashCategories(state),
      shouldRefresh: shouldRefresh,
      isFetchingItems: isFetchingItems
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
  setItemStatus,
  getSellerShopItems
})(SellingItemList)
