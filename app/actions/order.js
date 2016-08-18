import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const USER_PLACE_ORDER_REQUEST = 'USER_PLACE_ORDER_REQUEST';
export const USER_PLACE_ORDER_SUCCESS = 'USER_PLACE_ORDER_SUCCESS';
export const USER_PLACE_ORDER_FAILURE = 'USER_PLACE_ORDER_FAILURE';
const requestPlaceOrder = (shopID, order) => ({
  [CALL_API]: {
    types: [USER_PLACE_ORDER_REQUEST, USER_PLACE_ORDER_SUCCESS, USER_PLACE_ORDER_FAILURE],
    url: `/api/v1/shops/${shopID}/orders`,
    method: HTTP_METHODS.POST,
    params: order
  }
});

export const placeOrder = (shopID, order) => {
  return (dispatch) => {
    return dispatch(requestPlaceOrder(shopID, order));
  }
};

export const SELLER_GET_ORDER_REQUEST = 'SELLER_GET_ORDER_REQUEST';
export const SELLER_GET_ORDER_SUCCESS = 'SELLER_GET_ORDER_SUCCESS';
export const SELLER_GET_ORDER_FAILURE = 'SELLER_GET_ORDER_FAILURE';
const sellerRequestGetOrder = (shopID, filter) => ({
  [CALL_API]: {
    types: [SELLER_GET_ORDER_REQUEST, SELLER_GET_ORDER_SUCCESS, SELLER_GET_ORDER_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/orders${filter}`,
    method: HTTP_METHODS.GET
  }
});

export const sellerGetOrder = (shopID, status , page = 1, size = 20, type = '') => {
  let filter = '';
  if (status === undefined || status === 'all') {
    filter = `?size=${size}&page=${page}&type${type.toUpperCase()}`;
  } else {
    filter = `?size=${size}&page=${page}&status=${status.toUpperCase()}`;
  }
  return (dispatch) => {
    return dispatch(sellerRequestGetOrder(shopID, filter));
  }
};

export const SELLER_GET_ORDER_OF_NEXT_PAGE_REQUEST = 'SELLER_GET_ORDER_OF_NEXT_PAGE_REQUEST';
export const SELLER_GET_ORDER_OF_NEXT_PAGE_SUCCESS = 'SELLER_GET_ORDER_OF_NEXT_PAGE_SUCCESS';
export const SELLER_GET_ORDER_OF_NEXT_PAGE_FAILURE = 'SELLER_GET_ORDER_OF_NEXT_PAGE_FAILURE';

const sellerRequestGetOrderOfNextPage = (shopID, filter) => ({
  [CALL_API]: {
    types: [SELLER_GET_ORDER_OF_NEXT_PAGE_REQUEST, SELLER_GET_ORDER_OF_NEXT_PAGE_SUCCESS, SELLER_GET_ORDER_OF_NEXT_PAGE_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/orders${filter}`,
    method: HTTP_METHODS.GET
  }
});

export const sellerGetOrderOfNextPage = (shopID, status , page = 1, size = 20, type = '') => {
  let filter = '';
  if (status === undefined || status === 'all') {
    filter = `?size=${size}&page=${page + 1}&type${type.toUpperCase()}`;
  } else {
    filter = `?size=${size}&page=${page + 1}&status=${status.toUpperCase()}`;
  }
  return (dispatch) => {
    return dispatch(sellerRequestGetOrderOfNextPage(shopID, filter));
  }
};

export const SELLER_NEXT_PAGE_ORDER = 'SELLER_NEXT_PAGE_ORDER';

export const sellerNextPageOrder = () => ({
  type: SELLER_NEXT_PAGE_ORDER
});

export const SELLER_ACCEPT_ORDER_REQUEST = 'SELLER_ACCEPT_ORDER_REQUEST';
export const SELLER_ACCEPT_ORDER_SUCCESS = 'SELLER_ACCEPT_ORDER_SUCCESS';
export const SELLER_ACCEPT_ORDER_FAILURE = 'SELLER_ACCEPT_ORDER_FAILURE';
const requestAcceptOrder = (orderID) => ({
  [CALL_API]: {
    types: [SELLER_ACCEPT_ORDER_REQUEST, SELLER_ACCEPT_ORDER_SUCCESS, SELLER_ACCEPT_ORDER_FAILURE],
    url: `/api/v1/seller/orders/${orderID}/accept`,
    method: HTTP_METHODS.POST
  }
});

export const sellerAcceptOrder = (orderID) => {
  return (dispatch) => {
    return dispatch(requestAcceptOrder(orderID));
  }
};

export const SELLER_REJECT_ORDER_REQUEST = 'SELLER_REJECT_ORDER_REQUEST';
export const SELLER_REJECT_ORDER_SUCCESS = 'SELLER_REJECT_ORDER_SUCCESS';
export const SELLER_REJECT_ORDER_FAILURE = 'SELLER_REJECT_ORDER_FAILURE';
const requestRejectOrder = (orderID, message) => ({
  [CALL_API]: {
    types: [SELLER_REJECT_ORDER_REQUEST, SELLER_REJECT_ORDER_SUCCESS, SELLER_REJECT_ORDER_FAILURE],
    url: `/api/v1/seller/orders/${orderID}/reject`,
    method: HTTP_METHODS.POST,
    params: message
  }
});

export const sellerRejectOrder = (orderID, message) => {
  return (dispatch) => {
    return dispatch(requestRejectOrder(orderID, message));
  }
};

export const SELLER_START_SHIPPING_ORDER_REQUEST = 'SELLER_START_SHIPPING_ORDER_REQUEST';
export const SELLER_START_SHIPPING_ORDER_SUCCESS = 'SELLER_START_SHIPPING_ORDER_SUCCESS';
export const SELLER_START_SHIPPING_ORDER_FAILURE = 'SELLER_START_SHIPPING_ORDER_FAILURE';
const requestStartShippingOrder = (orderID) => ({
  [CALL_API]: {
    types: [SELLER_START_SHIPPING_ORDER_REQUEST, SELLER_START_SHIPPING_ORDER_SUCCESS, SELLER_START_SHIPPING_ORDER_FAILURE],
    url: `/api/v1/seller/orders/${orderID}/ship`,
    method: HTTP_METHODS.POST
  }
});

export const sellerStartShippingOrder = (orderID) => {
  return (dispatch) => {
    dispatch(requestStartShippingOrder(orderID));
  }
}

export const SELLER_COMPLETE_ORDER_REQUEST = 'SELLER_COMPLETE_ORDER_REQUEST';
export const SELLER_COMPLETE_ORDER_SUCCESS = 'SELLER_COMPLETE_ORDER_SUCCESS';
export const SELLER_COMPLETE_ORDER_FAILURE = 'SELLER_COMPLETE_ORDER_FAILURE';
const requestCompleteOrder = (orderID) => ({
  [CALL_API]: {
    types: [SELLER_COMPLETE_ORDER_REQUEST, SELLER_COMPLETE_ORDER_SUCCESS, SELLER_COMPLETE_ORDER_FAILURE],
    url: `/api/v1/seller/orders/${orderID}/complete`,
    method: HTTP_METHODS.POST
  }
});

export const sellerCompleteOrder = (orderID) => {
  return (dispatch) => {
    dispatch(requestCompleteOrder(orderID));
  }
}

export const SELLER_ABORT_ORDER_REQUEST = 'SELLER_ABORT_ORDER_REQUEST';
export const SELLER_ABORT_ORDER_SUCCESS = 'SELLER_ABORT_ORDER_SUCCESS';
export const SELLER_ABORT_ORDER_FAILURE = 'SELLER_ABORT_ORDER_FAILURE';
const requestAbortOrder = (orderID, message) => ({
  [CALL_API]: {
    types: [SELLER_ABORT_ORDER_REQUEST, SELLER_ABORT_ORDER_SUCCESS, SELLER_ABORT_ORDER_FAILURE],
    url: `/api/v1/seller/orders/${orderID}/abort`,
    method: HTTP_METHODS.POST,
    params: message
  }
});

export const sellerAbortOrder = (orderID, message) => {
  return (dispatch) => {
    return dispatch(requestAbortOrder(orderID, message));
  }
};

export const CLEAR_ORDER_RESULT = 'CLEAR_ORDER_RESULT';
export const clearOrderResult = () => {
  return {
    type: CLEAR_ORDER_RESULT
  };
};

export const USER_GET_ORDER_REQUEST = 'USER_GET_ORDER_REQUEST';
export const USER_GET_ORDER_SUCCESS = 'USER_GET_ORDER_SUCCESS';
export const USER_GET_ORDER_FAILURE = 'USER_GET_ORDER_FAILURE';
const userRequestGetOrder = (filter) => ({
  [CALL_API]: {
    types: [USER_GET_ORDER_REQUEST, USER_GET_ORDER_SUCCESS, USER_GET_ORDER_FAILURE],
    url: `/api/v1/orders${filter}`,
    method: HTTP_METHODS.GET
  }
});

export const userGetOrder = (page = 1, size = 10, status = '') => {
  let filter = `?size=${size}&page=${page}&status=${status}`;

  return (dispatch) => {
    return dispatch(userRequestGetOrder(filter));
  }
};

export const USER_GET_ORDER_OF_NEXT_PAGE_REQUEST = 'USER_GET_ORDER_OF_NEXT_PAGE_REQUEST';
export const USER_GET_ORDER_OF_NEXT_PAGE_SUCCESS = 'USER_GET_ORDER_OF_NEXT_PAGE_SUCCESS';
export const USER_GET_ORDER_OF_NEXT_PAGE_FAILURE = 'USER_GET_ORDER_OF_NEXT_PAGE_FAILURE';

const userRequestGetOrderOfNextPage = (filter) => ({
  [CALL_API]: {
    types: [USER_GET_ORDER_OF_NEXT_PAGE_REQUEST, USER_GET_ORDER_OF_NEXT_PAGE_SUCCESS, USER_GET_ORDER_OF_NEXT_PAGE_FAILURE],
    url: `/api/v1/orders${filter}`,
    method: HTTP_METHODS.GET
  }
});

export const USER_NEXT_PAGE_ORDER = 'USER_NEXT_PAGE_ORDER';

export const userNextPageOrder = () => ({
  type: USER_NEXT_PAGE_ORDER
});

export const userGetOrderOfNextPage = (page = 1, size = 1, status = '') => {
  let filter = `?size=${size}&page=${page + 1}&status=${status}`;

  return (dispatch) => {
    return dispatch(userRequestGetOrderOfNextPage(filter));
  }
};

export const USER_CANCEL_ORDER_REQUEST = 'USER_CANCEL_ORDER_REQUEST';
export const USER_CANCEL_ORDER_SUCCESS = 'USER_CANCEL_ORDER_SUCCESS';
export const USER_CANCEL_ORDER_FAILURE = 'USER_CANCEL_ORDER_FAILURE';
const userRequestCancelOrder = (orderID) => ({
  [CALL_API]: {
    types: [USER_CANCEL_ORDER_REQUEST, USER_CANCEL_ORDER_SUCCESS, USER_CANCEL_ORDER_FAILURE],
    url: `/api/v1/orders/${orderID}/cancel`,
    method: HTTP_METHODS.POST
  }
});

export const userCancelOrder = (orderID) => {
  return (dispatch) => {
    return dispatch(userRequestCancelOrder(orderID));
  }
};

export const USER_RATE_ORDER_REQUEST = 'USER_RATE_ORDER_REQUEST';
export const USER_RATE_ORDER_SUCCESS = 'USER_RATE_ORDER_SUCCESS';
export const USER_RATE_ORDER_FAILURE = 'USER_RATE_ORDER_FAILURE';
const userRequestRateOrder = (orderID, rate, comment) => ({
  [CALL_API]: {
    types: [USER_RATE_ORDER_REQUEST, USER_RATE_ORDER_SUCCESS, USER_RATE_ORDER_FAILURE],
    url: `/api/v1/orders/${orderID}/rate`,
    method: HTTP_METHODS.POST,
    params: {
      'rate': rate,
      'comment': comment
    }
  }
});

export const userRateOrder = (orderID, rate, comment = '') => {
  return (dispatch) => {
    return dispatch(userRequestRateOrder(orderID, rate, comment));
  }
}

export const GET_ORDERS_OF_PAGE_REQUEST = 'GET_ORDERS_OF_PAGE_REQUEST';
export const GET_ORDERS_OF_PAGE_SUCCESS = 'GET_ORDERS_OF_PAGE_SUCCESS';
export const GET_ORDERS_OF_PAGE_FAILURE = 'GET_ORDERS_OF_PAGE_FAILURE';
const requestGetOrdersOfPage = (shopID, params) => ({
  [CALL_API]: {
    types: [GET_ORDERS_OF_PAGE_REQUEST, GET_ORDERS_OF_PAGE_SUCCESS, GET_ORDERS_OF_PAGE_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/orders`,
    method: HTTP_METHODS.GET,
    params: params
  }
});


export const getOrdersOfPage = (shopID, params) => {
  return (dispatch) => {
    return dispatch(requestGetOrdersOfPage(shopID, params))
  }
};


export const CLEAR_CURRENT_ORDERS = 'CLEAR_CURRENT_ORDERS';
export const clearCurrentOrders = () => ({
  type: CLEAR_CURRENT_ORDERS
});

export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';
export const updateOrderStatus = (orderId, status) => ({
  type: UPDATE_ORDER_STATUS,
  payload: {
    orderId,
    status
  }
});

export const REMOVE_ORDER = 'REMOVE_ORDER';
export const removeOrder = (orderId) => ({
  type: REMOVE_ORDER,
  payload: orderId
});

export const SELLER_GET_NEW_ORDER_REQUEST = 'SELLER_GET_NEW_ORDER_REQUEST';
export const SELLER_GET_NEW_ORDER_SUCCESS = 'SELLER_GET_NEW_ORDER_SUCCESS';
export const SELLER_GET_NEW_ORDER_FAILURE = 'SELLER_GET_NEW_ORDER_FAILURE';

const requestGetNewOrder = (orderId) => ({
  [CALL_API]: {
    types: [SELLER_GET_NEW_ORDER_REQUEST, SELLER_GET_NEW_ORDER_SUCCESS, SELLER_GET_NEW_ORDER_FAILURE],
    method: HTTP_METHODS.GET,
    url: `/api/v1/seller/orders/${orderId}`
  }
});

export const getNewOrder = (orderId) => {
  return (dispatch) => {
    dispatch(requestGetNewOrder(orderId));
  }
}

export const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS';
export const changeOrderStatus = (orderId, status) => ({
  type: CHANGE_ORDER_STATUS,
  payload: {
    orderId,
    status
  }
});
