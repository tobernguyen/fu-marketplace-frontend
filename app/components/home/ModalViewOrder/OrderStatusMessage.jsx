import React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';

const OrderStatusMessage = ({ sellerMessage, message }) => {
  return (
    <div className="text-center">
      <h4 className="order-status-message">
        {message}
      </h4>
      {
        sellerMessage &&
        <div>
          <FormattedMessage {...messages.modalViewOrder.orderStatusMessage.message} />
          <strong>{sellerMessage}</strong>
        </div>
      }
    </div>
  );
}

export default OrderStatusMessage;
