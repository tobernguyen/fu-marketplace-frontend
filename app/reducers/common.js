import * as ActionTypes from '../actions';
import * as CommonActionTypes from '../actions/common';
import _ from 'lodash';

const INITIAL_STATE = {
  modalSize: null,
  modalMode: false
};

export const common = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CommonActionTypes.UPDATE_MODAL_SIZE:
      return _.merge({}, state, {
        modalSize: payload.modalSize
      });
    case CommonActionTypes.UPDATE_MODAL_MODE:
      return _.merge({}, state, {
        modalMode: payload.modalMode
      });
    default:
      return state;
  }
};
