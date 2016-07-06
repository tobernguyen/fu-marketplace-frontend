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

export const MARK_NOTIFICATION_AS_READ_REQUEST = 'MARK_NOTIFICATION_AS_READ_REQUEST';
export const MARK_NOTIFICATION_AS_READ_SUCCESS = 'MARK_NOTIFICATION_AS_READ_SUCCESS';
export const MARK_NOTIFICATION_AS_READ_FAILURE = 'MARK_NOTIFICATION_AS_READ_FAILURE';
const requestMarkNotificationAsRead = (id) => ({
  [CALL_API]: {
    types: [MARK_NOTIFICATION_AS_READ_REQUEST, MARK_NOTIFICATION_AS_READ_SUCCESS, MARK_NOTIFICATION_AS_READ_FAILURE],
    url: `/api/v1/users/me/notifications/${id}/read`,
    method: HTTP_METHODS.POST
  }
});

export const markNotificationAsRead = (id) => {
  return (dispatch) => {
    return dispatch(requestMarkNotificationAsRead(id))
  }
};

export const MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST = 'MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST';
export const MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS = 'MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS';
export const MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE = 'MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE';
const requestMarkAllNotificationsAsRead = () => ({
  [CALL_API]: {
    types: [MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST, MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS, MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE],
    url: `/api/v1/users/me/notifications/read`,
    method: HTTP_METHODS.POST
  }
});

export const markAllNotificationsAsRead = () => {
  return (dispatch) => {
    return dispatch(requestMarkAllNotificationsAsRead())
  }
};
