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
}

export const CLEAR_ORDER_RESULT = 'CLEAR_ORDER_RESULT';
export const clearOrderResult = () => {
  return {
    type: CLEAR_ORDER_RESULT
  };
}