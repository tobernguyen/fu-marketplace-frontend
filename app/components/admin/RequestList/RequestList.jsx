import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import RequestListRow from 'app/components/admin/RequestListRow';
import './RequestList.scss';

const mockData = [
  {
    id: 1,
    title: "Mo shop",
    requester: "tobernguyen",
    type: "Shop Opening",
    content: "Xin chao, to muon mo 1 cai shop",
    attachment: null,
    status: "Requested"
  }
]


export default class RequestList extends Component {
  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Requester</th>
            <th>Type</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {mockData.map(request =>
          <RequestListRow key={request.id} request={request} />
        )}
        </tbody>
      </table>
    );
  }
}
