import * as ActionTypes from '../actions';
import { accessTokenKey, adminAccessTokenKey, languageKey } from 'app/config';

export default store => next => action => {
  const { type, response, language } = action;
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
    case ActionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
      window.localStorage.removeItem(adminAccessTokenKey);
      break;
    case ActionTypes.CHANGE_LANGUAGE:
      localStorage.setItem(languageKey, language);
      break;
    default:
      break;
  }

  next(action);
}
