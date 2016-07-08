import * as FeedActionTypes from '../actions/feed';
import * as ItemActionTypes from '../actions/item';
import _ from 'lodash';

const INITIAL_STATE = {
  shops: [],
  categories: [],
  aggregations: {
    category: {},
    shipPlace: {}
  }
};

export const feed = (state = INITIAL_STATE, action) => {
  const { type, response, payload } = action;
  switch (type) {
    case FeedActionTypes.GET_SHOPS_SUCCESS:
      const { result } = response;
      return _.merge({}, state, {
        shops: result.shops,
        aggregations: result.aggregations
      });
    case FeedActionTypes.GET_SHOPS_OF_PAGE_SUCCESS: {
      const { result: { shops, aggregations } } = response;
      return _.assign({}, state, {
        shops: _.concat(state.shops, shops),
        aggregations: aggregations
      });
    }
    case FeedActionTypes.GET_FIRST_PAGE_SHOPS_REQUEST:
      return _.merge({}, state, {
        shops: INITIAL_STATE.shop,
        aggregations: INITIAL_STATE.aggregations
      });
    case FeedActionTypes.GET_FIRST_PAGE_SHOPS_SUCCESS: {
      const { result: { shops, aggregations } } = response;
      return _.assign({}, state, {
        shops: shops,
        aggregations: aggregations
      });
    }
    case FeedActionTypes.WS_SHOP_UPDATED:{
      const { shop } = payload;
      const existingShopIndex = _.findIndex(state.shops, (s) =>
        s.id === shop.id
      );
      const updatedShop = _.assign({}, state.shops[existingShopIndex], shop);

      return _.assign({}, state, {
        shops: _.concat(
          _.slice(state.shops, 0, existingShopIndex),
          updatedShop,
          _.slice(state.shops, existingShopIndex + 1, state.shops.length)
        )
      });
    }

    case ItemActionTypes.GET_ITEM_CATEGORIES_SUCCESS:
      return _.merge({}, state, response);
    default:
      return state;
  }
};
