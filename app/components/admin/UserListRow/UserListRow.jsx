import React, { Component, PropTypes } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import './UserListRow.scss';

export default class UserManagementRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
    let change = this.props.user

    this.toggleEditMode = () => {
      this.setState({ isEditing: !this.state.isEditing });
    }

    this.handleSubmit = () => {
      this.props.editUser(change);

      this.toggleEditMode();
    }
    this.handleUsernameChange = (e) => {
      change.username = e.target.value;
    }

    this.handleEmailChange = (e) => {
      change.email = e.target.value;
    }

    this.handleFullnameChange = (e) => {
      change.fullname = e.target.value;
    }

    this.handleRoomChange = (e) => {
      change.room = e.target.value;
    }

    this.handlePhoneChange = (e) => {
      change.phone = e.target.value;
    }

    this.handleBanStatusChange = (e) => {
      let newBanStatus = change.banStatus;
      newBanStatus = e.target.value === "true" ? true : false;
      change.banStatus = newBanStatus;
    }

    this.renderSelect = (banStatus) => {
      if(banStatus === true) {
        return (
          <FormControl componentClass="select" onChange={this.handleBanStatusChange}>
            <option value="true" selected>True</option>
            <option value="false">False</option>
          </FormControl>
        );
      }

      return (
        <FormControl componentClass="select" onChange={this.handleBanStatusChange}>
          <option value="true">True</option>
          <option value="false" selected>False</option>
        </FormControl>
      );
    }
  }



  render() {
    if (this.state.isEditing === false) {
      return (
        <tr>
            <td>
              {this.props.user.id}
            </td>
            <td>
              {this.props.user.username}
            </td>
            <td>
              {this.props.user.email}
            </td>
            <td>
              {this.props.user.fullname}
            </td>
            <td>
              {this.props.user.room}
            </td>
            <td>
              {this.props.user.phone}
            </td>
            <td>
              {this.props.user.banStatus === true ? 'True' : 'False' }
            </td>
            <td className="actions">
              <Button bsStyle="warning" onClick={this.toggleEditMode}>
                <i className="fa fa-pencil-square-o"></i>
              </Button>
            </td>
        </tr>
      );
    } else {
      return (
        <tr>
            <td>
              {this.props.user.id}
            </td>
            <td>
              <FormControl
                type="text"
                placeholder="Username"
                defaultValue={this.props.user.username}
                onChange={this.handleUsernameChange}
                />
            </td>
            <td>
              <FormControl
                type="email"
                placeholder="Email"
                defaultValue={this.props.user.email}
                onChange={this.handleEmailChange}
                />
            </td>
            <td>
              <FormControl
                type="text"
                placeholder="Full Name"
                defaultValue={this.props.user.fullname}
                onChange={this.handleFullnameChange}
                />
            </td>
            <td>
              <FormControl
                type="text"
                placeholder="Room"
                defaultValue={this.props.user.room}
                onChange={this.handleRoomChange}
                />
            </td>
            <td>
              <FormControl
                type="text"
                placeholder="Phone Number"
                defaultValue={this.props.user.phone}
                onChange={this.handlePhoneChange}
                />
            </td>
            <td>
              {this.renderSelect(this.props.user.banStatus)}
            </td>
            <td className="actions">
              <Button bsStyle="success" onClick={this.handleSubmit}>
                <i className="fa fa-paper-plane-o"></i>
              </Button>
              <Button bsStyle="danger" onClick={this.toggleEditMode}>
                <i className="fa fa-ban"></i>
              </Button>
            </td>
        </tr>
      );
    }

  }
}
