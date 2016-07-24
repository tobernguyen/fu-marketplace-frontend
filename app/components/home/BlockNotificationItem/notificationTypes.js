export const NOTIFICATION_TYPE = {
  SELLER_CHANGE_ORDER_STATUS: 1,
  OPEN_SHOP_REQUEST_CHANGE: 2,
  USER_PLACE_ORDER: 3,
  USER_CANCEL_ORDER: 4
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
