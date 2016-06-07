import React, { Component } from 'react';
import { Modal, Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import TagInput from 'app/components/common/TagInput';

import './ModalEditUser.scss';

class ModalEditUser extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      userToBeEdited: {},
      errors: {}
    };
    
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleButtonSaveClicked = this.handleButtonSaveClicked.bind(this);
  }
  
  onFieldChange(e) {
    let userToBeEdited = this.state.userToBeEdited;
    userToBeEdited[e.target.name] = e.target.value;
    this.setState({
      userToBeEdited
    });
    
    if(e.target.value === '') {
      let errors = this.state.errors;
      errors[e.target.name] = 'Must not be blank';
      this.setState({
        errors
      });
    } else {
      let errors = this.state.errors;
      errors[e.target.name] = undefined;
      this.setState({
        errors
      });
    }
  }
  
  handleButtonSaveClicked() {
    if(this.state.errorCount == 0) {
      let userToBeEdited = this.state.userToBeEdited;
      userToBeEdited['id'] = this.props.user.id;
      this.props.saveUser(userToBeEdited);
    } else {
      console.log('Handle here!!');
    }
  }
  
  render() {
    const { showModal, closeModal, user } = this.props;
    const { errors } = this.state;
    return (
        <Modal show={showModal} onHide={closeModal} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>{`Edit ${user.email}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup validationState={errors.email ? 'error' : '' }>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                placeholder="Email"
                name="email"
                defaultValue={user.email}
                onChange={this.onFieldChange}
              />
              <FormControl.Feedback />
              {errors['email'] && <div className="error-message">{errors['email']}</div>}
            </FormGroup>
            <FormGroup validationState={errors.fullName ? 'error' : '' }>
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                placeholder="Full Name"
                name="fullName"
                defaultValue={user.fullName}
                onChange={this.onFieldChange}
              />
              <FormControl.Feedback />
              {errors['fullName'] && <div className="error-message">{errors['fullName']}</div>}
            </FormGroup>
            <FormGroup>
              <ControlLabel>Gender</ControlLabel>
              <FormControl
                componentClass="select"
                name="gender"
                defaultValue={user.gender}
                onChange={this.onFieldChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Identity Number</ControlLabel>
              <FormControl
                placeholder="Identity Number"
                name="identityNumber"
                defaultValue={user.identityNumber}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Room</ControlLabel>
              <FormControl
                placeholder="Room"
                name="room"
                defaultValue={user.room}
                onChange={this.onFieldChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Phone</ControlLabel>
              <FormControl
                placeholder="Phone"
                name="phone"
                defaultValue={user.phone}
                onChange={this.onFieldChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Roles</ControlLabel>
              <TagInput tags={user.roles} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Banned</ControlLabel>
              <FormControl
                componentClass="select"
                name="banned"
                defaultValue={user.banned || 'false'}
                onChange={this.onFieldChange}
                >
                <option value="true">True</option>
                <option value="false">False</option>
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.handleButtonSaveClicked}>Save</Button>
            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
};

export default ModalEditUser