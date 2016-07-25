import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Col
} from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditUserInformation/FormEditUserInformation.i18n';
import { reduxForm } from 'redux-form';
import AlertSubmitResult from 'app/components/admin/AlertSubmitResult';
import LoadingSpinner from 'app/components/admin/LoadingSpinner';
import _ from 'lodash';

const validate = (values) => {
  let errors = {};
  let hasErrors = false;
  const validIdentityNumberLength = [9 , 12];
  if(!values.email || values.email.trim() === '') {
    errors.email = {
      id: 'admin.form.userInformation.email.blank',
      defaultMessage: 'Email cannot be blank'
    };
    hasErrors = true;
  }
  if(!values.fullName || values.fullName.trim() === '') {
    errors.fullName = {
      id: 'admin.form.userInformation.fullName.blank',
      defaultMessage: 'Full name cannot be blank'
    };
    hasErrors = true;
  }

  if(!values.identityNumber || values.identityNumber.trim() === '') {
    errors.identityNumber = {
      id: 'admin.form.userInformation.identityNumber.blank',
      defaultMessage: 'Identity number cannot be blank'
    };
    hasErrors = true;
  }

  if(values.identityNumber && isNaN(Number(values.identityNumber))) {
    errors.identityNumber = {
      id: 'admin.form.userInformation.identityNumber.isNaN',
      defaultMessage: 'Identity number must contain only number'
    };
    hasErrors = true;
  }
  if(values.identityNumber && !_.includes(validIdentityNumberLength, values.identityNumber.length)) {
    errors.identityNumber = {
      id: 'admin.form.userInformation.identityNumber.length',
      defaultMessage: 'Identity number must contains 9 or 12 digits'
    };
    hasErrors = true;
  }

  if(!values.phone || values.phone.trim() === '') {
    errors.phone = {
      id: 'admin.form.userInformation.phone.blank',
      defaultMessage: 'Phone number cannot be blank'
    };
    hasErrors = true;
  }

  if(values.phone && isNaN(Number(values.phone))) {
    errors.phone = {
      id: 'admin.form.userInformation.phone.isNaN',
      defaultMessage: 'Phone number must contains only number'
    };
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
      dirty,
      isSubmitting,
      submitResults,
      intl: { formatMessage}
    } = this.props;
    if(isSubmitting) {
      return <LoadingSpinner />;
    }
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
              <HelpBlock>
                {email.touched && email.error ? <FormattedMessage {...email.error}/>: '' }
              </HelpBlock>
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
                <HelpBlock>
                  {fullName.touched && fullName.error ? <FormattedMessage {...fullName.error}/>: '' }
                </HelpBlock>
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
                <HelpBlock>
                  {identityNumber.touched && identityNumber.error ? <FormattedMessage {...identityNumber.error}/>: '' }
                </HelpBlock>
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
                <HelpBlock>
                  {phone.touched && phone.error ? <FormattedMessage {...phone.error}/>: '' }
                </HelpBlock>
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
                <HelpBlock>
                  {room.touched && room.error ? <FormattedMessage {...room.error}/>: '' }
                </HelpBlock>
            </FormGroup>
            <div className="form-actions">
              {
                submitResults !== '' &&
                <AlertSubmitResult result={submitResults}/>
              }
              <Button type="submit" bsStyle="success" disabled={submitting || !dirty }>
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
  initialValues: {
    id: state.admin.userManagement.selectedUser.id,
    email: state.admin.userManagement.selectedUser.email,
    fullName: state.admin.userManagement.selectedUser.fullName,
    gender: state.admin.userManagement.selectedUser.gender === null ? 'male' : state.admin.userManagement.selectedUser.gender,
    identityNumber: state.admin.userManagement.selectedUser.identityNumber === null ? undefined : state.admin.userManagement.selectedUser.identityNumber,
    phone: state.admin.userManagement.selectedUser.phone === null ? undefined : state.admin.userManagement.selectedUser.phone,
    room: state.admin.userManagement.selectedUser.room === null ? undefined : state.admin.userManagement.selectedUser.room
  },
  submitResult: state.admin.userManagement.submitResult
});

export default reduxForm({
  form: 'FormEditUserInformation',
  fields: ['id', 'email', 'fullName', 'gender', 'identityNumber', 'phone', 'room'],
  asyncBlurFields: ['email','fullName', 'gender', 'identityNumber', 'phone', 'room'],
  validate
}, mapStateToProps, null)(injectIntl(FormEditUserInformation));
