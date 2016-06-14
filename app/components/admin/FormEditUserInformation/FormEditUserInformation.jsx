import React, { PropTypes, Component } from 'react';
import {
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Alert,
  Col
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import AsyncResultCode from 'app/shared/asyncResultCodes';


const validate = (values) => {
  let errors = {};
  let hasErrors = false;
  if(!values.email || values.email.trim() === '') {
    errors.email = 'Email cannot be blank';
    hasErrors = true;
  }
  if(!values.fullName || values.fullName.trim() === '') {
    errors.fullName = 'Full name cannot be blank';
    hasErrors = true;
  }

  return hasErrors && errors;
}

class FormEditUserInformation extends Component {
  render() {
    const {
      fields: {
        id,
        email,
        fullName,
        gender,
        identityNumber,
        phone,
        room
      },
      handleSubmit,
      submitting,
      submitResult
    } = this.props;
    const title = (
      <h3>Edit user information</h3>
    );
    return (
      <div className="row">
        <Col lg={3}>
          <h4 className="information-title"><strong>Information</strong></h4>
          <p>Edit personal information</p>
        </Col>
        <Col lg={9}>
          <form onSubmit={handleSubmit(this.props.adminUpdateUserInformation)}>
            <FormGroup
              className={`${email.touched && email.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                placeholder="Email"
                {...email} />
              <HelpBlock>{email.touched ? email.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${fullName.touched && fullName.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Full Name"
                {...fullName} />
              <HelpBlock>{fullName.touched ? fullName.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${gender.touched && gender.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Gender</ControlLabel>
              <FormControl
                componentClass="select"
                {...gender} >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FormControl>
            </FormGroup>
            <FormGroup
              className={`${identityNumber.touched && identityNumber.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Identity Number</ControlLabel>
              <FormControl
                type="text"
                placeholder="Identity number"
                {...identityNumber} />
              <HelpBlock>{identityNumber.touched ? identityNumber.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${phone.touched && phone.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Phone number</ControlLabel>
              <FormControl
                type="text"
                placeholder="Phone number"
                {...phone} />
              <HelpBlock>{phone.touched ? phone.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${room.touched && room.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Room</ControlLabel>
              <FormControl
                type="text"
                placeholder="Room"
                {...room} />
              <HelpBlock>{room.touched ? room.error: '' }</HelpBlock>
            </FormGroup>
            <div className="form-actions">
              {submitResult === AsyncResultCode.UPDATE_USER_INFORMATION_SUCCESS && <Alert bsStyle="success">User information has been saved</Alert>}
              {submitResult === AsyncResultCode.UPDATE_USER_INFORMATION_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
              <Button type="submit" bsStyle="success" disabled={submitting}>
                Save changes
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
  null,
  asyncBlurFields: ['email','fullName', 'gender', 'identityNumber', 'phone', 'room'],
  validate
}, mapStateToProps, null)(FormEditUserInformation);
