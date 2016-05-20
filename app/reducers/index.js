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
  const { type, token } = action;

  if (type === ActionTypes.CHECK_AUTH_STATUS) {
    state = Object.assign({}, state, { isAuthenticated: (token != null) });
  }

  return state;
};

const rootReducer = combineReducers({
  errorMessage,
  authenticate,
  routing
});

export default rootReducer
