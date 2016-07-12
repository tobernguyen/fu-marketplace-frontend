import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const GET_SHOPS_REQUEST = 'GET_SHOPS_REQUEST';
export const GET_SHOPS_SUCCESS = 'GET_SHOPS_SUCCESS';
export const GET_SHOPS_FAILURE = 'GET_SHOPS_FAILURE';
const requestGetShops = () => ({
  [CALL_API]: {
    types: [GET_SHOPS_REQUEST, GET_SHOPS_SUCCESS, GET_SHOPS_FAILURE],
    url: '/api/v1/feed/shops',
    method: HTTP_METHODS.POST
  }
});

export const getShops = () => {
  return (dispatch) => {
    return dispatch(requestGetShops())
  }
};

export const GET_SHOPS_OF_PAGE_REQUEST = 'GET_SHOPS_OF_PAGE_REQUEST';
export const GET_SHOPS_OF_PAGE_SUCCESS = 'GET_SHOPS_OF_PAGE_SUCCESS';
export const GET_SHOPS_OF_PAGE_FAILURE = 'GET_SHOPS_OF_PAGE_FAILURE';
const requestGetShopsOfPage = (params) => ({
  [CALL_API]: {
    types: [GET_SHOPS_OF_PAGE_REQUEST, GET_SHOPS_OF_PAGE_SUCCESS, GET_SHOPS_OF_PAGE_FAILURE],
    url: '/api/v1/feed/shops',
    method: HTTP_METHODS.POST,
    params: params
  }
});

export const CLEAR_SHOPS_FEED = 'CLEAR_SHOPS_FEED';
export const clearShopsFeed = () => ({
  type: CLEAR_SHOPS_FEED
});


export const getShopsOfPage = (params) => {
  return (dispatch) => {
    return dispatch(requestGetShopsOfPage(params))
  }
};

export const WS_SHOP_UPDATED = 'WS_SHOP_UPDATED';
export const updateShop = (shopData) => ({
  type: WS_SHOP_UPDATED,
  payload: {
    shop: shopData
  }
});
