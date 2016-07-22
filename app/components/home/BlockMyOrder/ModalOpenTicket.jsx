import React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import { Link } from 'react-router';

class ModalOpenTicket extends React.Component {
  renderOrderLine(orderLine) {
    return (
      <span className="ordered-item">{orderLine.item.name}({orderLine.quantity})</span>
    );
  }
  renderOrderLines(orderLines) {
    if(orderLines) {
      return (
        <span>
        {orderLines.map(orderLine =>
          <span key={orderLine.item.id} className="ordered-item">{orderLine.item.name}({orderLine.quantity})</span>
        )}
        </span>
      );
    }

  }
  render() {
    const { order, showModal, closeModal , intl: { formatMessage } } = this.props;
    let title = <FormattedMessage {...messages.myOrder.openTicketModal.title}/>;
    if(order.orderLines) {
      return (
        <Modal className="open-ticket-modal" show={showModal} onHide={closeModal}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
            <p className="sub-header">{formatMessage(messages.myOrder.openTicketModal.subHeader)}</p>
          </Modal.Header>
          <Modal.Body>
            <h5>
              <strong>
                <FormattedMessage {...messages.myOrder.openTicketModal.orderInformation.title}/>
              </strong>
            </h5>
            <div className="order-information">
              <div>
                <strong><FormattedMessage {...messages.myOrder.openTicketModal.orderInformation.fields.orderId}/></strong>
                <span>{order.id}</span>
              </div>
              <div>
                <strong><FormattedMessage {...messages.myOrder.openTicketModal.orderInformation.fields.shop}/></strong>
                <Link to={`/shops/${order.shopId}`}>Cua hang</Link>
              </div>
              <div>
                <strong><FormattedMessage {...messages.myOrder.openTicketModal.orderInformation.fields.orderLines}/></strong>
                {this.renderOrderLines(order.orderLines)}
              </div>
              <div>
                <strong><FormattedMessage {...messages.myOrder.openTicketModal.orderInformation.fields.shipAddress}/></strong>
                <span>{order.shipAddress}</span>
              </div>
              <div>
                <strong><FormattedMessage {...messages.myOrder.openTicketModal.orderInformation.fields.createdAt}/></strong>
                <span><FormattedRelative value={new Date(order.createdAt)} /></span>
              </div>
              <div>
                <strong><FormattedMessage {...messages.myOrder.openTicketModal.orderInformation.fields.orderStatus}/></strong>
                <LabelOrderStatus status={order.status} />
              </div>

            </div>
            <h5>
              <strong>
                <FormattedMessage {...messages.myOrder.openTicketModal.userMessage.title}/>
              </strong>
            </h5>
            <div className="user-message">
              <textarea className="form-control" placeholder={formatMessage(messages.myOrder.openTicketModal.userMessage.placeholder)} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={() => console.log('Hello')}>
              <FormattedMessage {...messages.myOrder.openTicketModal.button.sendReport}/>
            </button>
            <button className="btn" onClick={closeModal}>
              <FormattedMessage {...messages.myOrder.sellerMessageModal.button.close}/>
            </button>
          </Modal.Footer>
        </Modal>
      );
    }

    return null;

  }
}

export default injectIntl(ModalOpenTicket);
