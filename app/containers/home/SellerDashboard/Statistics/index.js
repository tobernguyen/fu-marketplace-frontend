import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import Sticky from 'react-stickynode';
import { updateShopInfo } from 'app/actions/shop';

class Statistics extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;

    this.handleShopInfoChanged = (shopData) => {
      this.props.updateShopInfo(shopData, this.props.params.shopID);
    };
  }
  render() {
    return (
      <div className="container home-body">
        <div className="seller-dashboard">
          <div className="col-md-9">
            <div className="row">
              <div>
                Statistics
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <Sticky enabled={true} top={60}>
              <BlockSellerDashboardSideBar
                sellerShop={this.props.sellerShop} />
            </Sticky>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    sellerShop: shop.sellerShop
  }
};

export default connect(mapStateToProps, {
  updateShopInfo
})(Statistics)
