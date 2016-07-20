import React from 'react';
import PromotionType from 'app/shared/promotionCampaignType';
import { FormattedMessage } from 'react-intl';
import { messages } from './LabelPromotionType.i18n';

const LabelPromotionType = ({ type }) => {
  let output = '';
  switch (type) {
    case PromotionType.TOP_FEED_SLIDE_SHOW:
      output = <FormattedMessage {...messages.labelPromotionType.topFeedSlideShow }/>
      break;
    default:

  }
  return (
    <div>
      {output}
    </div>
  );
}

export default LabelPromotionType;
