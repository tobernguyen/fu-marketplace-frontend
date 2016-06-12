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
