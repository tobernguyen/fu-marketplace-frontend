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

export const GET_METADATA_REQUEST = 'GET_METADATA_REQUEST';
export const GET_METADATA_SUCCESS = 'GET_METADATA_SUCCESS';
export const GET_METADATA_FAILURE = 'GET_METADATA_FAILURE';
const requestGetMetadata = () => ({
  [CALL_API]: {
    types: [GET_METADATA_REQUEST, GET_METADATA_SUCCESS, GET_METADATA_FAILURE],
    url: '/api/v1/metadata',
    method: HTTP_METHODS.GET
  }
});

export const getMetadata = () => {
  return (dispatch) => {
    return dispatch(requestGetMetadata());
  }
};


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
};
