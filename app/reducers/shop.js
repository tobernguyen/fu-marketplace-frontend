import * as ActionTypes from '../actions';
import * as ShopActionTypes from '../actions/shop';
import _ from 'lodash';

const INITIAL_STATE = {
  shopOpeningRequests: []
};

export const shop = (state = INITIAL_STATE, action) => {
  const { type, response, error } = action;
  switch (type) {
    case ShopActionTypes.SHOP_REQUEST_OPENING_SUCCESS:
        return _.assign({}, state, {
            request: response
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
