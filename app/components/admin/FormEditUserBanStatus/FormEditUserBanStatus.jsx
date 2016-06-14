import React, { Component, PropTypes } from 'react';
import {
  ControlLabel,
  Button,
  FormGroup,
  FormControl,
  Alert,
  Col
} from 'react-bootstrap';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class FormEditUserBanStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isValid: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange(e) {
    this.setState({
      email: e.target.value
    });
    if(e.target.value === this.props.user.email) {
      this.setState({
        isValid: true
      });
    } else {
      this.setState({
        isValid: false
      });
    }
  }

  handleOnClick() {
    const { user } = this.props;
    if(this.state.email === user.email) {
      if(user.banned === false) {
        this.props.adminBanUser(user);
      } else if ( user.banned === true) {
        this.props.adminUnbanUser(user);
      }
    }
  }

  render() {
    const title = (
      <h3>Ban user</h3>
    );
    const { user, isSubmitting, submitResult } = this.props;
    return(
      <div className="row">
        <Col lg={3}>
          <h4 className="ban-title"><strong>Ban</strong></h4>
          <p>Ban user from accessing FU Marketplace</p>
        </Col>
        <Col lg={9}>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="text"
              name="email"
              onChange={this.handleOnChange}
            />
          </FormGroup>
          <ul>
            <li>User will be banned from accessing FU Marketplace</li>
            <li>Banned user can be released in the future</li>
            <li>Type <code>{user.email}</code> to confirm banning this user</li>
          </ul>
          <div className="form-actions">
            {submitResult === AsyncResultCode.BAN_USER_SUCCESS && <Alert bsStyle="danger">User has been banned</Alert>}
            {submitResult === AsyncResultCode.BAN_USER_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
            {submitResult === AsyncResultCode.UNBAN_USER_SUCCESS && <Alert bsStyle="danger">User has been released</Alert>}
            {submitResult === AsyncResultCode.UNBAN_USER_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}

            <Button
              bsStyle="danger"
              onClick={this.handleOnClick}
              disabled={isSubmitting || !this.state.isValid}>
              {user.banned ? 'Release' : 'Ban'}
            </Button>
          </div>
        </Col>
      </div>
    );
  }
}

export default FormEditUserBanStatus;
