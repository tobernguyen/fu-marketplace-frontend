import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class FormChangePassword extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      passwordToBeChanged: {},
      errors: {},
      errorCount: 0
    };
    
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  onChange(e) {
    let passwordToBeChanged = this.state.passwordToBeChanged;
    passwordToBeChanged[e.target.name] = e.target.value;
    this.setState({
      passwordToBeChanged
    });
    
    
    if(e.target.name == 'oldPassword') {
      if(e.target.value == '') {
        let errors = this.state.errors;
        errors['oldPassword'] = 'Cannot be blank';
        this.setState({
          errors
        });
      } else {
        let errors = this.state.errors;
        errors['oldPassword'] = undefined;
        this.setState({
          errors
        });
      }
    } else if (e.target.name == 'newPassword') {
      if(e.target.value == '') {
        let errors = this.state.errors;
        errors['newPassword'] = 'Cannot be blank';
        this.setState({
          errors
        });
      } if(e.target.value.length < 8) {
        let errors = this.state.errors;
        errors['newPassword'] = 'Password must be longer than 8 character';
        this.setState({
          errors
        });
      } else {
        let errors = this.state.errors;
        errors['newPassword'] = undefined;
        this.setState({
          errors
        });
      }
    } else if (e.target.name == 'repeatNewPassword') {
      if(e.target.value !== this.state.passwordToBeChanged.newPassword) {
        let errors = this.state.errors;
        errors['repeatNewPassword'] = 'Password does not match';
        this.setState({
          errors
        });
      } else {
        let errors = this.state.errors;
        errors['repeatNewPassword'] = undefined;
        this.setState({
          errors
        });
      }
    }
  }
  
  handleSubmit() {
    const errors = this.state.errors;
    if(errors.oldPassword || errors.newPassword || errors.repeatNewPassword) {
      console.log('here');
    } else {
      this.props.changePassword(this.state.passwordToBeChanged);
    }
  }
  
  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Old password</ControlLabel>
          <FormControl
            type="password"
            name="oldPassword"
            placeholder="Old password"
            onChange={this.onChange}
            />
            <div className="has-error message">
              <div className="help-block">
                {this.state.errors['oldPassword']}
              </div>
            </div>
        </FormGroup>
        <FormGroup>
          <ControlLabel>New password</ControlLabel>
          <FormControl
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={this.onChange}
            />
            <div className="has-error message">
              <div className="help-block">
                {this.state.errors['newPassword']}
              </div>
            </div>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Repeat new password</ControlLabel>
          <FormControl
            type="password"
            name="repeatNewPassword"
            placeholder="Repeat new password"
            onChange={this.onChange}
            />
            <div className="has-error message">
              <div className="help-block">
                {this.state.errors['repeatNewPassword']}
              </div>
            </div>
        </FormGroup>
        <Button bsStyle="primary" onClick={this.handleSubmit}>Save</Button>
      </form>
    );
  }
}

export default FormChangePassword;