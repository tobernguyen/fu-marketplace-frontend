import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormEditShopPromotionCampaign from 'app/components/admin/FormEditShopPromotionCampaign';
import {
  adminGetShopPromotionCampaign,
  adminUpdateShopPromotionCampaign
} from 'app/actions/admin';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class ContainerEditPromotion extends Component {
  componentWillMount() {
    this.props.adminGetShopPromotionCampaign();
  }
  render() {
    const { adminUpdateShopPromotionCampaign, promotionManagement: { isFetching, promotionList, submitResult, isSubmitting }, params: { promotionId }} = this.props;
    let output = '';
    if(isFetching) {
      output = <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
    } else {
      output = <div className="container-fluid">
        <FormEditShopPromotionCampaign
          promotionList={promotionList}
          promotionId={promotionId}
          isSubmitting={isSubmitting}
          submitResult={submitResult}
          adminUpdateShopPromotionCampaign={adminUpdateShopPromotionCampaign}
        />
      </div>
    }

    return output;
  }
}

const mapStateToProps = (state) => {
  return {
    promotionManagement: state.admin.promotionManagement
  }
}

ContainerEditPromotion.path = ':promotionId/edit';
ContainerEditPromotion.title = {
  id: 'breadCrumb.editPromotion.title',
  defaultMessage: 'Edit promotion'
};
ContainerEditPromotion.description = {
  id: 'breadCrumb.editPromotion.description',
  defaultMessage: 'Change shop promotion campaign information'
};
ContainerEditPromotion.faIcon = 'fa-arrow-up';

export default connect(mapStateToProps, {
  adminGetShopPromotionCampaign,
  adminUpdateShopPromotionCampaign
})(ContainerEditPromotion);
