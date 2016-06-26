import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const UPDATE_MODAL_MODE = 'UPDATE_MODAL_MODE';
export const updateModalMode = (modalMode) => ({
  type: UPDATE_MODAL_MODE,
  payload: {
    modalMode: modalMode
  }
});


export const UPDATE_MODAL_SIZE = 'UPDATE_MODAL_WINDOW_SIZE';
export const updateModalSize = (modalSize) => ({
  type: UPDATE_MODAL_SIZE,
  payload: {
    modalSize: modalSize
  }
});

export const GET_SHIP_PLACES_REQUEST = 'GET_SHIP_PLACES_REQUEST';
export const GET_SHIP_PLACES_SUCCESS = 'GET_SHIP_PLACES_SUCCESS';
export const GET_SHIP_PLACES_FAILURE = 'GET_SHIP_PLACES_FAILURE';
const getShipPlacesRequest = () => ({
  [CALL_API]: {
    types: [GET_SHIP_PLACES_REQUEST, GET_SHIP_PLACES_SUCCESS, GET_SHIP_PLACES_FAILURE],
    url: '/api/v1/shipPlaces',
    method: HTTP_METHODS.GET
  }
});

export const getShipPlaces = () => {
  return (dispatch) => {
    return dispatch(getShipPlacesRequest());
  }
}

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
const getCategoriesRequest = () => ({
  [CALL_API]: {
    types: [GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE],
    url: '/api/v1/categories',
    method: HTTP_METHODS.GET
  }
});

export const getCategories = () => {
  return (dispatch) => {
    return dispatch(getCategoriesRequest());
  }
}