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

  return hasErrors && errors;
}

class FormChangePassword extends Component {
  render() {
    const { fields: { oldPassword, newPassword, repeatPassword }, handleSubmit, submitting, formStatus} = this.props;
    return (
      <div className="row">
        <Col lg={3}>
          <h4><strong>Change password</strong></h4>
        </Col>
        <Col lg={9}>
          <form onSubmit={handleSubmit}>
            <FormGroup className={`${oldPassword.touched && oldPassword.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Old password</ControlLabel>
              <FormControl type="password" placeholder="Old password" {...oldPassword} />
              <HelpBlock>{oldPassword.touched ? oldPassword.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup className={`${newPassword.touched && newPassword.invalid ? 'has-error' : ''}`}>
              <ControlLabel>New password</ControlLabel>
              <FormControl type="password" placeholder="New password" {...newPassword} />
              <HelpBlock>{newPassword.touched ? newPassword.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup className={`${repeatPassword.touched && repeatPassword.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Repeat password</ControlLabel>
              <FormControl type="password" placeholder="Repeat password" {...repeatPassword} />
              <HelpBlock>{repeatPassword.touched ? repeatPassword.error: '' }</HelpBlock>
            </FormGroup>
            <div className ="form-actions">
              {formStatus.response.status == 400 && <Alert bsStyle="danger">{formStatus.response.message}</Alert>}
              {formStatus.response.status == 401 && <Alert bsStyle="danger">{formStatus.response.message}</Alert>}
              <Button type="submit" bsStyle="warning" disabled={formStatus.isSubmitting}>
                Change password
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
}, null)(FormChangePassword);