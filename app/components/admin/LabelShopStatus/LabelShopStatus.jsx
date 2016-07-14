import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/LabelShopStatus/LabelShopStatus.i18n';
import shopStatus from 'app/shared/shopStatus';

const LabelShopStatus = ({ status }) => {
  let output = '';

  switch (status) {
    case shopStatus.UNPUBLISHED:
      output = <FormattedMessage {...messages.shopStatus.published} />;
      break;
    case shopStatus.PUBLISHED:
      output = <FormattedMessage {...messages.shopStatus.unpublished} />;
    default:

  }

  return output;
}

export default injectIntl(LabelShopStatus);
