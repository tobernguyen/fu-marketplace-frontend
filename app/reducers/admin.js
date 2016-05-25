import * as ActionTypes from '../actions';

export const admin = (state = { users: [] }, action) => {
  const { type, response } = action;
  switch (type) {
    case ActionTypes.ADMIN_GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: response });
    case ActionTypes.ADMIN_GET_USERS_FAILURE:
      return Object.assign({}, state, { users: [] });
    default:
      return state;
  }
};
