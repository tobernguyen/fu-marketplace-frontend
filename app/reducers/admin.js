import * as ActionTypes from '../actions';
import _ from 'lodash';


//TODO: Refactor this
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
      return _.assign({}, state, { users: response.users });
    case ActionTypes.ADMIN_GET_USERS_FAILURE:
      return _.assign({}, state, { users: [] });
    case ActionTypes.ADMIN_EDIT_USERS_SUCCESS:
      return _.assign({}, state, { users: updateInUserArray(state.users, response)});
    default:
      return state;
  } 
};
