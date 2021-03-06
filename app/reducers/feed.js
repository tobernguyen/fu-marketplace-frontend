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
  total: 0,
  hasMore: true,
  pinnedShops: [],
  firstLoad: true,
  noShop: false
};

const SHOP_STATUS = {
  PUBLISHED: 1,
  UN_PUBLISHED: 0
};

export const feed = (state = INITIAL_STATE, action) => {
  const { type, response, payload } = action;
  switch (type) {
    case FeedActionTypes.GET_SHOPS_SUCCESS:
      const { result } = response;
      return _.assign({}, state, {
        aggregations: result.aggregations,
        total: result.total
      });
    case FeedActionTypes.GET_SHOPS_OF_PAGE_REQUEST: {
      return _.assign({}, state, {
        firstLoad: true,
        noShop: INITIAL_STATE.noShop
      });
    }
    case FeedActionTypes.GET_SHOPS_OF_PAGE_SUCCESS: {
      const { result: { shops } } = response;
      const noShopStatus = (shops.length === 0 && state.shops.length === 0);
      var newShop = _.concat(state.shops, shops);
      var newClosedShop = _.remove(newShop, (shop) => {
        return shop.opening === false;
      });
      const sortedNewShop = _.concat(newShop, newClosedShop);
      return _.assign({}, state, {
        shops: sortedNewShop,
        hasMore: shops.length !== 0,
        firstLoad: false,
        noShop: noShopStatus
      });
    }
    case FeedActionTypes.CLEAR_SHOPS_FEED: {
      return _.assign({}, state, {
        shops: INITIAL_STATE.shops,
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
        case SHOP_STATUS.PUBLISHED:
          return state;
        case SHOP_STATUS.UN_PUBLISHED:
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
          if (existingShopIndex > -1) {
            const updatedShop = _.assign({}, state.shops[existingShopIndex], shop);
            return _.assign({}, state, {
              shops: _.concat(
                _.slice(state.shops, 0, existingShopIndex),
                updatedShop,
                _.slice(state.shops, existingShopIndex + 1, state.shops.length)
              )
            });
          } else {
            return state;
          }
      }
    }
    case FeedActionTypes.GET_TOP_FEED_SLIDE_SHOW_SUCCESS:
    {
      return _.assign({}, state, {
        pinnedShops: response.shops
      })
    }
    case ItemActionTypes.GET_ITEM_CATEGORIES_SUCCESS:
      return _.merge({}, state, response);
    default:
      return state;
  }
};
