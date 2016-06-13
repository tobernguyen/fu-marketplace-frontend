import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import RequestListRow from 'app/components/admin/RequestListRow';
import './RequestList.scss';

const mockData = [
  {
    id: 1,
    title: "Mo shop",
    requester: "tobernguyen",
    type: "Shop Opening",
    message: "Xin chao, to muon mo 1 cai shop",
    attachments: [{
      id: 1,
      name: 'attachment-1',
      link: 'http://3.bp.blogspot.com/-f6Do7Hmorw4/Vhpgt9ggrpI/AAAAAAAABSc/7f33oonxX4Q/s1600/Le_Phuong_Thao.jpg'
    }],
    status: "Requested"
  }
]


export default class RequestList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRequest: {}
    };
  }

  render() {
    return (
      <Panel>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Người gửi yêu cầu</th>
              <th>Dạng</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
          {mockData.map(request =>
            <RequestListRow
              key={request.id}
              request={request} />
          )}
          </tbody>
        </table>
      </Panel>

    );
  }
}
