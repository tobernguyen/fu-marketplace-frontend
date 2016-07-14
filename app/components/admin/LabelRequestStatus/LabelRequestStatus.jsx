import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/LabelRequestStatus/LabelRequestStatus.i18n';
import './LabelRequestStatus.scss';
import requestStatus from 'app/shared/requestStatus';

const LabelRequestStatus = ({ status }) => {
  let label = '';
  switch (status) {
    case requestStatus.PENDING:
      label = <FormattedMessage {...messages.requestStatus.pending}/>
      break;
    case requestStatus.ACCEPTED:
      label = <FormattedMessage {...messages.requestStatus.accepted}/>
      break;
    case requestStatus.REJECTED:
      label = <FormattedMessage {...messages.requestStatus.rejected}/>
      break;
    default:

  }
  return (
    <span className={`request-status-label status-${status}`}>
      {label}
    </span>
  );
}

export default injectIntl(LabelRequestStatus);
