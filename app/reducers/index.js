import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

const errorMessage = (state = null, action) => {
  const { type, error } = action;

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
};

const authenticate = (state = { isAuthenticated: false }, action) => {
  const { type, token, response } = action;
  switch (type) {
    case ActionTypes.CHECK_AUTH_STATUS:
      return Object.assign({}, state, { isAuthenticated: (token != null) });
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case ActionTypes.GOOGLE_SIGN_OUT:
      return Object.assign({}, state, { shouldUpdateAuthStatus: true });
    case ActionTypes.AUTH_STATUS_IS_UPDATED:
      return Object.assign({}, state, { shouldUpdateAuthStatus: false });
  }

  return state;
};

const rootReducer = combineReducers({
  errorMessage,
  authenticate,
  routing
});

export default rootReducer
