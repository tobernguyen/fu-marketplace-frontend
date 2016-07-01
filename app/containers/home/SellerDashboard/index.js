import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from 'app/components/home/Header';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import SellingItemList from '../SellingItemList';
import { Modal } from 'react-bootstrap';
import { uploadShopAvatar, uploadShopCover, getSellerShop, updateShopInfo } from 'app/actions/shop';
import { getUser } from 'app/selectors';
import Sticky from 'react-stickynode';
import { signOutGoogle } from 'app/actions';


class SellerDashboard extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID,
        hasChildren: false
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      hasChildren: !(nextProps.children === null)
    })
  }

  render() {
    const { currentUser, signOutGoogle } = this.props;
    return (
      <div className="home-page">
        <Header onSignOut={signOutGoogle} currentUser={currentUser} />
        <div className="container home-body">
          <div className="seller-dashboard">
            <div className="col-md-9">
              <div className="row">
                <BlockShopHeader
                  shop={this.props.sellerShop}
                  sellerMode={true}
                  uploadShopCover={this.handleUploadShopCover}
                  uploadShopAvatar={this.handleUploadShopAvatar} />
                <SellingItemList shopID={parseInt(this.state.shopID)} sellerMode={true} />
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

          {this.props.children && <div>
            <Modal show={true}>
              {this.props.children}
            </Modal>
          </div>}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    sellerShop: shop.sellerShop,
    currentUser:  getUser(state)
  }
};

export default connect(mapStateToProps, {
  getSellerShop,
  uploadShopAvatar,
  uploadShopCover,
  updateShopInfo,
  signOutGoogle
})(SellerDashboard)
