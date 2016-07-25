import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './RequestList.i18n';

const NoRequest = () => {
  return (
    <div className="no-request text-center">
      <h1>:D</h1>
      <p><FormattedMessage {...messages.requestList.noRequest}/></p>
    </div>
  )
}

export default NoRequest;
