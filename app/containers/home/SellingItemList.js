import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import BlockSellingItemList from 'app/components/home/BlockSellingItemList';
import { getSellerShopItems } from 'app/actions/shop';

class SellingItemList extends Component {
  constructor(props) {
    super(props);

    this.props.getSellerShopItems(this.props.shopID);
  }


  render() {
    return (
      <BlockSellingItemList items={this.props.sellingItems} />
    )
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    sellingItems: shop.sellingItems
  }
};


export default connect(mapStateToProps, {
  getSellerShopItems
})(SellingItemList)
