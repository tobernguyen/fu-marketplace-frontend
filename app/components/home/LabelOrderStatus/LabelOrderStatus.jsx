import React from 'react';
import { messages } from 'app/components/home/BlockOrderList/BlockOrderList.i18n';
import OrderStatus from 'app/shared/orderStatus';
import { injectIntl } from 'react-intl';
import './LabelOrderStatus.scss';

const LabelOrderStatus = ({ status, intl: { formatMessage } }) => {
  let output = '';
  switch(status) {
    case OrderStatus.NEW:
      output = <span className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.new)}</span>
      break;
    case OrderStatus.ACCEPTED:
      output = <span className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.accepted)}</span>
      break;
    case OrderStatus.SHIPPING:
      output = <span className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.shipping)}</span>
      break;
    case OrderStatus.COMPLETED:
      output = <span className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.completed)}</span>
      break;
    case OrderStatus.REJECTED:
      output = <span className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.rejected)}</span>
      break;
    case OrderStatus.CANCELED:
      output = <span className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.canceled)}</span>
      break;
    case OrderStatus.ABORTED:
      output = <span className={`order-status status-${status}`}>{formatMessage(messages.orderList.tableBody.orderStatus.aborted)}</span>
      break;

  }
  return output;
};

export default injectIntl(LabelOrderStatus);
