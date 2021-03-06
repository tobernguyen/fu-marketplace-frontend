import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';
const requestGetNotifications = (page) => ({
  [CALL_API]: {
    types: [GET_NOTIFICATIONS_REQUEST, GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAILURE],
    url: '/api/v1/users/me/notifications',
    method: HTTP_METHODS.GET,
    params: {
      size: 5,
      page: page
    }
  }
});

export const getNotifications = (page) => {
  return (dispatch) => {
    return dispatch(requestGetNotifications(page))
  }
};

export const GET_UNREAD_COUNT_REQUEST = 'GET_UNREAD_COUNT_REQUEST';
export const GET_UNREAD_COUNT_SUCCESS = 'GET_UNREAD_COUNT_SUCCESS';
export const GET_UNREAD_COUNT_FAILURE = 'GET_UNREAD_COUNT_FAILURE';
const requestGetUnreadCount = () => ({
  [CALL_API]: {
    types: [GET_UNREAD_COUNT_REQUEST, GET_UNREAD_COUNT_SUCCESS, GET_UNREAD_COUNT_FAILURE],
    url: '/api/v1/users/me/notifications',
    method: HTTP_METHODS.GET
  }
});

export const getUnreadCount = () => {
  return (dispatch) => {
    return dispatch(requestGetUnreadCount())
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
    url: '/api/v1/users/me/notifications/read',
    method: HTTP_METHODS.POST
  }
});

export const markAllNotificationsAsRead = () => {
  return (dispatch) => {
    return dispatch(requestMarkAllNotificationsAsRead())
  }
};

export const REGISTER_ONE_SIGNAL_REQUEST = 'REGISTER_ONE_SIGNAL_REQUEST';
export const REGISTER_ONE_SIGNAL_SUCCESS = 'REGISTER_ONE_SIGNAL_SUCCESS';
export const REGISTER_ONE_SIGNAL_FAILURE = 'REGISTER_ONE_SIGNAL_FAILURE';
const requestRegisterOneSignal = (playerId) => ({
  [CALL_API]: {
    types: [REGISTER_ONE_SIGNAL_REQUEST, REGISTER_ONE_SIGNAL_SUCCESS, REGISTER_ONE_SIGNAL_FAILURE],
    url: '/api/v1/users/me/registerOneSignal',
    method: HTTP_METHODS.POST,
    params: {
      playerId: playerId
    }
  }
});

export const registerOneSignal = (playerId) => {
  return (dispatch) => {
    return dispatch(requestRegisterOneSignal(playerId))
  }
};


export const WS_NEW_NOTIFICATION = 'WS_NEW_NOTIFICATION';
export const newNotification = (notification) => ({
  type: WS_NEW_NOTIFICATION,
  payload: {
    notification: notification
  }
});

export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';
export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS

});
