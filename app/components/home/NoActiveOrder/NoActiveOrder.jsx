import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/NoActiveOrder/NoActiveOrder.i18n';
import { Link } from 'react-router';

import './NoActiveOrder.scss';

const NoActiveOrder = () => {
  return (
    <div className="no-active-order text-center">
      <h2><FormattedMessage {...messages.noActiveOrder.message}/></h2>
      <Link to="/" className="btn btn-warning">
        <FormattedMessage {...messages.noActiveOrder.button.startShopping} />
      </Link>
    </div>
  );
}

export default NoActiveOrder;
