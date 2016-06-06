import { CALL_API, HTTP_METHODS } from '../middleware/api';
import { accessTokenKey, adminAccessTokenKey } from 'app/config';

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
  return (dispatch, getState) => {
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


export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';
const requestUploadAvatar = (formFileData) => ({
  [CALL_API]: {
    types: [UPLOAD_AVATAR_REQUEST, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAILURE],
    url: '/api/v1/users/me/uploadAvatar',
    method: HTTP_METHODS.POST,
    params: formFileData
  }
});

// Relies on Redux Thunk middleware.
export const uploadAvatar = (formFileData) => {
  return (dispatch, getState) => {
    return dispatch(requestUploadAvatar(formFileData))
  }
};