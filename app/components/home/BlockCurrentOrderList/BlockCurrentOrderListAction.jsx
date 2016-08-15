import React from 'react';
import OrderStatus from 'app/shared/orderStatus';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';
import { FormattedMessage , injectIntl } from 'react-intl';
import OrderStatusMessage from 'app/components/home/ModalViewOrder/OrderStatusMessage.jsx';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import RejectOrderForm from 'app/containers/home/SellerDashboard/ManageOrders/RejectOrderForm';

const BlockCurrentOrderListAction = ({ order, acceptOrder, rejectOrder, startShippingOrder, completeOrder, abortOrder, intl: { formatMessage }}) => {
  let output = '';
  const rejectForm = (
    <Popover id="rejectForm">
      <RejectOrderForm
        bsRole="menu"
        actionName={formatMessage(messages.modalViewOrder.button.reject)}
        onSubmit={rejectOrder}
        />
    </Popover>
  );

  const abortForm = (
    <Popover id="abortForm">
      <RejectOrderForm
        bsRole="menu"
        actionName={formatMessage(messages.modalViewOrder.button.abort)}
        onSubmit={abortOrder}
        />
    </Popover>
  );

  switch (order.status) {
    case OrderStatus.NEW:
      output = <div className="btn-toolbar">
          <button type="button" className="btn btn-success" onClick={() => acceptOrder(order.id)}>
            <FormattedMessage {...messages.modalViewOrder.button.accept} />
          </button>
          <OverlayTrigger trigger="click" placement="right" overlay={rejectForm} rootClose>
          <button type="button" className="btn btn-danger">
            <FormattedMessage {...messages.modalViewOrder.button.reject} />
          </button>
          </OverlayTrigger>
        </div>
      break;
    case OrderStatus.ACCEPTED:
      output = (
        <div className="btn-toolbar">
          <button type="button" className="btn btn-shipping" onClick={() => startShippingOrder(order.id)}>
            <FormattedMessage {...messages.modalViewOrder.button.startShipping}/>
          </button>
          <OverlayTrigger trigger="click" placement="right" overlay={abortForm} rootClose>
          <button type="button" className="btn btn-reject" bsRole="toggle">
            <FormattedMessage {...messages.modalViewOrder.button.abort} />
          </button>
          </OverlayTrigger>
        </div>
      );
      break;
    case OrderStatus.REJECTED:
      output = <OrderStatusMessage message={formatMessage(messages.modalViewOrder.orderStatus.rejected)} sellerMessage={order.sellerMessage}/>
      break;
    case OrderStatus.SHIPPING:
      output = (
        <div className="btn-toolbar">
          <button type="button" className="btn btn-complete" onClick={() => completeOrder(order.id)}>
            <FormattedMessage {...messages.modalViewOrder.button.complete}/>
          </button>
          <OverlayTrigger trigger="click" placement="right" overlay={abortForm} rootClose>
          <button type="button" className="btn btn-reject" bsRole="toggle">
            <FormattedMessage {...messages.modalViewOrder.button.abort} />
          </button>
          </OverlayTrigger>
        </div>
      );
      break;
    case OrderStatus.COMPLETED:
      output = <OrderStatusMessage message={formatMessage(messages.modalViewOrder.orderStatus.completed)}/>
    break;
    case OrderStatus.CANCELED:
      output = <OrderStatusMessage message={formatMessage(messages.modalViewOrder.orderStatus.canceled)}/>
    break;
    case OrderStatus.ABORTED:
      output = <OrderStatusMessage message={formatMessage(messages.modalViewOrder.orderStatus.aborted)} sellerMessage={order.sellerMessage}/>
      break;
    default:
      output = <OrderStatusMessage message={formatMessage(messages.modalViewOrder.orderStatus.noStatus)}/>
  }

  return <div className="modal-view-order-footer">{output}</div>;
}

export default injectIntl(BlockCurrentOrderListAction);
