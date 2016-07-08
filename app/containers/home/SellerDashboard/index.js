import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataURLtoBlob from 'blueimp-canvas-to-blob';
import BlockShopHeader from 'app/components/home/BlockShopHeader';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import SellingItemList from '../SellingItemList';
import { Modal } from 'react-bootstrap';
import { uploadShopAvatar, uploadShopCover, getSellerShop, updateShopInfo } from 'app/actions/shop';
import Sticky from 'react-stickynode';
import NavigationBar from '../NavigationBar';
import { getMetadata } from 'app/actions/common';
import { registerOneSignal } from 'app/actions/notification';
import { getHashCategories } from 'app/selectors';
import _ from 'lodash';
import OneSignal from 'onesignal';
import BlockEnablePushSuggestion from 'app/components/home/BlockEnablePushSuggestion';
import io from 'socket.io-client';
import config from 'config';

const socket = io.connect(config.SOCKET_IO_URL);

class SellerDashboard extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;
    if (!isNaN(shopID)) {
      this.state = {
        shopID: shopID,
        pushNotificationEnabled: true
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
      <div className="home-page">
        <NavigationBar
          socket={socket}/>
        <div className="container home-body">
          <div className="seller-dashboard">
            <div className="col-md-9">
              <div className="row">
                <BlockShopHeader
                  shop={this.props.sellerShop}
                  sellerMode={true}
                  uploadShopCover={this.handleUploadShopCover}
                  uploadShopAvatar={this.handleUploadShopAvatar} />
                <BlockEnablePushSuggestion
                  sellerMode={true}
                  oneSignalRegistered={this.props.oneSignalRegistered}
                  pushNotificationEnabled={this.state.pushNotificationEnabled} />
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
  const { shop, notification: { oneSignalRegistered } } = state;
  return {
    sellerShop: shop.sellerShop,
    allCategories: getHashCategories(state),
    oneSignalRegistered: oneSignalRegistered
  }
};

export default connect(mapStateToProps, {
  getSellerShop,
  uploadShopAvatar,
  uploadShopCover,
  updateShopInfo,
  getMetadata,
  registerOneSignal
})(SellerDashboard)
