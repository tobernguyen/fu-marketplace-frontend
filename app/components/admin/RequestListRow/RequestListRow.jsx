import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';

export default class RequestListRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.request.id}</td>
        <td>{this.props.request.title}</td>
        <td>{this.props.request.requester}</td>
        <td>{this.props.request.type}</td>
        <td>{this.props.request.status}</td>
        <td className="actions">
          <Button
            bsStyle="warning"
            onClick={() => this.props.openViewRequestModal(this.props.request)}
            >
            <i className="fa fa-eye"></i>
          </Button>
        </td>
      </tr>
    );
  }
}
