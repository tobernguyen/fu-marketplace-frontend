import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import Cropper from './Cropper.jsx';

export default class ModalCropImage extends Component {
  render() {
    return(
      <Modal
        onHide={this.props.onRequestHide}
        show={this.props.modalCropImageShown}>
        <Modal.Header closeButton>
          <Modal.Title>Position and size your photo</Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <Cropper
            image={this.props.image}
            width={this.props.width}
            height={this.props.height}
            onRequestHide={this.props.onRequestHide}
            onCrop={this.props.onCrop}
          />
        </div>
      </Modal>
    );
  }
}

ModalCropImage.defaultProps = { width: 400, height: 400};
