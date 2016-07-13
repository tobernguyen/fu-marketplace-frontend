import * as FeedActionTypes from '../actions/feed';
import * as ItemActionTypes from '../actions/item';
import _ from 'lodash';

const INITIAL_STATE = {
  shops: [],
  categories: [],
  aggregations: {
    category: {},
    shipPlace: {}
  },
  hasMore: true
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
        aggregations: aggregations,
        hasMore: shops.length !== 0
      });
    }
    case FeedActionTypes.CLEAR_SHOPS_FEED: {
      return _.assign({}, state, {
        shops: INITIAL_STATE.shops,
        aggregations: INITIAL_STATE.aggregations,
        hasMore: INITIAL_STATE.hasMore
      });
    }
    case FeedActionTypes.WS_SHOP_UPDATED:{
      const { shop } = payload;
      let shopStatus = -1;
      if (shop.hasOwnProperty('status')) {
        shopStatus = shop['status'];
      }

      const existingShopIndex = _.findIndex(state.shops, (s) =>
        s.id === shop.id
      );

      switch (shopStatus) {
        case 1: // Published
          return state;
        case 0: // Unpublished
          if (existingShopIndex > -1) {
            return _.assign({}, state, {
              shops: _.concat(
                _.slice(state.shops, 0, existingShopIndex),
                _.slice(state.shops, existingShopIndex + 1, state.shops.length)
              )
            });
          } else {
            return state;
          }
        default:
          const updatedShop = _.assign({}, state.shops[existingShopIndex], shop);
          return _.assign({}, state, {
            shops: _.concat(
              _.slice(state.shops, 0, existingShopIndex),
              updatedShop,
              _.slice(state.shops, existingShopIndex + 1, state.shops.length)
            )
          });
      }
    }

    case ItemActionTypes.GET_ITEM_CATEGORIES_SUCCESS:
      return _.merge({}, state, response);
    default:
      return state;
  }
};
