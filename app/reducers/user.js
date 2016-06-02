import * as ActionTypes from '../actions';
import _ from 'lodash';

export const user = (state = {}, action) => {
  const { type, response, error } = action;
  switch (type) {
    case ActionTypes.CURRENT_USER_SUCCESS:
      return _.assign({}, state, {
        currentUser: response
      });
    case ActionTypes.CURRENT_USER_FAILURE:
      return _.assign({}, state, {
        error: error
      });
    default:
      return state;
  }
};
