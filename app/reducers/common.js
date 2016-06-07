import * as ActionTypes from '../actions';
import _ from 'lodash';

const INITIAL_STATE = {
  modalSize: null
};

export const common = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.UPDATE_MODAL_SIZE:
      return _.merge({}, state, {
        modalSize: payload.modalSize
      });
    default:
      return state;
  }
};
