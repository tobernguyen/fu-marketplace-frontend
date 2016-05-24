import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';
import './UserManagementRow.scss';

export default class UserManagementRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
    this.toggleEditMode = () => {
      this.setState({ isEditing: !this.state.isEditing });
    }
  }


  render() {
    if (this.state.isEditing === false) {
      return (
        <tr>
            <td>{this.props.user.id}</td>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.fullname}</td>
            <td>{this.props.user.room}</td>
            <td>{this.props.user.phone}</td>
            <td>{this.props.user.banStatus === true ? 'True' : 'False' }</td>
            <td><Button bsStyle="warning" onClick={this.toggleEditMode}>Edit</Button>  </td>
        </tr>
      );
    } else {
      return (
        <tr>
            <td>{this.props.user.id}</td>
            <td><FormControl type="text" placeholder="Username" defaultValue={this.props.user.username}/></td>
            <td><FormControl type="email" placeholder="Email" defaultValue={this.props.user.email} /></td>
            <td><FormControl type="text" placeholder="Full Name" defaultValue={this.props.user.fullname} /></td>
            <td><FormControl type="text" placeholder="Room" defaultValue={this.props.user.room} /></td>
            <td><FormControl type="text" placeholder="Phone Number" defaultValue={this.props.user.phone} /></td>
            <td>{this.props.user.banStatus === true ? 'True' : 'False' }</td>
            <td><Button bsStyle="success">Submit</Button><Button bsStyle="warning" onClick={this.toggleEditMode}>Cancel</Button></td>
        </tr>
      );
    }

  }
}
