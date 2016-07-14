import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Alert,
  HelpBlock
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormChangePassword/FormChangePassword.i18n';


const validate = (values) => {
  let errors = {};
  let hasErrors = false;
  if(!values.oldPassword || values.oldPassword.trim() === '') {
    errors.oldPassword = 'Old password cannot be blank';
    hasErrors = true;
  }
  if(!values.newPassword || values.newPassword.trim() === '') {
    errors.newPassword = 'New password cannot be blank';
    hasErrors = true;
  } else {

  }

  if(!values.repeatPassword || values.repeatPassword.trim() === '') {
    errors.repeatPassword = 'Repeat password cannot be blank';
    hasErrors = true;
  }

  if(values.newPassword && values.repeatPassword && values.newPassword != values.repeatPassword) {
    errors.repeatPassword = 'Password does not match';
    hasErrors = true;
  }

  return hasErrors && errors;
}

class FormChangePassword extends Component {
  render() {
    const { fields: { oldPassword, newPassword, repeatPassword }, handleSubmit, submitting, formStatus, intl: { formatMessage }} = this.props;
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
              <HelpBlock>{oldPassword.touched ? oldPassword.error: '' }</HelpBlock>
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
              <HelpBlock>{newPassword.touched ? newPassword.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup className={`${repeatPassword.touched && repeatPassword.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formChangePassword.fields.confirmPassword}/>
              </ControlLabel>
              <FormControl
              type="password"
              placeholder={formatMessage(messages.formChangePassword.fields.confirmPassword)}
              {...repeatPassword} />
              <HelpBlock>{repeatPassword.touched ? repeatPassword.error: '' }</HelpBlock>
            </FormGroup>
            <div className ="form-actions">
              <Button type="submit" bsStyle="warning" disabled={formStatus.isSubmitting}>
                <FormattedMessage {...messages.formChangePassword.button.saveChanges}/>
              </Button>
            </div>
          </form>
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
