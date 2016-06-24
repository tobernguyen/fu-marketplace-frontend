import * as ActionTypes from '../actions';
import * as UserActionTypes from '../actions/user';
import _ from 'lodash';
import { getImageURLWithTimestamp } from 'app/helpers/image';

const INITIAL_STATE = {
  currentUser: {},
  currentViewedShop: null
};

export const user = (state = INITIAL_STATE, action) => {
  const { type, response, error, user } = action;
  switch (type) {
    case ActionTypes.CURRENT_USER_SUCCESS:
      return _.assign({}, state, {
        currentUser: response
      });
    case UserActionTypes.UPLOAD_AVATAR_SUCCESS:
      const newAvatar = response.avatar ? getImageURLWithTimestamp(response.avatar) : '';
      let modifiedResponse = response;
      modifiedResponse.avatar = newAvatar;
      return _.assign({}, state, {
        currentUser: modifiedResponse
      });
    case UserActionTypes.UPDATE_USER_INFO_SUCCESS:
      return _.assign({}, state, {
        currentUser: response,
        userUpdated: true
      });
    case UserActionTypes.USER_GET_SHOP_SUCCESS:
      return _.merge({}, state, {
        currentViewedShop: response
      });
    case UserActionTypes.USER_GET_SHOP_FAILURE:
      return _.merge({}, state, {
        currentViewedShop: null
      });
    case ActionTypes.CURRENT_USER_FAILURE:
    case UserActionTypes.UPLOAD_AVATAR_FAILURE:
    case UserActionTypes.UPDATE_USER_INFO_FAILURE:
    case UserActionTypes.UPLOAD_IDENTITY_PHOTO_FAILURE:
      return _.assign({}, state, {
        error: error
      });
    case UserActionTypes.UPLOAD_IDENTITY_PHOTO_SUCCESS:
      return _.assign({}, state, {
        identityPhoto: getImageURLWithTimestamp(response.identityPhoto)
      });
    default:
      return state;
  }
};
