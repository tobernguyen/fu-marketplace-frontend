import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './PromotionList.i18n';

const NoPromotion = () => {
  return (
    <div className="no-request text-center">
      <h1>:(</h1>
      <p><FormattedMessage {...messages.promotionList.noPromotion}/></p>
    </div>
  )
}

export default NoPromotion;
