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

    const { shopID, status } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID,
        status: status
      };
      this.props.getSellerShop(shopID);
      this.props.sellerGetOrder(shopID, status);
    }

    this.handleShopInfoChanged = (shopData) => {
      this.props.updateShopInfo(shopData, this.props.params.shopID);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {shopID, status} = nextProps.params;
    if(shopID != this.state.shopID || status != this.state.status) {
      this.props.sellerGetOrder(shopID, status);
      this.setState ({
        shopID,
        status
      });
    }

  }
  render() {
    return (
      <div>
        <div className="seller-dashboard">
          <div className="col-md-9">
            <div className="row">

              <BlockOrderList shopID ={this.props.params.shopID} orders={this.props.orders}/>

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
