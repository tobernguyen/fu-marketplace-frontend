import * as CommonActionTypes from '../actions/common';
import * as ActionTypes from '../actions';
import _ from 'lodash';

const INITIAL_STATE = {
  modalSize: null,
  shipPlaces: [],
  categories: [],
  query: null,
  socket: null
};

export const common = (state = INITIAL_STATE, action) => {
  const { type, payload, response, error } = action;
  switch (type) {
    case CommonActionTypes.UPDATE_MODAL_SIZE:
      return _.merge({}, state, {
        modalSize: payload.modalSize
      });
    case CommonActionTypes.GET_METADATA_SUCCESS:
      return _.merge({}, state, {
        shipPlaces: response.shipPlaces,
        categories: response.categories
      });
    case CommonActionTypes.UPDATE_QUERY:
      return _.assign({}, state, {
        query: payload.query
      });
    case CommonActionTypes.CREATE_WEB_SOCKET:
      return _.assign({}, state, {
        socket: payload.socket
      });
    case CommonActionTypes.DESTROY_WEB_SOCKET:
      return _.assign({}, state, {
        socket: INITIAL_STATE.socket
      });
    case 'REQUEST_ERROR':
      return _.assign({}, state, {
        error: error
      });
    case CommonActionTypes.RESET_REQUEST_ERROR:
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
      return _.assign({}, state, {
        error: null
      });
    default:
      return state;
  }
};
