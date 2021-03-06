import * as ActionTypes from '../actions';
import * as UserActionTypes from '../actions/user';
import * as FeedActionTypes from '../actions/feed';
import * as ShopActionTypes from '../actions/shop';
import * as OrderActionTypes from '../actions/order';
import { UPDATE_STATUS } from 'app/shared/statusCode';
import _ from 'lodash';


const INITIAL_STATE = {
  currentUser: {},
  currentViewedShop: {},
  cartItems: [],
  avatarUploading: false,
  userUpdateStatus: UPDATE_STATUS.NOTHING
};

export const user = (state = INITIAL_STATE, action) => {
  const { type, response, error, payload } = action;
  switch (type) {
    case ActionTypes.CURRENT_USER_SUCCESS:
      return _.assign({}, state, {
        currentUser: response
      });
    case UserActionTypes.RESET_UPDATE_STATUS:
      return _.assign({}, state, {
        avatarUploading: false,
        userUpdateStatus: UPDATE_STATUS.NOTHING
      });
    case UserActionTypes.UPLOAD_AVATAR_SUCCESS:
      const newAvatar = response.avatar;
      return _.assign({}, state, {
        currentUser: _.assign({}, state.currentUser, {
          avatar: newAvatar
        }),
        avatarUploading: false
      });
    case UserActionTypes.UPLOAD_AVATAR_REQUEST:
      return _.assign({}, state, {
        avatarUploading: true
      });
    case UserActionTypes.UPDATE_USER_INFO_REQUEST:
      return _.assign({}, state, {
        userUpdateStatus: UPDATE_STATUS.UPDATING
      });
    case UserActionTypes.UPDATE_USER_INFO_SUCCESS:
      return _.assign({}, state, {
        currentUser: _.assign({}, state.currentUser, {
          phone: response.phone,
          room: response.room
        }),
        userUpdateStatus: UPDATE_STATUS.UPDATED
      });
    case UserActionTypes.UPDATE_USER_INFO_FAILURE:
      return _.assign({}, state, {
        userUpdateStatus: UPDATE_STATUS.FAILED
      });
    case UserActionTypes.USER_GET_SHOP_SUCCESS:
      // Shop item grouped by category id
      const groupItems = _.groupBy(response.items, 'categoryId');
      const modifiedShop = _.assign({}, response, {
        groupItems: groupItems,
        allItems: response.items
      });
      return _.merge({}, state, {
        currentViewedShop: modifiedShop
      });
    case UserActionTypes.USER_GET_SHOP_FAILURE:
    case UserActionTypes.CLEAR_CURRENT_VIEWED_SHOP:
      return _.assign({}, state, {
        currentViewedShop: {},
        cartItems: []
      });
    case OrderActionTypes.USER_PLACE_ORDER_SUCCESS:
      return _.assign({}, state, {
        cartItems: []
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
    case UserActionTypes.UPLOAD_IDENTITY_PHOTO_FAILURE:
      return _.assign({}, state, {
        error: error,
        avatarUploading: false
      });
    case ActionTypes.GOOGLE_SIGN_OUT:
      return _.assign({}, state, {
        error: undefined
      });
    case UserActionTypes.UPLOAD_IDENTITY_PHOTO_SUCCESS:
      return _.assign({}, state, {
        identityPhoto: response.identityPhoto
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
    case ShopActionTypes.USER_GETS_SHOP_REVIEWS_SUCCESS:
    {
      const currentViewedShop = _.assign({}, state.currentViewedShop, {
        reviews: response.reviews
      });
      return _.assign({}, state, {
        currentViewedShop: currentViewedShop
      });
    }
    case ShopActionTypes.USER_RATES_SHOP_SUCCESS:
    {
      const { currentViewedShop: { reviews } } = state;

      if (!reviews) return state;

      if (reviews instanceof Array) {
        if (reviews.length === 0) return state;
      }

      let updatedReviews = [];

      const index = _.findIndex(reviews, (r) =>
        r.id === response.id
      );

      const newReview = _.merge({}, reviews[index], {
        comment: response.comment,
        rate: response.rate
      });

      if (index > -1) {
        updatedReviews = _.concat(
          _.slice(reviews, 0, index),
          newReview,
          _.slice(reviews, index + 1, reviews.length)
        );
      } else {
        updatedReviews = _.concat(response, reviews);
      }

      const currentViewedShop = _.assign({}, state.currentViewedShop, {
        reviews: updatedReviews
      });

      return _.assign({}, state, {
        currentViewedShop: currentViewedShop
      });
    }
    default:
      return state;
  }
};
