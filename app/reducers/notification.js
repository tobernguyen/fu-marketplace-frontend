import * as NotificationTypes from '../actions/notification';
import _ from 'lodash';

const INITIAL_STATE = {
  notifications: []
};

export const notification = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch (type) {
    case NotificationTypes.GET_NOTIFICATIONS_SUCCESS:
      return _.assign({}, state, {
        notifications: response.notifications
      });
    default:
      return state;
  }
};
