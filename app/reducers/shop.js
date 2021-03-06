import * as ShopActionTypes from '../actions/shop';
import * as CommonActionTypes from '../actions/common';
import _ from 'lodash';

const INITIAL_STATE = {
  shopOpeningRequests: [],
  sellerShop: {},
  sellingItems: {},
  toBeUpdatedItem: null,
  newlyItemAdded: false,
  itemUpdated: false,
  shipPlacesUpdated: false,
  places: [],
  formSubmitting: false,
  shouldRefresh: false,
  isFetchingItems: false
};

export const shop = (state = INITIAL_STATE, action) => {
  const { type, response, error, payload } = action;
  switch (type) {
    case ShopActionTypes.SHOP_REQUEST_OPENING_SUCCESS:
      return _.assign({}, state, {
          request: response
      });
    case ShopActionTypes.SELLER_GET_SHOP_SUCCESS:
      return _.assign({}, state, {
        sellerShop: response,
        shouldRefresh: true
      });
    case ShopActionTypes.UPDATE_SHOP_INFO_SUCCESS:
      return _.assign({}, state, {
        sellerShop: response,
        formSubmitting: false
      });
    case ShopActionTypes.SELLER_UPDATE_SHIP_PLACES_SUCCESS:
      return _.assign({}, state, {
        sellerShop: response,
        shipPlacesUpdated: true,
        formSubmitting: false
      });
    case ShopActionTypes.SELLER_DELETE_SHOP_ITEM_REQUEST:
      return _.merge({}, state, {
        shipPlacesUpdated: false,
        formSubmitting: true
      });
    case ShopActionTypes.SELLER_GET_SHOP_ITEM_LIST_REQUEST:
    case ShopActionTypes.SELLER_GET_SHOP_ITEM_LIST_FAILURE:
      return _.assign({}, state, {
        shouldRefresh: false,
        isFetchingItems: true
      });
    case ShopActionTypes.SELLER_GET_SHOP_ITEM_LIST_SUCCESS:
      // Shop item grouped by category id
      let groupItems = _.groupBy(response.items, 'categoryId');

      if (groupItems && response.items) {
        groupItems[0] = response.items;
      }
      return _.assign({}, state, {
        sellingItems: groupItems,
        itemUpdated: false,
        itemDeleted: false,
        newlyItemAdded: false,
        isFetchingItems: false
      });
    case ShopActionTypes.SHOP_CREATE_ITEM_REQUEST:
    case ShopActionTypes.SELLER_UPDATE_SHOP_ITEM_REQUEST:
    case ShopActionTypes.SELLER_UPDATE_SHIP_PLACES_REQUEST:
    case ShopActionTypes.UPDATE_SHOP_INFO_REQUEST:
    case ShopActionTypes.UPLOAD_SHOP_AVATAR_REQUEST:
      return _.assign({}, state, {
        formSubmitting: true
      });
    case ShopActionTypes.SHOP_CREATE_ITEM_SUCCESS:
    {
      const { categoryId } = response;
      let newSellingItems = {};
      if (_.isEmpty(state.sellingItems)) {
        newSellingItems[categoryId] = [response];
      } else {
        newSellingItems = _.assign({}, state.sellingItems);
        if (state.sellingItems.hasOwnProperty(categoryId)) {
          newSellingItems[categoryId] = _.assign([], state.sellingItems[categoryId], [
            response, ...state.sellingItems[categoryId]
          ]);
        } else {
          newSellingItems[categoryId] = [response];
        }
      }
      return _.assign({}, state, {
        sellingItems: _.assign({}, state.sellingItems, newSellingItems),
        newlyItemAdded: true,
        formSubmitting: false,
        shouldRefresh: true
      });
    }
    case ShopActionTypes.SELLER_SET_ITEM_STATUS_SUCCESS:
    {
      const { sellingItems } = state;
      const { categoryId } = response;
      const updatedCategoryItems = sellingItems[categoryId];
      const updatedItemIndex = _.findIndex(updatedCategoryItems, (p => {
        return p.id === response.id
      }));
      let newSellingItems = _.assign({}, sellingItems);
      newSellingItems[categoryId] = _.concat(
        _.slice(updatedCategoryItems, 0, updatedItemIndex),
        response,
        _.slice(updatedCategoryItems, updatedItemIndex + 1, updatedCategoryItems.length)
      );

      if (newSellingItems[0]) {
        let allSellingItems = newSellingItems[0];
        const updatedItemIndex = _.findIndex(allSellingItems, (p => {
          return p.id === response.id
        }));

        allSellingItems = _.concat(
          _.slice(allSellingItems, 0, updatedItemIndex),
          response,
          _.slice(allSellingItems, updatedItemIndex + 1, allSellingItems.length)
        );
        newSellingItems[0] = allSellingItems;
      }

      return _.assign({}, state, {
        sellingItems: newSellingItems
      });
    }
    case ShopActionTypes.SELLER_UPDATE_SHOP_ITEM_SUCCESS:
    {
      return _.assign({}, state, {
        itemUpdated: true,
        shouldRefresh: true,
        formSubmitting: false
      });
    }
    case CommonActionTypes.GET_SHIP_PLACES_SUCCESS:
      let places = action.response.shipPlaces;
      places.map(place =>
        place.checked = false
      );
      return _.merge({}, state, {
        places: places
      });
    case ShopActionTypes.RESET_UPDATED_ITEM_STATUS:
      return _.assign({}, state, {

      });
    case ShopActionTypes.SELLER_DELETE_SHOP_ITEM_SUCCESS:
      return _.assign({}, state, {
        itemDeleted: true,
        shouldRefresh: true,
        formSubmitting: false
      });
    case ShopActionTypes.UPLOAD_SHOP_AVATAR_SUCCESS:
      const newAvatar = response.avatar;
      const modifiedResponse = response;
      modifiedResponse.avatar = newAvatar;
      return _.assign({}, state, {
        sellerShop: modifiedResponse,
        formSubmitting: false
      });
    case ShopActionTypes.UPLOAD_SHOP_COVER_SUCCESS:
      const newCover = response.cover;
      const modifiedCoverResponse = response;
      modifiedCoverResponse.cover = newCover;
      return _.assign({}, state, {
        sellerShop: modifiedCoverResponse
      });
    case ShopActionTypes.GET_PENDING_REQUESTS_SUCCESS:
      return _.assign({}, state, {
        shopOpeningRequests: response.shopOpeningRequests
      });
    case ShopActionTypes.SHOP_REQUEST_OPENING_FAILURE:
    case ShopActionTypes.GET_PENDING_REQUESTS_FAILURE:
        return _.assign({}, state, {
          error: error
        });
    case ShopActionTypes.SET_TO_BE_UPDATED_ITEM:
      return _.merge({}, state, {
        toBeUpdatedItem: payload.toBeUpdatedItem
      });
    case ShopActionTypes.USER_RATES_SHOP_SUCCESS:
      return _.assign({}, state, {
        reviewStatus: 'shop.review.success'
      });
    case ShopActionTypes.CLEAR_REVIEW_STATUS:
      return _.assign({}, state, {
        reviewStatus: null
      });
    case ShopActionTypes.USER_RATES_SHOP_FAILURE:
      return _.assign({}, state, {
        reviewStatus: error.message_code
      });
    default:
      return state;
  }
};
