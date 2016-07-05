// import { NOTIFICATION_TYPE } from './notificationTypes';
//
// let notificationTypes = {};
// notificationTypes[NOTIFICATION_TYPE.SELLER_CHANGE_ORDER_STATUS] = {
//   id: 'notificationTypes.userPlaceOrder',
//   defaultMessage: '{buyerName} has just placed an order at {shopName}'
// };
//
// notificationTypes[NOTIFICATION_TYPE.OPEN_SHOP_REQUEST_CHANGE] = {
//   id: 'notificationTypes.userPlaceOrder',
//   defaultMessage: '{buyerName} has just placed an order at {shopName}'
// };
//
// notificationTypes[NOTIFICATION_TYPE.USER_PLACE_ORDER] = {
//   id: 'notification.userPlaceOrder',
//   defaultMessage: '{buyerName} has placed an order at {shopName}'
// };
//
// notificationTypes[NOTIFICATION_TYPE.USER_CANCEL_ORDER] = {
//   id: 'notificationTypes.userPlaceOrder',
//   defaultMessage: '{buyerName} has just placed an order at {shopName}'
// };

export const messages = {
  shopOpeningRequest: {
    accepted: {
      id: 'shopOpeningRequest.accepted',
      defaultMessage: 'shop opening request for {name} has been accepted'
    },
    rejected: {
      id: 'shopOpeningRequest.rejected',
      defaultMessage: 'shop opening request for {name} has been rejected due to {adminMessage}'
    }
  },
  orderStatus: {
    accepted: {
      id: 'orderStatus.accepted',
      defaultMessage: 'order #{orderId} at {shopName} has been processed'
    },
    rejected: {
      id: 'orderStatus.rejected',
      defaultMessage: 'order #{orderId} at {shopName} has been rejected due to {sellerMessage}'
    },
    shipping: {
      id: 'orderStatus.shipping',
      defaultMessage: 'order #{orderId} at {shopName} has been shipped'
    },
    completed: {
      id: 'orderStatus.completed',
      defaultMessage: 'your order at {shopName} has been completed, please rate'
    },
    aborted: {
      id: 'orderStatus.aborted',
      defaultMessage: 'order #{orderId} at {shopName} has been cancelled due to {sellerMessage}'
    }
  },
  order: {
    userPlaceOrder: {
      id: 'order.userPlaceOrder',
      defaultMessage: 'you have new order at {shopName} with id {orderId} by {buyerName}'
    },
    userCancelOrder: {
      id: 'order.userCancelOrder',
      defaultMessage: 'order #{orderId} was be cancelled by buyer'
    }
  }
};

