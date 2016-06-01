import React, { Component, PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import RequestListRow from 'app/components/admin/RequestListRow';
import ModalViewRequest from 'app/components/admin/ModalViewRequest';
import ModalResponseRequest from 'app/components/admin/ModalResponseRequest';
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
      showViewRequestModal: false,
      showResponseRequestModal: false,
      selectedRequest: {}
    };

    this.openViewRequestModal = this.openViewRequestModal.bind(this);
    this.closeViewRequestModal = this.closeViewRequestModal.bind(this);
    this.openResponseRequestModal = this.openResponseRequestModal.bind(this);
    this.closeResponseRequestModal = this.closeResponseRequestModal.bind(this);
  }

  openViewRequestModal(request) {
    this.setState({
      showViewRequestModal: true,
      selectedRequest: request
    });
  }

  closeViewRequestModal() {
    this.setState({
      showViewRequestModal: false,
      selectedRequest: {}
    });
  }

  openResponseRequestModal() {
    this.setState({
      showViewRequestModal: false
    });
    this.setState({
      showResponseRequestModal: true
    });
  }

  closeResponseRequestModal() {
    this.setState({
      showResponseRequestModal: false
    });
  }

  render() {
    return (
      <div>
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
              request={request}
              openViewRequestModal={this.openViewRequestModal}/>
          )}
          </tbody>
        </table>
        <ModalViewRequest
          showModal={this.state.showViewRequestModal}
          selectedRequest={this.state.selectedRequest}
          closeModal={this.closeViewRequestModal}
          responseToRequest={this.openResponseRequestModal}
          />

        <ModalResponseRequest
          showModal={this.state.showResponseRequestModal}
          selectedRequest={this.state.selectedRequest}
          closeModal={this.closeResponseRequestModal}
          />
      </div>

    );
  }
}
