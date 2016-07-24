import * as NotificationTypes from '../actions/notification';
import _ from 'lodash';

const INITIAL_STATE = {
  notifications: [],
  unreadCount: 0,
  markAsReadSuccessful: false,
  oneSignalRegistered: false,
  hasMore: true
};

export const notification = (state = INITIAL_STATE, action) => {
  const { type, response, payload } = action;
  switch (type) {
    case NotificationTypes.GET_NOTIFICATIONS_SUCCESS:
    {
      const { notifications, unreadCount } = response;
      return _.assign({}, state, {
        notifications: _.concat(state.notifications, notifications),
        hasMore: notifications.length !== 0,
        unreadCount: unreadCount
      });
    }
    case NotificationTypes.GET_UNREAD_COUNT_SUCCESS:
    {
      const { unreadCount } = response;
      return _.assign({}, state, {
        unreadCount: unreadCount
      });
    }
    case NotificationTypes.CLEAR_NOTIFICATIONS:
    {
      return _.assign({}, state, {
        notifications: INITIAL_STATE.notifications,
        hasMore: INITIAL_STATE.hasMore
      });
    }
    case NotificationTypes.MARK_NOTIFICATION_AS_READ_REQUEST:
    {
      return _.assign({}, state, {
        markAsReadSuccessful: false
      });
    }
    case NotificationTypes.MARK_NOTIFICATION_AS_READ_SUCCESS:
    {
      return _.assign({}, state, {
        markAsReadSuccessful: true
      });
    }
    case NotificationTypes.MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
    {
      return _.assign({}, state, {
        notifications: state.notifications.map((notification) => {
          notification.read = true;
          return notification;
        }),
        unreadCount: 0
      });
    }
    case NotificationTypes.WS_NEW_NOTIFICATION:
    {
      const { notification } = payload;
      return _.assign({}, state, {
        promptNotification: notification,
        unreadCount: state.unreadCount + 1
      })
    }
    case NotificationTypes.REGISTER_ONE_SIGNAL_SUCCESS:
    {
      return _.assign({}, state, {
        oneSignalRegistered: true
      });
    }
    case NotificationTypes.REGISTER_ONE_SIGNAL_REQUEST:
    case NotificationTypes.REGISTER_ONE_SIGNAL_FAILURE:
    {
      return _.assign({}, state, {
        oneSignalRegistered: false
      });
    }
    default:
      return state;
  }
};
