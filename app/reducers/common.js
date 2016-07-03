import * as CommonActionTypes from '../actions/common';
import _ from 'lodash';

const INITIAL_STATE = {
  modalSize: null,
  shipPlaces: [],
  categories: []
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
    default:
      return state;
  }
};
