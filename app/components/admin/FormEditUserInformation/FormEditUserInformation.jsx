import React, { PropTypes, Component } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Alert
} from 'react-bootstrap';

class FormEditUserInformation extends Component {  
  render() {
    const { adminUpdateUserInformation, fields: { id, email, fullName, gender, identityNumber, room, phone}, handleSubmit, submitting, formStatus} = this.props;
    if(!formStatus.isFetching) {
      const {user, response, responseCode} = formStatus;
      return (
      <form onSubmit={handleSubmit(adminUpdateUserInformation.bind(this))}>
          <FormGroup className={`${email.touched && email.invalid ? 'has-error' : ''}`}>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              placeholder="Email"
              value={user.email}
              {...email}
              value={email.value || ''}
            />
            <HelpBlock>
              {email.touched ? email.error : ''}
            </HelpBlock>
          </FormGroup>
          <FormGroup className={`${fullName.touched && fullName.invalid ? 'has-error' : ''}`}>
            <ControlLabel>Full name</ControlLabel>
            <FormControl
              placeholder="Full name"
              {...fullName}
              value={fullName.value || ''}
            />
            <HelpBlock>
              {fullName.touched ? fullName.error : ''}
            </HelpBlock>
          </FormGroup>
          <FormGroup className={`${gender.touched && gender.invalid ? 'has-error' : ''}`}>
            <ControlLabel>Gender</ControlLabel>
            <FormControl componentClass="select" {...gender} value={gender.value || ''}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </FormControl>
          </FormGroup>
          <FormGroup className={`${identityNumber.touched && identityNumber.invalid ? 'has-error' : ''}`}>
            <ControlLabel>Identity Number</ControlLabel>
            <FormControl
              placeholder="Identity number"
              {...identityNumber}
              value={identityNumber.value || ''}
            />
            <HelpBlock>
              {identityNumber.touched ? identityNumber.error : ''}
            </HelpBlock>
          </FormGroup>
          <FormGroup className={`${room.touched && room.invalid ? 'has-error' : ''}`}>
            <ControlLabel>Room</ControlLabel>
            <FormControl
              placeholder="Room"
              {...room}
              value={room.value || ''}
            />
            <HelpBlock>
              {room.touched ? room.error : ''}
            </HelpBlock>
          </FormGroup>
          <FormGroup className={`${phone.touched && phone.invalid ? 'has-error' : ''}`}>
            <ControlLabel>Phone</ControlLabel>
            <FormControl
              placeholder="Phone"
              {...phone}
              value={phone.value || ''}
            />
            <HelpBlock>
              {phone.touched ? phone.error : ''}
            </HelpBlock>
          </FormGroup>
          <div className="form-actions">
            <Button type="submit" bsStyle="success" disabled={submitting}>
              {submitting ? <i/> : <i/>} Save Changes
            </Button>
          </div>
          { response && responseCode === 1 &&
            <Alert bsStyle="success">
            {response}
          </Alert>
          }
       </form>
      );
    } else {
      return (
        <div>...loading</div>
      );
    }
  }
}

export default FormEditUserInformation;