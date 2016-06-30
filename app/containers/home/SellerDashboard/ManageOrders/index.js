import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import BlockOrderList from 'app/components/home/BlockOrderList';
import { getSellerShop, updateShopInfo } from 'app/actions/shop';
import { sellerGetOrder } from 'app/actions/order';
import Sticky from 'react-stickynode';

class ManageOrders extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID
      };
      this.props.getSellerShop(shopID);
      this.props.sellerGetOrder(shopID);
    }

    this.handleShopInfoChanged = (shopData) => {
      this.props.updateShopInfo(shopData, this.props.params.shopID);
    }
  }

  render() {
    return (
      <div>
        <div className="seller-dashboard">
          <div className="col-md-9">
            <div className="row">

              <BlockOrderList orders={this.props.orders}/>

            </div>
          </div>
          <div className="col-md-3">
            <Sticky enabled={true} top={60}>
              <BlockSellerDashboardSideBar sellerShop={this.props.sellerShop}
                                           shopInfoChanged={this.handleShopInfoChanged}
                                           shopID={this.state.shopID} />
            </Sticky>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    orders: state.order.orders,
    sellerShop: shop.sellerShop
  }
};

export default connect(mapStateToProps, {
  getSellerShop,
  updateShopInfo,
  sellerGetOrder
})(ManageOrders)
