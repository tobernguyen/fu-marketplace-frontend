import * as ActionTypes from '../actions';
import * as UserActionTypes from '../actions/user';
import _ from 'lodash';

export const user = (state = {}, action) => {
  const { type, response, error, user } = action;
  switch (type) {
    case ActionTypes.CURRENT_USER_SUCCESS:
      return _.assign({}, state, {
        currentUser: response
      });
    case ActionTypes.UPLOAD_AVATAR_SUCCESS:
      return _.assign({}, state, {
        currentUser: response,
        newAvatar: response.avatar
      });
    case ActionTypes.UPDATE_USER_INFO_SUCCESS:
      return _.assign({}, state, {
        currentUser: response,
        userUpdated: true
      });
    case ActionTypes.CURRENT_USER_FAILURE:
    case ActionTypes.UPLOAD_AVATAR_FAILURE:
    case ActionTypes.UPDATE_USER_INFO_FAILURE:
    case UserActionTypes.UPLOAD_IDENTITY_PHOTO_FAILURE:
      return _.assign({}, state, {
        error: error
      });
    case ActionTypes.ACCOUNT_INFO_CHANGED:
      const newUserInfo = _.merge(state.currentUser, user);
      return _.merge({}, state, {
        currentUser: newUserInfo,
        newAvatar: null
      });
    case UserActionTypes.UPLOAD_IDENTITY_PHOTO_SUCCESS:
      return _.assign({}, state, {
        identityPhoto: response.identityPhoto
      });
    default:
      return state;
  }
};
