import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockSellingItemList from 'app/components/home/BlockSellingItemList';
import { getSellerShopItems } from 'app/actions/shop';

class SellingItemList extends Component {
  constructor(props) {
    super(props);

    if (this.props.shopID) {
      this.props.getSellerShopItems(this.props.shopID);
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
        sellerMode={this.props.sellerMode} />
    )
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    sellingItems: shop.sellingItems
  }
};

SellingItemList.propTypes = {
  sellerMode: PropTypes.bool.isRequired,
  checkOut: PropTypes.func.isRequired,
  buyNow: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getSellerShopItems
})(SellingItemList)
