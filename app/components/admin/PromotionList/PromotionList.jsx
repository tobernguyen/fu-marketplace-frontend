import React, { Component } from 'react';
import PromotionListRow from './PromotionListRow.jsx';
import { messages } from './PromotionList.i18n';
import { FormattedMessage } from 'react-intl';

class PromotionList extends Component {
  render() {
    const { promotions, adminSelectShopPromotionCampaign } = this.props;
    return(
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.promotionList.tableHead.shop}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.startDate}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.endDate}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.type}/></th>
              <th><FormattedMessage {...messages.promotionList.tableHead.action}/></th>
            </tr>
          </thead>
          <tbody>
            {promotions.length !== 0 && promotions.map(promotion =>
              <PromotionListRow key={promotion.id} promotion={promotion} adminSelectShopPromotionCampaign={adminSelectShopPromotionCampaign}/>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PromotionList;
