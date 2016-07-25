import React from 'react';
import classNames from 'classnames';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import { FormattedMessage } from 'react-intl';
import { messages } from './AlertSubmitResult.i18n';

const AlertType = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
};


const AlertSubmitResult = ({ result }) => {
  let alertType = '';
  let alertMessage = '';

  switch (result.status) {
    case 200:
      alertType = AlertType.SUCCESS;
      break;
    case 400:
    case 404:
    case 500:
      alertType = AlertType.FAILURE;
      break;
    default:
      alertType = AlertType.FAILURE;
  }

  switch (result.message_code) {
    case AsyncResultCode.NOT_A_PENDING_REQUEST:
      alertMessage = <FormattedMessage {...messages.NOT_A_PENDING_REQUEST}/>
      break;
    case AsyncResultCode.ACCEPT_REQUEST_SUCCESS:
      alertMessage = <FormattedMessage {...messages.ACCEPT_REQUEST_SUCCESS}/>
      break;
    case AsyncResultCode.REJECT_REQUEST_SUCCESS:
      alertMessage = <FormattedMessage {...messages.REJECT_REQUEST_SUCCESS}/>
      break;
    default:
      alertMessage = <FormattedMessage {...messages.UNKNOWN_ERROR}/>

  }
  const alertClassName = classNames({
    'alert': true,
    'alert-success': alertType === AlertType.SUCCESS,
    'alert-danger': alertType === AlertType.FAILURE
  });

  return (
    <div className={alertClassName}>
      {alertMessage}
    </div>
  );
}

export default AlertSubmitResult;
