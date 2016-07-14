import * as CommonActionTypes from '../actions/common';
import _ from 'lodash';

const INITIAL_STATE = {
  modalSize: null,
  shipPlaces: [],
  categories: [],
  query: null,
  socket: null
};

export const common = (state = INITIAL_STATE, action) => {
  const { type, payload, response } = action;
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
    default:
      return state;
  }
};
