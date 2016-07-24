import React, { Component} from 'react';
import PromotionList from 'app/components/admin/PromotionList';
import {
  adminGetShopPromotionCampaign
} from 'app/actions/admin';
import { connect } from 'react-redux';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';

class ContainerListPromotion extends Component {
  componentWillMount() {
    this.props.adminGetShopPromotionCampaign();
  }
  render() {
    const { promotionManagement: { isFetching, promotionList } } = this.props;
    let output = ''
    if(isFetching) {
      output = <div className="text-center container-fluid">
        <LoadingSpinner />
      </div>;
    } else {
      output = (
        <div>
          <PromotionList promotions={promotionList} />
        </div>
      );
    }
    return output;
  }
}

ContainerListPromotion.path = '/promotions';
ContainerListPromotion.title = 'Promotion management';
ContainerListPromotion.description = 'Promotion management';
ContainerListPromotion.faIcon = 'fa-arrow-up';

const mapStateToProps = (state) => ({
  promotionManagement: state.admin.promotionManagement
});


export default connect(mapStateToProps, {
  adminGetShopPromotionCampaign
})(ContainerListPromotion);
