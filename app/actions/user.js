import { CALL_API, HTTP_METHODS } from '../middleware/api';

const userEndpoint = '/api/v1/users';

export const UPLOAD_IDENTITY_PHOTO_REQUEST = 'UPLOAD_IDENTITY_PHOTO_REQUEST';
export const UPLOAD_IDENTITY_PHOTO_SUCCESS = 'UPLOAD_IDENTITY_PHOTO_SUCCESS';
export const UPLOAD_IDENTITY_PHOTO_FAILURE = 'UPLOAD_IDENTITY_PHOTO_FAILURE';
const requestUploadIdentityPhoto = (formFileData) => ({
  [CALL_API]: {
    types: [UPLOAD_IDENTITY_PHOTO_REQUEST, UPLOAD_IDENTITY_PHOTO_SUCCESS, UPLOAD_IDENTITY_PHOTO_FAILURE],
    url: `${userEndpoint}/me/uploadIdentityPhoto`,
    method: HTTP_METHODS.POST,
    params: formFileData
  }
});

export const uploadIdentityPhoto = (formFileData) => {
  return (dispatch) => {
    return dispatch(requestUploadIdentityPhoto(formFileData))
  }
};


export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';
const requestUpdateUserInfo = (newUserInfo) => ({
  [CALL_API]: {
    types: [UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS, UPDATE_USER_INFO_FAILURE],
    url: '/api/v1/users/me',
    method: HTTP_METHODS.PUT,
    params: newUserInfo
  }
});

export const updateUserInfo = (newUserInfo) => {
  return (dispatch) => {
    return dispatch(requestUpdateUserInfo(newUserInfo))
  }
};


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
  return (dispatch) => {
    return dispatch(requestUploadAvatar(formFileData))
  }
};

export const USER_GET_SHOP_REQUEST = 'USER_GET_SHOP_REQUEST';
export const USER_GET_SHOP_SUCCESS = 'USER_GET_SHOP_SUCCESS';
export const USER_GET_SHOP_FAILURE = 'USER_GET_SHOP_FAILURE';
const requestGetUserShop = (shopID) => ({
  [CALL_API]: {
    types: [USER_GET_SHOP_REQUEST, USER_GET_SHOP_SUCCESS, USER_GET_SHOP_FAILURE],
    url: `/api/v1/shops/${shopID}`,
    method: HTTP_METHODS.GET
  }
});

export const getUserShop = (shopID) => {
  return (dispatch) => {
    return dispatch(requestGetUserShop(shopID))
  }
};

