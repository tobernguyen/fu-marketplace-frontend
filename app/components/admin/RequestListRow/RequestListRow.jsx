import React, {Component, PropTypes} from 'react';
import { Button } from 'react-bootstrap';

export default class RequestListRow extends Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
      <tr>
        <td>{this.props.request.id}</td>
        <td>{this.props.request.title}</td>
        <td>{this.props.request.requester}</td>
        <td>{this.props.request.type}</td>
        <td>{this.props.request.status}</td>
        <td className="actions">
          <Button bsStyle="success" onClick={this.toggleAcceptForm}>
            <i className="fa fa-check"></i>
          </Button>
          <Button bsStyle="danger" onClick={this.toggleRejectForm}>
            <i className="fa fa-ban"></i>
          </Button>
        </td>
      </tr>
    );
  }
}
