import React, { Component } from 'react';

class PromotionCampaignManagement extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


PromotionCampaignManagement.path = '/promotion';
PromotionCampaignManagement.title = 'Promotion Campaign management';
PromotionCampaignManagement.description = 'Promotion Campaign management';
PromotionCampaignManagement.faIcon = ' fa-arrow-up';

export default PromotionCampaignManagement;
