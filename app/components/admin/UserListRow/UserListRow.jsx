import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import TagInput from 'app/components/common/TagInput';
import './UserListRow.scss';

export default class UserManagementRow extends Component {
  constructor(props, context) {
    super(props, context);
    
  }
  render() {
      return (
        <tr>
            <td>
              {this.props.user.id || 'N/A'}
            </td>
            <td>
              {this.props.user.email || 'N/A'}
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
              <Link className="btn btn-warning" to={`admin/users/${this.props.user.id}/edit`} bsStyle="warning">
                <i className="fa fa-pencil-square-o"></i>
              </Link>
            </td>
        </tr>
     );
  }
}
