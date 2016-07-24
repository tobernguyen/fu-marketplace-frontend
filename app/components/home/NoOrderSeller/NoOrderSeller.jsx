import React from 'react';
import { messages} from './NoOrderSeller.i18n';
import { FormattedMessage } from 'react-intl';

import './NoOrderSeller.scss';

const NoOrderSeller = () => {
  return (
    <div className="no-order-seller text-center">
      <h1>:(</h1>
      <p><FormattedMessage {...messages.noOrderSeller.message}/></p>
    </div>
  );
}

export default NoOrderSeller;
