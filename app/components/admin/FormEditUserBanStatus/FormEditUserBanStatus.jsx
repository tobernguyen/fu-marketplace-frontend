import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Button,
  FormGroup,
  FormControl,
  Alert
} from 'react-bootstrap';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class FormEditUserBanStatus extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: ''
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  
  handleOnChange(e) {
    this.setState({
      email: e.target.value
    });
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
      <Panel bsStyle="danger" header={title}>
        <p>This action will {user.banned ? 'release' : 'ban'} user,
        please type <strong>{user.email}</strong> to confirm this action.</p>
        <FormGroup>
          <FormControl
            type="text"
            name="email"
            onChange={this.handleOnChange}
            />
          <div className="form-actions">
            {submitResult === AsyncResultCode.BAN_USER_SUCCESS && <Alert bsStyle="danger">User has been banned</Alert>}
            {submitResult === AsyncResultCode.BAN_USER_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
            {submitResult === AsyncResultCode.UNBAN_USER_SUCCESS && <Alert bsStyle="danger">User has been released</Alert>}
            {submitResult === AsyncResultCode.UNBAN_USER_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
            
            <Button
              bsStyle="danger"
              onClick={this.handleOnClick}
              disabled={isSubmitting}>
              {user.banned ? 'Release' : 'Ban'}
            </Button>
          </div>
        </FormGroup>
      </Panel>
    );
  }
}

export default FormEditUserBanStatus;