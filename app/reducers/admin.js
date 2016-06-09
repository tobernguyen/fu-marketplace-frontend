import * as ActionTypes from '../actions';
import * as AdminActionTypes from '../actions/admin';
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
  editUserFormStatus: {
    isFetching: false,
    user: {},
    isSubmitting: false,
    responseCode: 0,
    response: ''
  },
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
    case ActionTypes.ADMIN_GET_USER_REQUEST:
      return _.assign({}, state, {
        editUserFormStatus: {
          isFetching: true
        }
      });
    case ActionTypes.ADMIN_GET_USER_SUCCESS:
      return _.assign({}, state, {
        editUserFormStatus: {
          isFetching: false,
          user: response
        }
      });
    case ActionTypes.ADMIN_GET_USERS_FAILURE:
      return _.assign({}, state, { users: [] });
    case ActionTypes.ADMIN_EDIT_USERS_SUCCESS:
      return _.assign({}, state, { users: updateInUserArray(state.users, response)});
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_SUCCESS:
      return _.assign({}, state, {
        editUserFormStatus: {
          user: response,
          responseCode: 1,
          response: 'User information is updated successfully'
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_SUCCESS:
      return _.assign({}, state, {
        editUserFormStatus: {
          user: response,
          responseCode: 3,
          response: 'User is banned'
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_SUCCESS:
      return _.assign({}, state, {
        editUserFormStatus: {
          user: response,
          responseCode: 3,
          response: 'User is unbanned'
        }
      });
    case ActionTypes.ADMIN_CHANGE_PASSWORD_REQUEST:
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
