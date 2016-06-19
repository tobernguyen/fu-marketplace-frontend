import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import SellingItemList from '../SellingItemList';
import { uploadShopAvatar, uploadShopCover, getSellerShop, updateShopInfo } from 'app/actions/shop';


class SellerDashboard extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID
      };
      this.props.getSellerShop(shopID);
    }

    this.handleUploadShopAvatar = (avatarDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(avatarDataURL));
      this.props.uploadShopAvatar(formFileData, this.props.params.shopID);
    };

    this.handleUploadShopCover = (coverDataURL) => {
      let formFileData = new FormData();
      formFileData.append('file', dataURLtoBlob(coverDataURL));
      this.props.uploadShopCover(formFileData, this.props.params.shopID);
    };

    this.handleShopInfoChanged = (shopData) => {
      this.props.updateShopInfo(shopData, this.props.params.shopID);
    }
  }

  render() {
    return (
      <div className="seller-dashboard">
        <div className="col-md-9">
          <div className="row">
            <BlockShopHeader
              sellerShop={this.props.sellerShop}
              uploadShopCover={this.handleUploadShopCover}
              uploadShopAvatar={this.handleUploadShopAvatar} />
            <SellingItemList />
          </div>
        </div>
        <div className="col-md-3">
          <BlockSellerDashboardSideBar sellerShop={this.props.sellerShop}
                                       shopInfoChanged={this.handleShopInfoChanged} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    sellerShop: shop.sellerShop
  }
};

export default connect(mapStateToProps, {
  getSellerShop,
  uploadShopAvatar,
  uploadShopCover,
  updateShopInfo
})(SellerDashboard)
