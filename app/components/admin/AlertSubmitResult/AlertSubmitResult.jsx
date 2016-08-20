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
  let status = 0;
  let message_code = 0;
  let hide = false;
  if(result) {
    status = result.status;
    message_code = result.message_code;
  }

  switch (status) {
    case 200:
      alertType = AlertType.SUCCESS;
      break;
    case 400:
    case 401:
    case 404:
    case 422:
    case 406:
    case 500:
      alertType = AlertType.FAILURE;
      break;
    case 0:
      hide = true;
      break;
    default:
      alertType = AlertType.FAILURE;
  }

  switch (message_code) {
    case AsyncResultCode.BAN_SHOP_SUCCESS:
      alertMessage = <FormattedMessage {...messages.BAN_SHOP_SUCCESS}/>;
      break;
    case AsyncResultCode.UNBAN_SHOP_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UNBAN_SHOP_SUCCESS}/>;
      break;
    case AsyncResultCode.NOT_A_PENDING_REQUEST:
      alertMessage = <FormattedMessage {...messages.NOT_A_PENDING_REQUEST}/>;
      break;
    case AsyncResultCode.ACCEPT_REQUEST_SUCCESS:
      alertMessage = <FormattedMessage {...messages.ACCEPT_REQUEST_SUCCESS}/>;
      break;
    case AsyncResultCode.REJECT_REQUEST_SUCCESS:
      alertMessage = <FormattedMessage {...messages.REJECT_REQUEST_SUCCESS}/>;
      break;
    case AsyncResultCode.OLD_PASSWORD_NOT_CORRECT:
      alertMessage = <FormattedMessage {...messages.OLD_PASSWORD_NOT_CORRECT}/>;
      break;
    case AsyncResultCode.FILE_TOO_BIG:
      alertMessage = <FormattedMessage {...messages.FILE_TOO_BIG}/>;
      break;
    case AsyncResultCode.UPDATE_SHOP_AVATAR_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UPDATE_SHOP_AVATAR_SUCCESS}/>;
      break;
    case AsyncResultCode.UPDATE_SHOP_COVER_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UPDATE_SHOP_COVER_SUCCESS}/>;
      break;
    case AsyncResultCode.UPDATE_SHOP_INFORMATION_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UPDATE_SHOP_INFORMATION_SUCCESS}/>;
      break;
    case AsyncResultCode.UPDATE_SHOP_SHIP_PLACES_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UPDATE_SHOP_SHIP_PLACES_SUCCESS}/>;
      break;
    case AsyncResultCode.CREATE_PROMOTION_SUCCESS:
      alertMessage = <FormattedMessage {...messages.CREATE_PROMOTION_SUCCESS}/>;
      break;
    case AsyncResultCode.BAN_USER_SUCCESS:
      alertMessage = <FormattedMessage {...messages.BAN_USER_SUCCESS}/>
      break;
    case AsyncResultCode.UNBAN_USER_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UNBAN_USER_SUCCESS}/>;
      break;
    case AsyncResultCode.UPDATE_USER_INFORMATION_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UPDATE_USER_INFORMATION_SUCCESS}/>
      break;
    case AsyncResultCode.UPDATE_USER_ROLE_SUCCESS:
      alertMessage = <FormattedMessage {...messages.UPDATE_USER_ROLE_SUCCESS}/>
      break;
    case AsyncResultCode.EDIT_PROMOTION_SUCCESS:
      alertMessage = <FormattedMessage {...messages.EDIT_PROMOTION_SUCCESS}/>
      break;
    case AsyncResultCode.NOT_CAPABLE_TO_BECOME_A_SELLER:
      alertMessage = <FormattedMessage {...messages.NOT_CAPABLE_TO_BECOME_A_SELLER}/>
      break;
    case AsyncResultCode.INVALID_IMAGE_FORMAT:
    case AsyncResultCode.UNKNOWN_UPLOAD:
      alertMessage = <FormattedMessage {...messages.UNKNOWN_UPLOAD} />
      break;
    case AsyncResultCode.UNKNOWN_ERROR:
      alertMessage = <FormattedMessage {...messages.UNKNOWN_ERROR}/>;
      break;
    default:
      alertMessage = message_code
  }
  const alertClassName = classNames({
    'hide': hide,
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
