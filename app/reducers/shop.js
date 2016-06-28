import * as ShopActionTypes from '../actions/shop';
import * as CommonActionTypes from '../actions/common';
import _ from 'lodash';
import { getImageURLWithTimestamp } from 'app/helpers/image';

const INITIAL_STATE = {
  shopOpeningRequests: [],
  sellerShop: {},
  sellingItems: [],
  toBeUpdatedItem: null,
  newlyItemAdded: false,
  itemUpdated: false,
  shipPlacesUpdated: false,
  places: []
};

export const shop = (state = INITIAL_STATE, action) => {
  const { type, response, error, payload } = action;
  switch (type) {
    case ShopActionTypes.SHOP_REQUEST_OPENING_SUCCESS:
      return _.assign({}, state, {
          request: response
      });
    case ShopActionTypes.SELLER_GET_SHOP_SUCCESS:
    case ShopActionTypes.UPDATE_SHOP_INFO_SUCCESS:
      return _.assign({}, state, {
        sellerShop: response
      });
    case ShopActionTypes.SELLER_UPDATE_SHIP_PLACES_SUCCESS:
      return _.assign({}, state, {
        sellerShop: response,
        shipPlacesUpdated: true
      });
    case ShopActionTypes.SELLER_DELETE_SHOP_ITEM_REQUEST:
      return _.merge({}, state, {
        shipPlacesUpdated: false
      });
    case ShopActionTypes.SELLER_GET_SHOP_ITEM_LIST_SUCCESS:
      return _.assign({}, state, {
        sellingItems: response.items
      });
    case ShopActionTypes.SHOP_CREATE_ITEM_SUCCESS:
      return _.assign({}, state, {
        sellingItems: [...state.sellingItems, response],
        newlyItemAdded: true
      });
    case ShopActionTypes.SELLER_UPDATE_SHOP_ITEM_SUCCESS:
      const { sellingItems } = state;
      const updatedItemIndex = _.findIndex(sellingItems, (p => {
        return p.id === response.id
      }));

      return _.assign({}, state, {
        sellingItems: _.concat(
          _.slice(sellingItems, 0, updatedItemIndex),
          response,
          _.slice(sellingItems, updatedItemIndex + 1, sellingItems.length)
        ),
        itemUpdated: true
      });
    case CommonActionTypes.GET_SHIP_PLACES_SUCCESS:
      let places = action.response.shipPlaces;
      places.map(place =>
        place.checked = false
      );
      return _.merge({}, state, {
        places: places
      });
    case ShopActionTypes.TOGGLE_SHIP_PLACE:
      return _.merge({}, state, {
        places: state.places.map(place =>
          place.id === payload.placeID ? _.assign({}, place, {
            checked: !place.checked
          }) : place
        )
      });
    case ShopActionTypes.RESET_UPDATED_ITEM_STATUS:
      return _.assign({}, state, {
        newlyItemAdded: false,
        itemUpdated: false,
        shipPlacesUpdated: false
      });
    case ShopActionTypes.SELLER_DELETE_SHOP_ITEM_SUCCESS:
      return _.assign({}, state, {
        itemDeleted: true
      });
    case ShopActionTypes.REMOVE_SHOP_ITEM_FROM_LIST:
      return _.assign({}, state, {
        itemDeleted: false,
        sellingItems: _.filter(state.sellingItems, (item) => {
          return item.id !== payload.itemID
        })
      });
    case ShopActionTypes.UPLOAD_SHOP_AVATAR_SUCCESS:
      const newAvatar = response.avatar ? getImageURLWithTimestamp(response.avatar) : '';
      const modifiedResponse = response;
      modifiedResponse.avatar = newAvatar;
      return _.assign({}, state, {
        sellerShop: modifiedResponse
      });
    case ShopActionTypes.UPLOAD_SHOP_COVER_SUCCESS:
      const newCover = response.cover ? getImageURLWithTimestamp(response.cover) : '';
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
    default:
      return state;
  }
};
