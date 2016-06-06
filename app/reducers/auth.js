import * as ActionTypes from '../actions';
import _ from 'lodash';

const INITIAL_STATE = {
  isAuthenticated: false,
  isAdminAuthenticated: false
};

export const auth = (state = INITIAL_STATE, action) => {
  const { type, token, adminToken } = action;
  switch (type) {
    case ActionTypes.CHECK_AUTH_STATUS:
      return _.assign({}, state, {
        isAuthenticated: (token != null)
      });
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case ActionTypes.GOOGLE_SIGN_OUT:
      return _.assign({}, state, {
        shouldUpdateAuthStatus: true
      });
    case ActionTypes.AUTH_STATUS_IS_UPDATED:
      return _.assign({}, state, {
        shouldUpdateAuthStatus: false
      });
    case ActionTypes.CHECK_ADMIN_AUTH_STATUS:
      return _.assign({}, state, {
        isAdminAuthenticated: (adminToken != null)
      });
    case ActionTypes.ADMIN_SIGN_IN_SUCCESS:
    case ActionTypes.ADMIN_SIGN_OUT:
      return _.assign({}, state, {
        shouldUpdateAdminAuthStatus: true
      });
    case ActionTypes.ADMIN_AUTH_STATUS_IS_UPDATED:
      return _.assign({}, state, {
        shouldUpdateAdminAuthStatus: false
      });
    default:
      return state;
  }
};