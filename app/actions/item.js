import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const GET_ITEM_CATEGORIES_REQUEST = 'GET_ITEM_CATEGORIES_REQUEST';
export const GET_ITEM_CATEGORIES_SUCCESS = 'GET_ITEM_CATEGORIES_SUCCESS';
export const GET_ITEM_CATEGORIES_FAILURE = 'GET_ITEM_CATEGORIES_FAILURE';
const requestGetItemCategories = () => ({
  [CALL_API]: {
    types: [GET_ITEM_CATEGORIES_REQUEST, GET_ITEM_CATEGORIES_SUCCESS, GET_ITEM_CATEGORIES_FAILURE],
    url: '/api/v1/categories',
    method: HTTP_METHODS.GET
  }
});

export const getItemCategories = () => {
  return (dispatch) => {
    return dispatch(requestGetItemCategories())
  }
};
