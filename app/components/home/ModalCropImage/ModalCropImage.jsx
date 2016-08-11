import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import Cropper from './Cropper.jsx';
import { FormattedMessage } from 'react-intl';
import { messages } from './ModalCropImage.i18n';

export default class ModalCropImage extends Component {
  render() {
    return(
      <Modal
        onHide={this.props.onRequestHide}
        show={this.props.modalCropImageShown}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage {...messages.title}/>
          </Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <Cropper
            formSubmitting={this.props.formSubmitting}
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
