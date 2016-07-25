import React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import OrderStatus from 'app/shared/orderStatus';

const ModalSellerMessage = ({ showModal, closeModal, order }) => {
  let title = '';
  let body = '';
  switch (order.status) {
    case OrderStatus.REJECTED:
      title = <FormattedMessage {...messages.myOrder.sellerMessageModal.title.rejected}/>
      body = (
        <div>
          <FormattedMessage {...messages.myOrder.sellerMessageModal.body.rejected} /><br />
          <strong>{order.sellerMessage}</strong>
        </div>
      )
      break;
    default:

  }
  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-info" onClick={closeModal}>
          <FormattedMessage {...messages.myOrder.sellerMessageModal.button.close}/>
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default injectIntl(ModalSellerMessage);
