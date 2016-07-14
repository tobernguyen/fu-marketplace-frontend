import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/LabelShopOpening/LabelShopOpening.i18n';

const LabelShopOpening = ({ status }) => {
  let output = '';

  switch (status) {
    case true:
      output = <FormattedMessage {...messages.shopOpeningStatus.open} />;
      break;
    case false:
      output = <FormattedMessage {...messages.shopOpeningStatus.close} />;
    default:

  }

  return output;
}

export default injectIntl(LabelShopOpening);
