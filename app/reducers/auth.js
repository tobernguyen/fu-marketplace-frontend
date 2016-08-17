import * as ActionTypes from '../actions';
import * as AdminActionTypes from '../actions/admin';
import _ from 'lodash';

const INITIAL_STATE = {
  isAuthenticated: null,
  isAdminAuthenticated: false,
  authenticating: false,
  loginResult: '',
  isLoginByGoogle: true
};

export const auth = (state = INITIAL_STATE, action) => {
  const { type, token, adminToken, error } = action;
  switch (type) {
    case ActionTypes.CHECK_AUTH_STATUS:
      return _.assign({}, state, {
        isAuthenticated: (token != null)
      });
    case ActionTypes.GOOGLE_SIGN_IN_REQUEST:
      return _.assign({}, state, {
        authenticating: true
      });
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case ActionTypes.GOOGLE_SIGN_OUT:
      return _.assign({}, state, {
        shouldUpdateAuthStatus: true,
        error: null,
        authenticating: false
      });
    case ActionTypes.GOOGLE_SIGN_IN_FAILURE:
      const { message_code } = error;
      return _.assign({}, state, {
        isAuthenticated: false,
        error: message_code,
        authenticating: false
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
    case AdminActionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
      return _.assign({}, state, {
        loginResult: '',
        shouldUpdateAdminAuthStatus: true
      });
    case ActionTypes.ADMIN_SIGN_IN_FAILURE:
      return _.assign({}, state, {
        loginResult: {
          id: 'adminLogin.failure',
          defaultMessage: 'Invalid email or password'
        }
      });
    case ActionTypes.ADMIN_AUTH_STATUS_IS_UPDATED:
      return _.assign({}, state, {
        shouldUpdateAdminAuthStatus: false
      });
    case ActionTypes.CHECK_LOGIN_BY_GOOGLE:
      return _.merge({}, state, {
        isLoginByGoogle: action.payload
      });
    default:
      return state;
  }
};
