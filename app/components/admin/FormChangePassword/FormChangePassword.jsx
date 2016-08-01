import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  HelpBlock
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormChangePassword/FormChangePassword.i18n';
import AlertSubmitResult from 'app/components/admin/AlertSubmitResult';

const validate = (values) => {
  let errors = {};
  let hasErrors = false;
  if(!values.oldPassword || values.oldPassword.trim() === '') {
    errors.oldPassword = {
      id: 'admin.form.changePassword.oldPassword.blank',
      defaultMessage: 'Old password cannot be blank'
    }
    hasErrors = true;
  }
  if(!values.newPassword || values.newPassword.trim() === '') {
    errors.newPassword = {
      id: 'admin.form.changePassword.newPassword.blank',
      defaultMessage: 'New password cannot be blank'
    };
    hasErrors = true;
  }

  if(values.newPassword && values.newPassword.length < 8) {
    errors.newPassword = {
      id: 'admin.form.changePassword.newPassword.short',
      defaultMessage: 'New password cannot be shorter than 8 characters'
    };
    hasErrors = true;
  }

  if(values.newPassword && values.newPassword.length > 255) {
    errors.newPassword = {
      id: 'admin.form.changePassword.newPassword.long',
      defaultMessage: 'New password cannot be longer than 255 characters'
    };
    hasErrors = true;
  }

  if(!values.repeatPassword || values.repeatPassword.trim() === '') {
    errors.repeatPassword = {
      id: 'admin.form.changePassword.repeatPassword.blank',
      defaultMessage: 'Repeat password cannot be blank'
    };
    hasErrors = true;
  }

  if(values.newPassword && values.repeatPassword && values.newPassword != values.repeatPassword) {
    errors.repeatPassword = {
      id: 'admin.form.changePassword.repeatPassword.doesNotMatch',
      defaultMessage: 'Confirm password does not match'
    };
    hasErrors = true;
  }

  return hasErrors && errors;
}

class FormChangePassword extends Component {
  render() {
    const { fields: { oldPassword, newPassword, repeatPassword }, handleSubmit, formStatus, intl: { formatMessage }, isLoginByGoogle} = this.props;
    const changePasswordForm = (
      <form onSubmit={handleSubmit}>
        <FormGroup className={`${oldPassword.touched && oldPassword.invalid ? 'has-error' : ''}`}>
          <ControlLabel>
            <FormattedMessage {...messages.formChangePassword.fields.oldPassword}/>
          </ControlLabel>
          <FormControl
            type="password"
            placeholder={formatMessage(messages.formChangePassword.fields.oldPassword)}
            {...oldPassword}
            />
          <HelpBlock>
            {oldPassword.touched && oldPassword.error ? <FormattedMessage {...oldPassword.error}/> : '' }
          </HelpBlock>
        </FormGroup>
        <FormGroup className={`${newPassword.touched && newPassword.invalid ? 'has-error' : ''}`}>
          <ControlLabel>
            <FormattedMessage {...messages.formChangePassword.fields.newPassword}/>
          </ControlLabel>
          <FormControl
            type="password"
            placeholder={formatMessage(messages.formChangePassword.fields.newPassword)}
            {...newPassword}
            />
            <HelpBlock>
              {newPassword.touched && newPassword.error ? <FormattedMessage {...newPassword.error}/> : '' }
            </HelpBlock>
        </FormGroup>
        <FormGroup className={`${repeatPassword.touched && repeatPassword.invalid ? 'has-error' : ''}`}>
          <ControlLabel>
            <FormattedMessage {...messages.formChangePassword.fields.confirmPassword}/>
          </ControlLabel>
          <FormControl
          type="password"
          placeholder={formatMessage(messages.formChangePassword.fields.confirmPassword)}
          {...repeatPassword} />
          <HelpBlock>
            {repeatPassword.touched && repeatPassword.error ? <FormattedMessage {...repeatPassword.error}/> : '' }
          </HelpBlock>
        </FormGroup>
        {
          formStatus.submitResult !== '' &&
          <AlertSubmitResult result={formStatus.submitResult} formName="formChangePassword"/>
        }
        <div className ="form-actions">
          <Button type="submit" bsStyle="warning" disabled={formStatus.isSubmitting}>
            <FormattedMessage {...messages.formChangePassword.button.saveChanges}/>{formStatus.isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
          </Button>
        </div>
      </form>
    );
    return (
      <div className="row">
        <Col lg={3}>
          <h4>
            <strong>
              <FormattedMessage {...messages.formChangePassword.sectionName}/>
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formChangePassword.sectionDescription}/>
          </p>
        </Col>
        <Col lg={9}>
          {!isLoginByGoogle ? changePasswordForm : <FormattedMessage {...messages.formChangePassword.message}/>}
        </Col>
      </div>
    )
  }
}


export default reduxForm({
  form: 'FormChangePassword',
  fields: ['oldPassword', 'newPassword', 'repeatPassword'],
  asyncBlurFields: ['oldPassword', 'newPassword', 'repeatPassword'],
  validate
}, null)(injectIntl(FormChangePassword));
