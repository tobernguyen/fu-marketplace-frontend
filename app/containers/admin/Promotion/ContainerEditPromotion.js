import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormEditShopPromotionCampaign from 'app/components/admin/FormEditShopPromotionCampaign';
class ContainerEditPromotion extends Component {
  render() {
    return (
      <div className="container-fluid">
        <FormEditShopPromotionCampaign />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    promotionManagement: state.admin.promotionManagement
  }
}

ContainerEditPromotion.path = ':promotionId/edit';
ContainerEditPromotion.title = 'Promotion edit';
ContainerEditPromotion.description = 'Edit shop promotion';
ContainerEditPromotion.faIcon = 'fa-arrow-up';

export default connect(mapStateToProps, {

})(ContainerEditPromotion);
