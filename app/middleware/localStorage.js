import * as ActionTypes from '../actions';
import { accessTokenKey, adminAccessTokenKey } from 'app/config';

export default store => next => action => {
  const { type, response } = action;
  switch (type) {
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
      if (response.token) {
        window.localStorage.setItem(accessTokenKey, response.token);
      }
      break;
    case ActionTypes.GOOGLE_SIGN_OUT:
      window.localStorage.removeItem(accessTokenKey);
      break;
    case ActionTypes.ADMIN_SIGN_IN_SUCCESS:
      if (response.token) {
        window.localStorage.setItem(adminAccessTokenKey, response.token);
      }
      break;
    case ActionTypes.ADMIN_SIGN_OUT:
      window.localStorage.removeItem(adminAccessTokenKey);
      break;
    default:
      break;
  }

  next(action);
}
