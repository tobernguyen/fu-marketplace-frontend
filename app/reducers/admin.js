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

const initialState = {
  users: [],
  shops: [],
  changePasswordFormStatus: {
    isSubmitting: false,
    response: ''
  }
};

export const admin = (state = initialState, action) => {
  const { type, response } = action;
  switch (type) {
    case ActionTypes.ADMIN_GET_USERS_SUCCESS:
      return _.assign({}, state, { users: response.users });
    case ActionTypes.ADMIN_GET_USERS_FAILURE:
      return _.assign({}, state, { users: [] });
    case ActionTypes.ADMIN_EDIT_USERS_SUCCESS:
      return _.assign({}, state, { users: updateInUserArray(state.users, response)});
    case ActionTypes.ADMIN_CHANGE_PASSWORD_REQUEST:
      console.log('Admin reducer ADMIN_CHANGE_PASSWORD_REQUEST');
      return _.assign({}, state, {
        changePasswordFormStatus: {
          isSubmitting: true
        }
      });
    case ActionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
      return _.assign({}, state, {
        changePasswordFormStatus: {
          isSubmitting: false,
          response: ''
        }
      });
    case ActionTypes.ADMIN_CHANGE_PASSWORD_FAILURE:
      return _.assign({}, state, {
        changePasswordFormStatus: {
          isSubmitting: false,
          response: 'Error happened'
        }
      });
    default:
      return state;
  }
};
