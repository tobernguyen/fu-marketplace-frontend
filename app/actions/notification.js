import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';
const requestGetNotifications = () => ({
  [CALL_API]: {
    types: [GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILURE],
    url: '/api/v1/users/me/notifications',
    method: HTTP_METHODS.GET
  }
});

export const getNotifications = () => {
  return (dispatch) => {
    return dispatch(requestGetNotifications())
  }
};
