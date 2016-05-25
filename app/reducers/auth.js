import * as ActionTypes from '../actions';

export const auth = (state = { isAuthenticated: false, isAdminAuthenticated: false }, action) => {
  const { type, token, adminToken, response } = action;
  switch (type) {
    case ActionTypes.CHECK_AUTH_STATUS:
      return Object.assign({}, state, { isAuthenticated: (token != null) });
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case ActionTypes.GOOGLE_SIGN_OUT:
      return Object.assign({}, state, { shouldUpdateAuthStatus: true });
    case ActionTypes.AUTH_STATUS_IS_UPDATED:
      return Object.assign({}, state, { shouldUpdateAuthStatus: false });
    case ActionTypes.CHECK_ADMIN_AUTH_STATUS:
      return Object.assign({}, state, { isAdminAuthenticated: (adminToken != null) });
    case ActionTypes.ADMIN_SIGN_IN_SUCCESS:
    case ActionTypes.ADMIN_SIGN_OUT:
      return Object.assign({}, state, { shouldUpdateAdminAuthStatus: true });
    case ActionTypes.ADMIN_AUTH_STATUS_IS_UPDATED:
      return Object.assign({}, state, { shouldUpdateAdminAuthStatus: false });
    default:
      return state;
  }
};
