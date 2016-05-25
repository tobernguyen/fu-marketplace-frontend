import * as ActionTypes from '../actions';

function updateInUserArray(state, value) {
  let newState = state;
  for(let i in newState) {
    if(newState[i].id === value.id) {
      newState[i] = value;
    }
  }
  return newState;
}

export const admin = (state = { users: [] }, action) => {
  const { type, response } = action;
  switch (type) {
    case ActionTypes.ADMIN_GET_USERS_SUCCESS:
      return Object.assign({}, state, { users: response });
    case ActionTypes.ADMIN_GET_USERS_FAILURE:
      return Object.assign({}, state, { users: [] });
    case ActionTypes.ADMIN_EDIT_USER_SUCCESS:
      return Object.assign({}, state, { users: updateInUserArray(state.users, response)});
    case ActionTypes.ADMIN_GET_USERS_FAILURE:
      console.log('ADMIN_GET_USERS_FAILURE');
      return state;
    default:
      return state;
  }
};
