import * as NotificationTypes from '../actions/notification';
import _ from 'lodash';

const INITIAL_STATE = {
  notifications: [],
  markAsReadSuccessful: false
};

export const notification = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch (type) {
    case NotificationTypes.GET_NOTIFICATIONS_SUCCESS:
      return _.assign({}, state, {
        notifications: response.notifications
      });
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
    default:
      return state;
  }
};
