import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Alert,
  Col
} from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditUserInformation/FormEditUserInformation.i18n';
import { reduxForm } from 'redux-form';
import AsyncResultCode from 'app/shared/asyncResultCodes';


const validate = (values) => {
  let errors = {};
  let hasErrors = false;
  if(!values.email || values.email.trim() === '') {
    errors.email = 'common.form.validation.email.blank';
    hasErrors = true;
  }
  if(!values.fullName || values.fullName.trim() === '') {
    errors.fullName = 'common.form.validation.name.blank';
    hasErrors = true;
  }

  if(values.identityNumber && isNaN(Number(values.identityNumber))) {
    errors.identityNumber = 'common.form.validation.identityNumber.invalid';
    hasErrors = true;
  }

  if(values.phone && isNaN(Number(values.phone))) {
    errors.phone = 'common.form.validation.phone.number';
    hasErrors = true;
  }

  if(values.room && !values.room.match(/([A-F]{1})([0-9]{3})/gi)) {
    errors.room = 'common.form.validation.room';
    hasErrors = true;
  }

  return hasErrors && errors;
}

class FormEditUserInformation extends Component {
  render() {
    const {
      fields: {
        email,
        fullName,
        gender,
        identityNumber,
        phone,
        room
      },
      handleSubmit,
      submitting,
      submitResult,
      intl: { formatMessage}
    } = this.props;
    return (
      <div className="row">
        <Col lg={3}>
          <h4 className="information-title">
            <strong>
              <FormattedMessage {...messages.formEditUserInformation.sectionName} />
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formEditUserInformation.sectionDescription} />
          </p>
        </Col>
        <Col lg={9}>
          <form onSubmit={handleSubmit(this.props.adminUpdateUserInformation)}>
            <FormGroup
              className={`${email.touched && email.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditUserInformation.fields.email} />
              </ControlLabel>
              <FormControl
                type="email"
                placeholder={formatMessage(messages.formEditUserInformation.fields.email)}
                {...email} />
              <HelpBlock>{email.touched ? email.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${fullName.touched && fullName.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditUserInformation.fields.fullName} />
              </ControlLabel>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.formEditUserInformation.fields.fullName)}
                {...fullName} />
              <HelpBlock>{fullName.touched ? fullName.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${gender.touched && gender.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditUserInformation.fields.gender} />
              </ControlLabel>
              <FormControl
                componentClass="select"
                {...gender} >
                <option value="male">
                  {formatMessage(messages.formEditUserInformation.gender.male)}
                </option>
                <option value="female">
                  {formatMessage(messages.formEditUserInformation.gender.female)}
                </option>
              </FormControl>
            </FormGroup>
            <FormGroup
              className={`${identityNumber.touched && identityNumber.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditUserInformation.fields.identityNumber} />
              </ControlLabel>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.formEditUserInformation.fields.identityNumber)}
                {...identityNumber} />
              <HelpBlock>{identityNumber.touched ? identityNumber.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${phone.touched && phone.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditUserInformation.fields.phone} />
              </ControlLabel>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.formEditUserInformation.fields.phone)}
                {...phone} />
              <HelpBlock>{phone.touched ? phone.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${room.touched && room.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditUserInformation.fields.room} />
              </ControlLabel>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.formEditUserInformation.fields.room)}
                {...room} />
              <HelpBlock>{room.touched ? room.error: '' }</HelpBlock>
            </FormGroup>
            <div className="form-actions">
              {
                submitResult === AsyncResultCode.UPDATE_USER_INFORMATION_SUCCESS &&
                <Alert bsStyle="success">
                  <FormattedMessage {...messages.formEditUserInformation.submitResult.success}/>
                </Alert>
              }
              {
                submitResult === AsyncResultCode.UPDATE_USER_INFORMATION_FAIL &&
                <Alert bsStyle="danger">
                  <FormattedMessage {...messages.formEditUserInformation.submitResult.fail}/>
                </Alert>
              }
              <Button type="submit" bsStyle="success" disabled={submitting}>
                {formatMessage(messages.formEditUserInformation.button.saveChanges)}
              </Button>
            </div>
          </form>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialValues: state.admin.userManagement.selectedUser,
  submitResult: state.admin.userManagement.submitResult
});

export default reduxForm({
  form: 'FormEditUserInformation',
  fields: ['id', 'email', 'fullName', 'gender', 'identityNumber', 'phone', 'room'],
  asyncBlurFields: ['email','fullName', 'gender', 'identityNumber', 'phone', 'room'],
  validate
}, mapStateToProps, null)(injectIntl(FormEditUserInformation));
