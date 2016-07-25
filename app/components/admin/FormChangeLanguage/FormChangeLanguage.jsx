import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './FormChangeLanguage.i18n';

const FormChangeLanguage = ({ adminChangeLanguage }) => {
  return (
    <div className="row">
      <div className="col-lg-3">
        <h4>
          <strong>
            <FormattedMessage {...messages.formChangeLanguage.sectionName}/>
          </strong>
        </h4>
      </div>
      <div className="col-lg-9">
        <div className="form-group">
          <div class="radio">
            <label>
              <input
                type="radio"
                name="response"
                onChange={() => adminChangeLanguage('en')}
                value="en"/>
                {' '}<FormattedMessage {...messages.formChangeLanguage.option.english}/>
            </label>
          </div>
          <div class="radio">
            <label>
              <input
                type="radio"
                name="response"
                onChange={() => adminChangeLanguage('vi')}
                value="vi"/>
                {' '}<FormattedMessage {...messages.formChangeLanguage.option.vietnamese}/>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormChangeLanguage;
