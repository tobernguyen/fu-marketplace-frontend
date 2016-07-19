import * as ActionTypes from '../actions';
import _ from 'lodash';

const INITIAL_STATE = {
  isAuthenticated: false
};

export const auth = (state = INITIAL_STATE, action) => {
  const { type, token, error } = action;
  switch (type) {
    case ActionTypes.CHECK_AUTH_STATUS:
      return _.assign({}, state, {
        isAuthenticated: (token != null)
      });
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case ActionTypes.GOOGLE_SIGN_OUT:
      return _.assign({}, state, {
        shouldUpdateAuthStatus: true,
        error: null
      });
    case ActionTypes.GOOGLE_SIGN_IN_FAILURE:
      const { message_code } = error;
      return _.assign({}, state, {
        isAuthenticated: false,
        error: message_code
      });
    case ActionTypes.AUTH_STATUS_IS_UPDATED:
      return _.assign({}, state, {
        shouldUpdateAuthStatus: false
      });
    default:
      return state;
  }
};
