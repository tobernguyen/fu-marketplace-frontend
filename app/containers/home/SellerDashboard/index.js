import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import SellingItemList from '../SellingItemList';
import { Modal } from 'react-bootstrap';
import { uploadShopAvatar, uploadShopCover, updateShopInfo } from 'app/actions/shop';
import Sticky from 'react-stickynode';
import { getMetadata } from 'app/actions/common';
import { registerOneSignal } from 'app/actions/notification';
import { getHashCategories, getUser } from 'app/selectors';
import _ from 'lodash';
import OneSignal from 'onesignal';
import BlockEnablePushSuggestion from 'app/components/home/BlockEnablePushSuggestion';

class SellerDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pushNotificationEnabled: true
    };

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

  componentWillMount() {
    if (_.isEmpty(this.props.allCategories)) {
      this.props.getMetadata();
    }
    OneSignal.push(() => {
      OneSignal.on('subscriptionChange', (isSubscribed) => {
        this.setState({
          pushNotificationEnabled: isSubscribed
        });
        if (isSubscribed) {
          OneSignal.push(['getUserId', (playerId) => {
            this.props.registerOneSignal(playerId);
          }]);
        }
      });
    });
  }

  componentDidMount() {
    OneSignal.push(['isPushNotificationsEnabled', (enabled) => {
      this.setState({
        pushNotificationEnabled: enabled
      })
    }]);
  }

  render() {
    return (
      <div className="container home-body">
        <div className="seller-dashboard">
          <div className="col-md-9">
            <div className="row">
              <BlockShopHeader
                shopOwner={this.props.currentUser}
                shop={this.props.sellerShop}
                sellerMode={true}
                uploadShopCover={this.handleUploadShopCover}
                uploadShopAvatar={this.handleUploadShopAvatar} />
              <BlockEnablePushSuggestion
                sellerMode={true}
                oneSignalRegistered={this.props.oneSignalRegistered}
                pushNotificationEnabled={this.state.pushNotificationEnabled} />
              <SellingItemList shopID={this.props.params.shopID} sellerMode={true} />
            </div>
          </div>
          <div className="col-md-3">
            <Sticky enabled={true} top={60}>
              <BlockSellerDashboardSideBar
                sellerShop={this.props.sellerShop}
                shopInfoChanged={this.handleShopInfoChanged} />
            </Sticky>
          </div>
        </div>

        {this.props.children && <div>
          <Modal show={true}>
            {this.props.children}
          </Modal>
        </div>}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { shop, notification: { oneSignalRegistered } } = state;
  return {
    sellerShop: shop.sellerShop,
    currentUser: getUser(state),
    allCategories: getHashCategories(state),
    oneSignalRegistered: oneSignalRegistered
  }
};

export default connect(mapStateToProps, {
  uploadShopAvatar,
  uploadShopCover,
  updateShopInfo,
  getMetadata,
  registerOneSignal
})(SellerDashboard)
