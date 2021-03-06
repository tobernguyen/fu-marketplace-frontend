import * as ActionTypes from '../actions';
import * as AdminActionTypes from '../actions/admin';
import * as CommonActionTypes from '../actions/common';
import { accessTokenKey, adminAccessTokenKey, languageKey } from 'app/config';

export default () => next => action => {
  const { type, response, language } = action;
  switch (type) {
    case ActionTypes.GOOGLE_SIGN_IN_SUCCESS:
      if (response.token) {
        window.localStorage.setItem(accessTokenKey, response.token);
      }
      break;
    case ActionTypes.GOOGLE_SIGN_OUT:
    {
      window.localStorage.removeItem(accessTokenKey);
      const currentAdminToken = window.localStorage.getItem(adminAccessTokenKey);
      if (currentAdminToken) {
        window.localStorage.removeItem(adminAccessTokenKey);
      }
      break;
    }
    case ActionTypes.ADMIN_SIGN_IN_SUCCESS:
      if (response.token) {
        window.localStorage.setItem('isLoginByGoogle', false);
        window.localStorage.setItem(adminAccessTokenKey, response.token);
      }
      break;
    case ActionTypes.CURRENT_USER_SUCCESS:
      const isAdmin = response.roles.indexOf('admin') > -1;
      const currentAdminToken = window.localStorage.getItem(adminAccessTokenKey);
      const currentUserToken = window.localStorage.getItem(accessTokenKey);
      if (isAdmin) {
        if (currentUserToken !== null) {
          window.localStorage.setItem(adminAccessTokenKey, currentUserToken);
        }
      } else {
        if (currentAdminToken !== null) {
          window.localStorage.removeItem(adminAccessTokenKey);
        }
      }
      break;
    case ActionTypes.ADMIN_SIGN_OUT:
      window.localStorage.removeItem('isLoginByGoogle');
      window.localStorage.removeItem(adminAccessTokenKey);
      break;
    case AdminActionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
      window.localStorage.removeItem(adminAccessTokenKey);
      break;
    case CommonActionTypes.USER_CHANGES_LANGUAGE:
      window.localStorage.setItem(languageKey, language);
      break;
    case ActionTypes.CHANGE_LANGUAGE:
      window.localStorage.setItem(languageKey, language);
      break;
    case ActionTypes.CHECK_LOGIN_BY_GOOGLE:
      action.payload = window.localStorage.getItem('isLoginByGoogle') === null;
      break;
    default:
      break;
  }

  next(action);
}
