import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
export default class RequestListRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.request.id}</td>
        <td>{this.props.request.name}</td>
        <td>{this.props.request.ownerId}</td>
        <td>{this.props.request.not}</td>
        <td>{this.props.request.status}</td>
        <td className="actions">
          <Link to={`/admin/requests/${this.props.request.id}/view`} className="btn btn-warning">
            <i className="fa fa-eye"></i>
          </Link>
        </td>
      </tr>
    );
  }
}
