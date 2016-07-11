import * as ActionTypes from '../actions';
import * as UserActionTypes from '../actions/user';
import * as FeedActionTypes from '../actions/feed';
import _ from 'lodash';
import { getImageURLWithTimestamp } from 'app/helpers/image';

const INITIAL_STATE = {
  currentUser: {},
  currentViewedShop: {},
  cartItems: []
};

export const user = (state = INITIAL_STATE, action) => {
  const { type, response, error, payload } = action;
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
      // Shop item grouped by category id
      const groupItems = _.groupBy(response.items, 'categoryId');
      const modifiedShop = _.assign({}, response, {
        groupItems: groupItems
      });
      return _.merge({}, state, {
        currentViewedShop: modifiedShop
      });
    case UserActionTypes.USER_GET_SHOP_FAILURE:
    case UserActionTypes.CLEAR_CURRENT_VIEWED_SHOP:
      return _.assign({}, state, {
        currentViewedShop: {}
      });
    case FeedActionTypes.WS_SHOP_UPDATED:
    {
      const { currentViewedShop } = state;

      if (_.isEmpty(currentViewedShop)) {
        return state;
      }
      const { shop } = payload;

      return _.merge({}, state, {
        currentViewedShop: _.merge({}, currentViewedShop, shop)
      });
    }
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
    case UserActionTypes.ADD_ITEM_TO_CART:
      const currentCartItems = state.cartItems;
      const addedItem = payload.item;
      const itemIndex = _.findIndex(currentCartItems, (cartItem) =>
        cartItem.id === addedItem.id
      );
      if (itemIndex === -1) {
        return _.assign({}, state, {
          cartItems: [
            ...state.cartItems,
            addedItem
          ]
        });
      } else {
        return _.assign({}, state, {
          cartItems: currentCartItems.filter(item =>
            item.id !== addedItem.id
          )
        });
      }
    case UserActionTypes.REMOVE_ITEM_FROM_CART:
      return _.assign({}, state, {
        cartItems: state.cartItems.filter(item =>
          item.id !== payload.itemID
        )
      });
    default:
      return state;
  }
};
