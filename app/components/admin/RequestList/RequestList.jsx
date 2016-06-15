import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import RequestListRow from 'app/components/admin/RequestListRow';
import './RequestList.scss';

class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRequest: {}
    };
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>RequesterId</th>
            <th>Note</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {this.props.requests.map(request =>
          <RequestListRow
            key={request.id}
            request={request} />
        )}
        </tbody>
      </table>

    );
  }
}

RequestList.defaultProps = {
  requests: []
};

export default RequestList;