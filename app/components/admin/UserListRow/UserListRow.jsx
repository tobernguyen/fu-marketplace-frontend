import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import TagInput from 'app/components/common/TagInput';
import './UserListRow.scss';

export default class UserManagementRow extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
  }
  handleButtonClicked() {
    this.props.openEditModal(this.props.user);
  }
  render() {
      return (
        <tr>
            <td>
              {this.props.user.id || 'N/A'}
            </td>
            <td>
              <Link to={`admin/users/${this.props.user.id}/edit`}>
              {this.props.user.email || 'N/A'}
              </Link>
            </td>
            <td>
              {this.props.user.fullName || 'N/A'}
            </td>
            <td>
              {this.props.user.gender || 'N/A'}
            </td>
            <td>
              {this.props.user.identityNumber || 'N/A'}
            </td>
            <td>
              {this.props.user.room || 'N/A'}
            </td>
            <td>
              {this.props.user.phone || 'N/A'}
            </td>
            <td>
              {this.props.user.roles[0]}
            </td>
            <td>
              {this.props.user.banned === true ? 'True' : 'False' }
            </td>
            <td className="actions">
              <Button bsStyle="warning" onClick={this.handleButtonClicked}>
                <i className="fa fa-pencil-square-o"></i>
              </Button>
            </td>
        </tr>
     );
  }
}
