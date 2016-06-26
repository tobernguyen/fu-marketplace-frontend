import * as FeedActionTypes from '../actions/feed';
import * as ItemActionTypes from '../actions/item';
import _ from 'lodash';

const INITIAL_STATE = {
  shops: [],
  categories: []
};

export const feed = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch (type) {
    case FeedActionTypes.GET_SHOPS_SUCCESS:
      const { result } = response;

      let shops = result.shops;
      if (state.categories.length > 0) {
        _.map(shops, (shop) => {
          shop.categories = _.map(shop.categoryIds, (categoryID) => {
            return _.find(state.categories, { 'id': categoryID });
          })
        });
      } else {
        shops.categories = []
      }

      return _.merge({}, state, {
        shops: shops || []
      });
    case ItemActionTypes.GET_ITEM_CATEGORIES_SUCCESS:
      return _.merge({}, state, response);
    default:
      return state;
  }
};
