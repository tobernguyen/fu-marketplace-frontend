import React, {PropTypes, Component} from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class ModalViewRequest extends Component {
  renderAttachments(attachments) {
    if(attachments !== undefined && attachments !== null && attachments.length !== 0) {
      return (
        attachments.map(attachment =>
          <FormControl.Static key={attachment.id}>
          <a href={attachment.link} target="_blank">
            {attachment.name}
          </a>
          </FormControl.Static>
        )
      );
    } else {
      return <FormControl.Static>Không có tệp đính kèm khả dụng</FormControl.Static>
    }
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>{this.props.selectedRequest.title}</Modal.Title>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Người gửi yêu cầu:</ControlLabel>
              <FormControl.Static>{this.props.selectedRequest.requester}</FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Tiêu đề:</ControlLabel>
              <FormControl.Static>{this.props.selectedRequest.title}</FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Dạng:</ControlLabel>
              <FormControl.Static>{this.props.selectedRequest.type}</FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Thông điệp:</ControlLabel>
              <FormControl.Static>{this.props.selectedRequest.message}</FormControl.Static>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Tệp đính kèm:</ControlLabel>
              {this.renderAttachments(this.props.selectedRequest.attachments)}
            </FormGroup>
            <FormGroup>
              <ControlLabel>Trạng thái:</ControlLabel>
              <FormControl.Static>{this.props.selectedRequest.status}</FormControl.Static>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="warning" onClick={this.props.responseToRequest}>Phản hồi</Button>
            <Button onClick={this.props.closeModal}>Đóng</Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    );
  }
}

export default ModalViewRequest;
