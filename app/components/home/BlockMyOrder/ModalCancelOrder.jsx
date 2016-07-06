import React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';

const ModalCancelOrder = ({ showModal, closeModal, cancelOrder }) => {
  return (
    <Modal className="cancel-order-modal" show={showModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title><FormattedMessage {...messages.myOrder.cancelOrderModal.title}/></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><FormattedMessage {...messages.myOrder.cancelOrderModal.message}/></p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn confirm" onClick={cancelOrder}>
          <FormattedMessage {...messages.myOrder.cancelOrderModal.button.accept}/>
        </button>
        <button className="btn" onClick={closeModal}>
          <FormattedMessage {...messages.myOrder.cancelOrderModal.button.cancel}/>
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default injectIntl(ModalCancelOrder);
