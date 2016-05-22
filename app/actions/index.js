import { CALL_API, HTTP_METHODS } from '../middleware/api';
import { accessTokenKey, adminAccessTokenKey } from 'app/config';

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE';
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

export const GOOGLE_SIGN_OUT = 'GOOGLE_SIGN_OUT';
export function signOutGoogle() {
  return {
    type: GOOGLE_SIGN_OUT
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const AUTH_STATUS_IS_UPDATED = 'AUTH_STATUS_IS_UPDATED';
export function authStatusIsUpdated() {
  return {
    type: AUTH_STATUS_IS_UPDATED
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CHECK_ADMIN_AUTH_STATUS = 'CHECK_ADMIN_AUTH_STATUS';
export const checkAdminAuthStatus = () => {
  const adminToken = window.localStorage.getItem(adminAccessTokenKey);
  return {
    type: CHECK_ADMIN_AUTH_STATUS,
    adminToken
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ADMIN_SIGN_IN_REQUEST = 'ADMIN_SIGN_IN_REQUEST';
export const ADMIN_SIGN_IN_SUCCESS = 'ADMIN_SIGN_IN_SUCCESS';
export const ADMIN_SIGN_IN_FAILURE = 'ADMIN_SIGN_IN_FAILURE';
const requestSignInAdmin = (formValues) => ({
  [CALL_API]: {
    types: [ADMIN_SIGN_IN_REQUEST, ADMIN_SIGN_IN_SUCCESS, ADMIN_SIGN_IN_FAILURE],
    url: '/api/Clients/login',
    method: HTTP_METHODS.POST,
    params: formValues
  }
});

// Relies on Redux Thunk middleware.
export const signInAdmin = (formValues) => {
  return (dispatch, getState) => {
    return dispatch(requestSignInAdmin(formValues))
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ADMIN_AUTH_STATUS_IS_UPDATED = 'ADMIN_AUTH_STATUS_IS_UPDATED';
export function adminAuthStatusIsUpdated() {
  return {
    type: ADMIN_AUTH_STATUS_IS_UPDATED
  }
}
