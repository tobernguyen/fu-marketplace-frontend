import React from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import { Link } from 'react-router';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class ModalOpenTicket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dirty: false,
      message: {
        value: '',
        hasErrors: false,
        error: ''
      }
    }

    this.submitTicket = () => {
      const { order } = this.props;
      const { message } = this.state;
      if(!message.hasErrors) {
        this.props.openTicket(order.id, message.value);
      }
    }

    this.handleChange = (e) => {
      let dirty = true;
      const { message } = this.state;
      message['value'] = e.target.value;
      if (e.target.value.trim().length == 0) {
        message['hasErrors'] = true;
        message['error'] = messages.myOrder.openTicketModal.validation.message.blank
        dirty = false;
      } else {
        message['hasErrors'] = false;
        message['error'] = ''
      }

      if (e.target.value.trim().length > 65000) {
        message['hasErrors'] = true;
        message['error'] = messages.myOrder.openTicketModal.validation.message.long
        dirty = false;
      } else {
        message['hasErrors'] = false;
        message['error'] = ''
      }

      this.setState({
        dirty,
        message
      });
    }
  }
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
    const { order, showModal, closeModal , intl: { formatMessage }, ticket } = this.props;
    const { message, dirty } = this.state;
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
            <div className={`form-group ${message.hasErrors ? 'has-error' : ''}`}>
              <label className="control-label">
                <FormattedMessage {...messages.myOrder.openTicketModal.userMessage.title}/>
              </label>
              <textarea
                className="form-control"
                placeholder={formatMessage(messages.myOrder.openTicketModal.userMessage.placeholder)}
                onChange={this.handleChange}
                disabled={ticket.isSubmitting || ticket.submitResult === AsyncResultCode.OPEN_TICKET_SUCCESS}
                />
                <div className="help-block">
                {message.hasErrors && <FormattedMessage {...message.error}/>}
                </div>
            </div>
            {
              ticket.submitResult === AsyncResultCode.OPEN_TICKET_SUCCESS &&
              <div className="alert alert-success">
                <FormattedMessage {...messages.myOrder.openTicketModal.asyncMessage.success} />
              </div>
            }
            {
              ticket.submitResult === AsyncResultCode.OPEN_TICKET_FAILURE &&
              <div className="alert alert-danger">
                <FormattedMessage {...messages.myOrder.openTicketModal.asyncMessage.fail} />
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            {ticket.submitResult !== AsyncResultCode.OPEN_TICKET_SUCCESS &&
              <button className="btn btn-danger" onClick={this.submitTicket} disabled={ticket.isSubmitting || !dirty}>
                <FormattedMessage {...messages.myOrder.openTicketModal.button.sendReport}/>{ticket.isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
              </button>
            }
            <button className="btn btn-close" onClick={closeModal}>
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
