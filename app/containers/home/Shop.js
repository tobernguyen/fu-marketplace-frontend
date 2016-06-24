import React, { Component } from 'react';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import { connect } from 'react-redux';
import { updateModalMode, updateModalSize } from '../../actions/common';
import SellingItemList from './SellingItemList';
import { getUserShop } from 'app/actions/user';
import { Link } from 'react-router';
import _ from 'lodash';

class Shop extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopValid: true
      };
      this.props.getUserShop(shopID);
    }
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
      <div className="shop-detail-modal">
        {this.state.shopValid && <div>
          <BlockShopHeader shop={this.props.shop} sellerMode={false} />
          <SellingItemList shopID={this.props.params.shopID} sellerMode={false} />
          <Link to='/' className="close"><span>×</span></Link>
        </div>}
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
  getUserShop
})(Shop)
