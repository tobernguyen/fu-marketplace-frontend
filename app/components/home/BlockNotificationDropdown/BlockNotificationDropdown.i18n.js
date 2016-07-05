const SELLER_CHANGE_ORDER_STATUS = 1;
const OPEN_SHOP_REQUEST_CHANGE = 2;
const USER_PLACE_ORDER = 3;
const USER_CANCEL_ORDER = 4;

let notificationTypes = {};
notificationTypes[SELLER_CHANGE_ORDER_STATUS] = {
  id: 'notificationTypes.userPlaceOrder',
  defaultMessage: '{buyerName} has just placed an order at {shopName}'
};

notificationTypes[OPEN_SHOP_REQUEST_CHANGE] = {
  id: 'notificationTypes.userPlaceOrder',
  defaultMessage: '{buyerName} has just placed an order at {shopName}'
};

notificationTypes[USER_PLACE_ORDER] = {
  id: 'notification.userPlaceOrder',
  defaultMessage: '{buyerName} has placed an order at {shopName}'
};

notificationTypes[USER_CANCEL_ORDER] = {
  id: 'notificationTypes.userPlaceOrder',
  defaultMessage: '{buyerName} has just placed an order at {shopName}'
};

export const messages = {
  notification: notificationTypes
};

