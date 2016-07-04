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

export const sellerGetOrder = (shopID, status , page = 1, size = 10) => {
  let filter = '';
  if (status === undefined || status === 'all') {
    filter = `?size=${size}&page=${page}`;
  } else {
    filter = `?size=${size}&page=${page}&status=${status.toUpperCase()}`;
  }
  return (dispatch) => {
    return dispatch(sellerRequestGetOrder(shopID, filter));
  }
};

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
const userRequestGetOrder = () => ({
  [CALL_API]: {
    types: [USER_GET_ORDER_REQUEST, USER_GET_ORDER_SUCCESS, USER_GET_ORDER_FAILURE],
    url: '/api/v1/orders',
    method: HTTP_METHODS.GET
  }
});

export const userGetOrder = () => {
  return (dispatch) => {
    return dispatch(userRequestGetOrder());
  }
};
