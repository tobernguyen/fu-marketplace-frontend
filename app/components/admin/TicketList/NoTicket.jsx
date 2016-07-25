import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './TicketList.i18n';

const NoTicket = () => {
  return (
    <div className="no-request text-center">
      <h1>\m/</h1>
      <p><FormattedMessage {...messages.ticketList.noTicket}/></p>
    </div>
  )
}

export default NoTicket;
