import React, { Component, PropTypes } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import './UserListRow.scss';

export default class UserManagementRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      change : this.props.user
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleBanStatusChange = this.handleBanStatusChange.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  toggleEditMode(){
      this.setState({ isEditing: !this.state.isEditing });
  }

  handleOnChange(e) {
      let unstagedChange = this.state.change;
      unstagedChange[e.target.name] = e.target.value;
      console.log(unstagedChange);
      this.setState({change: unstagedChange});
    }

  handleBanStatusChange(e) {
      let unstagedChange = this.state.change;
      unstagedChange['banStatus'] = e.target.value === "true" ? true : false;
      this.setState({change: unstagedChange});
  }
  
  handleSubmit() {
      this.props.editUser(this.state.change);

      this.toggleEditMode();
  }
  
  renderSelect(banStatus) {
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
                name="username"
                placeholder="Username"
                defaultValue={this.props.user.username}
                onChange={this.handleOnChange}
                />
            </td>
            <td>
              <FormControl
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={this.props.user.email}
                onChange={this.handleOnChange}
                />
            </td>
            <td>
              <FormControl
                type="text"
                name="fullname"
                placeholder="Full Name"
                defaultValue={this.props.user.fullname}
                onChange={this.handleOnChange}
                />
            </td>
            <td>
              <FormControl
                type="text"
                placeholder="Room"
                name="room"
                defaultValue={this.props.user.room}
                onChange={this.handleOnChange}
                />
            </td>
            <td>
              <FormControl
                type="text"
                name="phone"
                placeholder="Phone Number"
                defaultValue={this.props.user.phone}
                onChange={this.handleOnChange}
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
