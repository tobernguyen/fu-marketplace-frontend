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
const requestGetShopsOfPage = (pageNumber) => ({
  [CALL_API]: {
    types: [GET_SHOPS_OF_PAGE_REQUEST, GET_SHOPS_OF_PAGE_SUCCESS, GET_SHOPS_OF_PAGE_FAILURE],
    url: '/api/v1/feed/shops',
    method: HTTP_METHODS.POST,
    params: {
      page: pageNumber
    }
  }
});

export const getShopsOfPage = (pageNumber) => {
  return (dispatch) => {
    return dispatch(requestGetShopsOfPage(pageNumber))
  }
};
