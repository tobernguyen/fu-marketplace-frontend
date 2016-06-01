import * as ActionTypes from '../actions';
import _ from 'lodash';

export const user = (state = {}, action) => {
  const { type, response } = action;
  switch (type) {
    case ActionTypes.CURRENT_USER_SUCCESS:
      return _.assign({}, state, {
        currentUser: response
      });
    default:
      return state;
  }
};
