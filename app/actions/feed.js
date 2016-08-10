import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const GET_SHOPS_REQUEST = 'GET_SHOPS_REQUEST';
export const GET_SHOPS_SUCCESS = 'GET_SHOPS_SUCCESS';
export const GET_SHOPS_FAILURE = 'GET_SHOPS_FAILURE';
const requestGetShops = (params) => ({
  [CALL_API]: {
    types: [GET_SHOPS_REQUEST, GET_SHOPS_SUCCESS, GET_SHOPS_FAILURE],
    url: '/api/v1/feed/shops',
    method: HTTP_METHODS.POST,
    params: params || {}
  }
});

export const getShops = (params) => {
  return (dispatch) => {
    return dispatch(requestGetShops(params))
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

export const getShopsOfPage = (params) => {
  return (dispatch) => {
    return dispatch(requestGetShopsOfPage(params))
  }
};

export const CLEAR_SHOPS_FEED = 'CLEAR_SHOPS_FEED';
export const clearShopsFeed = () => ({
  type: CLEAR_SHOPS_FEED
});

export const WS_SHOP_UPDATED = 'WS_SHOP_UPDATED';
export const updateShop = (shopData) => ({
  type: WS_SHOP_UPDATED,
  payload: {
    shop: shopData
  }
});


export const GET_TOP_FEED_SLIDE_SHOW_REQUEST = 'GET_TOP_FEED_SLIDE_SHOW_REQUEST';
export const GET_TOP_FEED_SLIDE_SHOW_SUCCESS = 'GET_TOP_FEED_SLIDE_SHOW_SUCCESS';
export const GET_TOP_FEED_SLIDE_SHOW_FAILURE = 'GET_TOP_FEED_SLIDE_SHOW_FAILURE';
const requestGetTopFeedSlideShow = () => ({
  [CALL_API]: {
    types: [GET_TOP_FEED_SLIDE_SHOW_REQUEST, GET_TOP_FEED_SLIDE_SHOW_SUCCESS, GET_TOP_FEED_SLIDE_SHOW_FAILURE],
    url: '/api/v1/shopPromotions/topFeedSlideShow',
    method: HTTP_METHODS.GET
  }
});

export const getTopFeedSlideShow = () => {
  return (dispatch) => {
    return dispatch(requestGetTopFeedSlideShow())
  }
};
