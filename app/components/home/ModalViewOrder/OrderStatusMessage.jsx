import React from 'react';

const OrderStatusMessage = ({ message }) => {
  return (
    <div className="text-center">
      <h4 className="order-status-message">
        {message}
      </h4>
    </div>
  );
}

export default OrderStatusMessage;
