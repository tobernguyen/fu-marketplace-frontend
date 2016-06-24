import * as ShopActionTypes from '../actions/shop';
import _ from 'lodash';
import { getImageURLWithTimestamp } from 'app/helpers/image';

const INITIAL_STATE = {
  shopOpeningRequests: [],
  sellerShop: {},
  sellingItems: []
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
    case ShopActionTypes.SELLER_GET_SHOP_ITEM_LIST_SUCCESS:
      return _.assign({}, state, {
        sellingItems: response.items
      });
    case ShopActionTypes.SHOP_CREATE_ITEM_SUCCESS:
      return _.assign({}, state, {
        sellingItems: [...state.sellingItems, response]
      });
    case ShopActionTypes.SELLER_DELETE_SHOP_ITEM_SUCCESS:
      return _.assign({}, state, {
        itemUpdated: true
      });
    case ShopActionTypes.REMOVE_SHOP_ITEM_FROM_LIST:
      return _.assign({}, state, {
        itemUpdated: false,
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
    default:
      return state;
  }
};
