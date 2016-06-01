import React, { Component, PropTypes } from 'react';
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap';

// Dynamic Message and Title is great...

class ModalResponseRequest extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeModal} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>
            Phản hồi yêu cầu : "{this.props.selectedRequest.title}"
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Tiêu đề:</ControlLabel>
            <FormControl
              type="text"
              placeholder="Tiêu đề"
              defaultValue={`Phản hồi yêu cầu: ${this.props.selectedRequest.title}`}
              />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Hành động</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="accept">Chấp nhận</option>
              <option value="reject">Từ chối</option>
              <option value="require-more-information">Yêu cầu thêm thông tin</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Thông điệp:</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Thông điệp" />
          </FormGroup>
          <FormGroup controlId="formControlsFile">
            <ControlLabel>Đính kèm</ControlLabel>
            <FormControl type="file" />
            <HelpBlock>Đính kèm thêm chứng cứ hoặc thông tin bổ sung</HelpBlock>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary">Gửi phản hồi</Button>
          <Button onClick={this.props.closeModal}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalResponseRequest;
