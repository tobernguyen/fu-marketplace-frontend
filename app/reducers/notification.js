import * as NotificationTypes from '../actions/notification';
import _ from 'lodash';

const INITIAL_STATE = {
  notifications: [],
  markAsReadSuccessful: false,
  oneSignalRegistered: false,
  hasMore: true
};

export const notification = (state = INITIAL_STATE, action) => {
  const { type, response, payload } = action;
  switch (type) {
    case NotificationTypes.GET_NOTIFICATIONS_SUCCESS: {
      const { notifications } = response;
      return _.assign({}, state, {
        notifications: _.concat(state.notifications, notifications),
        hasMore: notifications.length !== 0
      });
    }
    case NotificationTypes.MARK_NOTIFICATION_AS_READ_REQUEST:
      return _.assign({}, state, {
        markAsReadSuccessful: false
      });
    case NotificationTypes.MARK_NOTIFICATION_AS_READ_SUCCESS:
      return _.assign({}, state, {
        markAsReadSuccessful: true
      });
    case NotificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      return _.assign({}, state, {
        notifications: state.notifications.map((notification) => {
          notification.read = true;
          return notification;
        })
      });
    case NotificationTypes.WS_NEW_NOTIFICATION: {
      const { notification } = payload;
      return _.assign({}, state, {
        notifications: [
          notification,
          ...state.notifications
        ],
        promptNotification: notification
      })
    }
    case NotificationTypes.REGISTER_ONE_SIGNAL_SUCCESS:
      return _.assign({}, state, {
        oneSignalRegistered: true
      });
    case NotificationTypes.REGISTER_ONE_SIGNAL_REQUEST:
    case NotificationTypes.REGISTER_ONE_SIGNAL_FAILURE:
      return _.assign({}, state, {
        oneSignalRegistered: false
      });
    default:
      return state;
  }
};
