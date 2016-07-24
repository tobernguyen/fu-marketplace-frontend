export const NOTIFICATION_TYPE = {
  SELLER_CHANGE_ORDER_STATUS: 1,
  OPEN_SHOP_REQUEST_CHANGE: 2,
  USER_PLACE_ORDER: 3,
  USER_CANCEL_ORDER: 4,
  USER_TICKET_STATUS_CHANGE: 5
};

export const ORDER_STATUS = {
  NEW: 0,
  ACCEPTED: 1,
  SHIPPING: 2,
  COMPLETED: 3, // finish by seller
  REJECTED: 4, // by seller
  CANCELED: 5,  // by buyer
  ABORTED: 6 // by seller
};

export const TICKET_STATUS = {
  OPENING: 0,
  INVESTIGATING: 1,
  CLOSED: 2
};


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
  },
  ticketStatus: {
    opening: {
      id: 'ticketStatus.opening',
      defaultMessage: 'your report about #{orderId} at {shopName} was opened'
    },
    investigating: {
      id: 'ticketStatus.investigating',
      defaultMessage: 'your report about #{orderId} at {shopName} was started investigating'
    },
    closed: {
      id: 'ticketStatus.closed',
      defaultMessage: 'your report about #{orderId} at {shopName} was closed. Click to see results.'
    },
  }
};

export function getNotificationMessage(notification) {
  const { type, data} = notification;
  switch (type) {
    case NOTIFICATION_TYPE.OPEN_SHOP_REQUEST_CHANGE:
    {
      switch (data.status) {
        case 1: // Rejected
        {
          const values = {
            name: data.name,
            adminMessage: data.adminMessage
          };
          return {
            values: values,
            message: messages.shopOpeningRequest.rejected
          }
        }
        case 2: // Accepted
        {
          const values = {
            name: data.name
          };
          return {
            values: values,
            message: messages.shopOpeningRequest.accepted
          }
        }
        default:
          break;
      }
      break;
    }
    case NOTIFICATION_TYPE.SELLER_CHANGE_ORDER_STATUS:
    {
      switch (data.newStatus) {
        case ORDER_STATUS.ACCEPTED:
        {
          const values = {
            orderId: data.orderId,
            shopName: data.shopName
          };
          return {
            values: values,
            message: messages.orderStatus.accepted
          }
        }
        case ORDER_STATUS.REJECTED:
        {
          const values = {
            orderId: data.orderId,
            shopName: data.shopName,
            sellerMessage: data.sellerMessage
          };
          return {
            values: values,
            message: messages.orderStatus.rejected
          }
        }
        case ORDER_STATUS.SHIPPING:
        {
          const values = {
            orderId: data.orderId,
            shopName: data.shopName
          };
          return {
            values: values,
            message: messages.orderStatus.shipping
          }
        }
        case ORDER_STATUS.COMPLETED:
        {
          const values = {
            shopName: data.shopName
          };
          return {
            values: values,
            message: messages.orderStatus.completed
          }
        }
        case ORDER_STATUS.ABORTED:
        {
          const values = {
            orderId: data.orderId,
            shopName: data.shopName,
            sellerMessage: data.sellerMessage
          };
          return {
            values: values,
            message: messages.orderStatus.aborted
          }
        }
      }
      break;
    }
    case NOTIFICATION_TYPE.USER_PLACE_ORDER:
    {
      const values = {
        shopName: data.shopName,
        orderId: data.orderId,
        buyerName: data.buyerName
      };
      return {
        values: values,
        message: messages.order.userPlaceOrder
      }
    }
    case NOTIFICATION_TYPE.USER_CANCEL_ORDER:
    {
      const values = {
        orderId: data.orderId
      };
      return {
        values: values,
        message: messages.order.userCancelOrder
      }
    }
    case NOTIFICATION_TYPE.USER_TICKET_STATUS_CHANGE:
    {
      const values = {
        orderId: data.orderId,
        shopName: data.shopName
      };
      switch (data.newStatus) {
        case TICKET_STATUS.OPENING:
        {
          return {
            values: values,
            message: messages.ticketStatus.opening
          }
        }
        case TICKET_STATUS.INVESTIGATING:
        {
          return {
            values: values,
            message: messages.ticketStatus.investigating
          }
        }
        case TICKET_STATUS.CLOSED:
        {
          return {
            values: values,
            message: messages.ticketStatus.closed
          }
        }
      }
    }
  }
  return null;
}
