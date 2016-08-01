import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './FormSignOut.i18n';

const FormSignOut = ({ adminSignOut }) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <h4>
          <strong>
            <FormattedMessage {...messages.formSignOut.sectionName}/>
          </strong>
        </h4>
      </div>
      <div className="col-lg-9">
        <button className="btn btn-danger" type="button" onClick={adminSignOut}>
          <FormattedMessage {...messages.formSignOut.sectionName}/>
        </button>
      </div>
    </div>
  )
};

export default FormSignOut;
