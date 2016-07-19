import * as ActionTypes from '../actions';
import { accessTokenKey, languageKey } from 'app/config';

export default () => next => action => {
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
    case ActionTypes.CHANGE_LANGUAGE:
      localStorage.setItem(languageKey, language);
      break;
    default:
      break;
  }

  next(action);
}
