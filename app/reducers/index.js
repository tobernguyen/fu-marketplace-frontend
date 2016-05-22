import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

const authenticate = (state = { isAuthenticated: false, isAdminAuthenticated: false }, action) => {
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
      return Object.assign({}, state, { shouldUpdateAdminAuthStatus: true });
    case ActionTypes.ADMIN_AUTH_STATUS_IS_UPDATED:
      return Object.assign({}, state, { shouldUpdateAdminAuthStatus: false });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  errorMessage,
  authenticate,
  routing,
  form: formReducer
});

export default rootReducer
