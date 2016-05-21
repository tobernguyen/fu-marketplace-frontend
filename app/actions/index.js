import { CALL_API, HTTP_METHODS } from '../middleware/api';
import { accessTokenKey } from 'app/config';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS';
export const checkAuthStatus = () => {
  const token = window.localStorage.getItem(accessTokenKey);
  return {
    type: CHECK_AUTH_STATUS,
    token
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GOOGLE_SIGN_IN_REQUEST = 'GOOGLE_SIGN_IN_REQUEST';
export const GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS';
export const GOOGLE_SIGN_IN_FAILURE = 'GOOGLE_SIGN_IN_FAILURE';
const requestSignInGoogle = (authCode) => ({
  [CALL_API]: {
    types: [GOOGLE_SIGN_IN_REQUEST, GOOGLE_SIGN_IN_SUCCESS, GOOGLE_SIGN_IN_FAILURE],
    url: '/auth/google/callback',
    method: HTTP_METHODS.GET,
    params: { 'code': authCode }
  }
});

// Relies on Redux Thunk middleware.
export const signInGoogle = (authCode) => {
  return (dispatch, getState) => {
    return dispatch(requestSignInGoogle(authCode))
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
