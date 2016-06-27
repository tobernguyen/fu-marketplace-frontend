import { CALL_API, HTTP_METHODS } from '../middleware/api';
import { accessTokenKey, adminAccessTokenKey } from 'app/config';

export const CHECK_AUTH_STATUS = 'CHECK_AUTH_STATUS';
export const checkAuthStatus = () => {
  const token = window.localStorage.getItem(accessTokenKey);
  return {
    type: CHECK_AUTH_STATUS,
    token
  }
};

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
  return (dispatch) => {
    return dispatch(requestSignInGoogle(authCode))
  }
};

export const GOOGLE_SIGN_OUT = 'GOOGLE_SIGN_OUT';
export function signOutGoogle() {
  return {
    type: GOOGLE_SIGN_OUT
  }
}

export const AUTH_STATUS_IS_UPDATED = 'AUTH_STATUS_IS_UPDATED';
export function authStatusIsUpdated() {
  return {
    type: AUTH_STATUS_IS_UPDATED
  }
}


export const CHECK_ADMIN_AUTH_STATUS = 'CHECK_ADMIN_AUTH_STATUS';
export const checkAdminAuthStatus = () => {
  const adminToken = window.localStorage.getItem(adminAccessTokenKey);
  return {
    type: CHECK_ADMIN_AUTH_STATUS,
    adminToken
  }
};

export const ADMIN_SIGN_IN_REQUEST = 'ADMIN_SIGN_IN_REQUEST';
export const ADMIN_SIGN_IN_SUCCESS = 'ADMIN_SIGN_IN_SUCCESS';
export const ADMIN_SIGN_IN_FAILURE = 'ADMIN_SIGN_IN_FAILURE';
const requestSignInAdmin = (formValues) => ({
  [CALL_API]: {
    types: [ADMIN_SIGN_IN_REQUEST, ADMIN_SIGN_IN_SUCCESS, ADMIN_SIGN_IN_FAILURE],
    url: '/login',
    method: HTTP_METHODS.POST,
    params: formValues
  }
});

// Relies on Redux Thunk middleware.
export const signInAdmin = (formValues) => {
  return (dispatch) => {
    return dispatch(requestSignInAdmin(formValues))
  }
};

export const ADMIN_AUTH_STATUS_IS_UPDATED = 'ADMIN_AUTH_STATUS_IS_UPDATED';
export function adminAuthStatusIsUpdated() {
  return {
    type: ADMIN_AUTH_STATUS_IS_UPDATED
  }
}

export const ADMIN_SIGN_OUT = 'ADMIN_SIGN_OUT';
export function signOutAdmin() {
  return {
    type: ADMIN_SIGN_OUT
  }
}

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const CURRENT_USER_SUCCESS = 'CURRENT_USER_SUCCESS';
export const CURRENT_USER_FAILURE = 'CURRENT_USER_FAILURE';
const requestGetCurrentUser = () => ({
  [CALL_API]: {
    types: [CURRENT_USER_REQUEST, CURRENT_USER_SUCCESS, CURRENT_USER_FAILURE],
    url: '/api/v1/users/me',
    method: HTTP_METHODS.GET
  }
});

// Relies on Redux Thunk middleware.
export const getCurrentUser = () => {
  return (dispatch) => {
    return dispatch(requestGetCurrentUser())
  }
};


export const CHANGE_LANGUAGE = '@@language/CHANGE_LANGUAGE';
export function changeLanguage(language) {
  return {
    type: CHANGE_LANGUAGE,
    language: language
  };
}



