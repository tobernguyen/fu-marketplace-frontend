import React from 'react';
import './LabelUserRole.scss';
import { userRoles } from 'app/shared/userRoles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/LabelUserRole/LabelUserRole.i18n';

const LabelUserRole = ({ role = userRoles.USER }) => {
  let roleText = '';
  switch (role) {
    case userRoles.ADMIN:
      roleText = <FormattedMessage {...messages.userRole.admin}/>
      break;
    case userRoles.SELLER:
      roleText = <FormattedMessage {...messages.userRole.seller}/>
      break;
    case userRoles.USER:
      roleText = <FormattedMessage {...messages.userRole.user}/>
      break;
    default:

  }
  return (
    <span className={`role-label role-${role}`}>
      {roleText}
    </span>
  );
}

export default injectIntl(LabelUserRole);
