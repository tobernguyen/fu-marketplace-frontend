import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const SHOP_REQUEST_OPENING_REQUEST = 'SHOP_REQUEST_OPENING_REQUEST';
export const SHOP_REQUEST_OPENING_SUCCESS = 'SHOP_REQUEST_OPENING_SUCCESS';
export const SHOP_REQUEST_OPENING_FAILURE = 'SHOP_REQUEST_OPENING_FAILURE';
const requestRequestCreateShop = (formValues) => ({
  [CALL_API]: {
    types: [SHOP_REQUEST_OPENING_REQUEST, SHOP_REQUEST_OPENING_SUCCESS, SHOP_REQUEST_OPENING_FAILURE],
    url: '/api/v1/xxx',
    method: HTTP_METHODS.POST,
    params: formValues
  }
});

export const requestCreateShop = (formValues) => {
  return (dispatch) => {
    return dispatch(requestRequestCreateShop(formValues))
  }
};
