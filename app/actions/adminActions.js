import { CALL_API, HTTP_METHODS } from '../middleware/api';
import { accessTokenKey, adminAccessTokenKey } from 'app/config';

export const ADMIN_GET_USERS_REQUEST = 'ADMIN_GET_USERS_REQUEST';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_FAILURE = 'ADMIN_GET_USERS_FAILURE';
export const adminGetUsers = () => ({
  [CALL_API]: {
    types: [ADMIN_GET_USERS_REQUEST, ADMIN_GET_USERS_SUCCESS, ADMIN_GET_USERS_FAILURE],
    url: '/api/v1/admin/users',
    method: HTTP_METHODS.GET
  }
});

export const ADMIN_EDIT_USERS_REQUEST = 'ADMIN_EDIT_USERS_REQUEST';
export const ADMIN_EDIT_USERS_SUCCESS = 'ADMIN_EDIT_USERS_SUCCESS';
export const ADMIN_EDIT_USERS_FAILURE = 'ADMIN_EDIT_USERS_FAILURE';
export const adminEditUser = (user) => ({
  [CALL_API]: {
    types: [ADMIN_EDIT_USERS_REQUEST, ADMIN_EDIT_USERS_SUCCESS, ADMIN_EDIT_USERS_FAILURE],
    url: `/api/v1/admin/users/${user.id}`,
    params: user,
    method: HTTP_METHODS.PUT
  }
});