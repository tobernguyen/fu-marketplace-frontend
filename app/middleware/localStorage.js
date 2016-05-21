import * as ActionTypes from '../actions';
import { accessTokenKey } from 'app/config';

export default store => next => action => {
  const { type, response } = action;
  switch (type) {
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
      if (response.access_token) {
        window.localStorage.setItem(accessTokenKey, response.access_token);
      }
      break;
    case ActionTypes.GOOGLE_SIGN_OUT:
      window.localStorage.removeItem(accessTokenKey);
      break;
    default:
      break;
  }

  next(action);
}
