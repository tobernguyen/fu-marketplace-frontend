import React from 'react';
import TicketStatus from 'app/shared/ticketStatus';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/admin/LabelTicketStatus/LabelTicketStatus.i18n';

import './LabelTicketStatus.scss';

const LabelTicketStatus = ({ status }) => {
  let output = '';
  switch (status) {
    case TicketStatus.OPENING:
      output = <FormattedMessage {...messages.labelTicketStatus.opening }/>
      break;
    case TicketStatus.INVESTIGATING:
      output = <FormattedMessage {...messages.labelTicketStatus.investigating }/>
      break;
    case TicketStatus.CLOSED:
      output = <FormattedMessage {...messages.labelTicketStatus.closed}/>
      break;
    default:
  }
  return (
    <span className={`ticket-status status-${status}`}>
      {output}
    </span>
  );
}

export default LabelTicketStatus;
