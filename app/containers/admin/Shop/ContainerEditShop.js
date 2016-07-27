import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormEditShopInformation from 'app/components/admin/FormEditShopInformation';
import FormEditShopShipPlaces from 'app/components/admin/FormEditShopShipPlaces';
import FormEditShopBanStatus from 'app/components/admin/FormEditShopBanStatus';
import FormEditShopAvatarAndCover from 'app/components/admin/FormEditShopAvatarAndCover';
import FormShopPromotionCampaign from 'app/components/admin/FormShopPromotionCampaign';
import {
  adminGetShop,
  adminUpdateShopInformation,
  adminBanShop,
  adminUnbanShop,
  adminUpdateShopAvatar,
  adminUpdateShopCover,
  adminUpdateShopShipPlaces,
  adminUpdateShopOpeningStatus,
  adminCreateShopPromotionCampaign
} from 'app/actions/admin';
import { getShipPlaces } from 'app/actions/common';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class ContainerEditShop extends Component {
  constructor(props) {
    super(props);

    this.props.getShipPlaces();
    this.props.adminGetShop(props.params.shopId);

    this.handleSubmitShopInformation = this.handleSubmitShopInformation.bind(this);
    this.uploadAvatar = this.uploadAvatar.bind(this);
    this.uploadCover = this.uploadCover.bind(this);
    this.banShop = this.banShop.bind(this);
    this.unbanShop = this.unbanShop.bind(this);
    this.handleSubmitShipPlaces = this.handleSubmitShipPlaces.bind(this);
    this.handleSubmitShopOpeningStatus = this.handleSubmitShopOpeningStatus.bind(this);
    this.handleSubmitShopPromotionCampaign = this.handleSubmitShopPromotionCampaign.bind(this);
  }

  handleSubmitShopInformation(shop) {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminUpdateShopInformation(shopId, shop);
  }

  handleSubmitShopOpeningStatus(opening) {
    const shopID = this.props.shopManagement.selectedShop.id;
    this.props.adminUpdateShopOpeningStatus(shopID, opening)
  }

  handleSubmitShipPlaces(shipPlaces) {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminUpdateShopShipPlaces(shopId, shipPlaces)
  }

  uploadAvatar(formData) {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminUpdateShopAvatar(shopId, formData);
  }

  uploadCover(formData) {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminUpdateShopCover(shopId, formData);
  }

  banShop() {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminBanShop(shopId);
  }

  unbanShop() {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminUnbanShop(shopId);
  }

  handleSubmitShopPromotionCampaign(startDate, endDate, type) {
    const shopId = this.props.shopManagement.selectedShop.id;
    this.props.adminCreateShopPromotionCampaign(shopId, startDate, endDate, type);
  }

  render() {
    const { shopManagement } = this.props;
    if(shopManagement.isFetching) {
      return <div className="text-center container-fluid">
          <LoadingSpinner />
        </div>;
    } else {
      return (
       <div className="container-fluid">
        <FormEditShopInformation
          onSubmit={this.handleSubmitShopInformation}
          submitResult={shopManagement.submitResultShopInformation}
          isSubmitting={shopManagement.isSubmittingShopInformation}
          seller={shopManagement.selectedShop.seller}
        />
        <hr />
        <FormEditShopShipPlaces
          shop={shopManagement.selectedShop}
          submitOpeningStatus={this.handleSubmitShopOpeningStatus}
          submitShipPlaces={this.handleSubmitShipPlaces}
          submitResult={shopManagement.submitResultShopShipPlace}
          isSubmitting={shopManagement.isSubmittingShopShipPlace}
          availableShipPlaces = {shopManagement.availableShipPlaces}
        />
        <hr />
        <FormEditShopAvatarAndCover
          shop={shopManagement.selectedShop}
          uploadAvatar={this.uploadAvatar}
          uploadCover={this.uploadCover}
          submitResult={shopManagement.submitResultAvatarAndCover}
          isSubmitting={shopManagement.isSubmittingAvatarAndCover}
        />
        <hr />
        <FormShopPromotionCampaign
          createShopPromotionCampaign = {this.handleSubmitShopPromotionCampaign}
          submitResult={shopManagement.submitResultShopPromotion}
          isSubmitting={shopManagement.isSubmittingShopPromotion}
        />
        <hr />
        <FormEditShopBanStatus
          shop={shopManagement.selectedShop}
          adminBanShop={this.banShop}
          adminUnbanShop={this.unbanShop}
          submitResult={shopManagement.submitResultShopBanStatus}
          isSubmitting={shopManagement.isSubmittingShopBanStatus}
        />
       </div>
      );
    }
  }
}

ContainerEditShop.path = ':shopId/edit';
ContainerEditShop.title = {
  id: 'breadCrumb.editShop.title',
  defaultMessage: 'Edit shop'
};
ContainerEditShop.description = {
  id: 'breadCrumb.editShop.description',
  defaultMessage: 'Edit shop information, operational information, promotion campaign, ban status'
};
ContainerEditShop.faIcon = 'fa-shopping-bag';

const mapStateToProps = (state) => ({
  shopManagement: state.admin.shopManagement
});

export default connect(mapStateToProps, {
  adminGetShop,
  adminUpdateShopInformation,
  adminBanShop,
  adminUnbanShop,
  adminUpdateShopAvatar,
  adminUpdateShopCover,
  adminUpdateShopOpeningStatus,
  adminUpdateShopShipPlaces,
  getShipPlaces,
  adminCreateShopPromotionCampaign
})(ContainerEditShop);
