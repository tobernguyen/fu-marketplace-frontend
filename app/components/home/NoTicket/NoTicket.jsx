import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/NoTicket/NoTicket.i18n';


const NoTicket = () => {
  return (
    <div className="no-active-order text-center">
      <h2><FormattedMessage {...messages.noTicket.message}/></h2>
    </div>
  );
}

export default NoTicket;
