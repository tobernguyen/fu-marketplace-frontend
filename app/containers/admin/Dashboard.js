import React, { Component } from 'react';
import DashboardComponent from 'app/components/admin/Dashboard';
import {
  adminGetShopPromotionCampaign
} from 'app/actions/admin';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <DashboardComponent />
      </div>
    );
  }
}


Dashboard.path = '/dashboard';
Dashboard.title = 'Dashboard';
Dashboard.description = 'Dashboard';
Dashboard.faIcon = 'fa-th-large';


const mapStateToProps = (state) => ({
  shopPromotionCampaignManagement: state.admin.shopPromotionCampaignManagement
});

export default connect(mapStateToProps, {
  adminGetShopPromotionCampaign
})(Dashboard);
