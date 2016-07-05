import React from 'react';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';
import OrderStatus from 'app/shared/orderStatus';
import { injectIntl } from 'react-intl';
import './LabelOrderStatus.scss';

const LabelOrderStatus = ({ status, intl: { formatMessage } }) => {
  let output = '';
  switch(status) {
    case OrderStatus.NEW:
      output = <div className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.new)}</div>
      break;
    case OrderStatus.ACCEPTED:
      output = <div className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.accepted)}</div>
      break;
    case OrderStatus.SHIPPING:
      output = <div className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.shipping)}</div>
      break;
    case OrderStatus.COMPLETED:
      output = <div className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.completed)}</div>
      break;
    case OrderStatus.REJECTED:
      output = <div className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.rejected)}</div>
      break;
    case OrderStatus.CANCELED:
      output = <div className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.canceled)}</div>
      break;
    case OrderStatus.ABORTED:
      output = <div className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.aborted)}</div>
      break;

  }
  return output;
}

export default injectIntl(LabelOrderStatus);
