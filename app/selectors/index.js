import { createSelector } from 'reselect';
import _ from 'lodash';

const categoriesSelector  = (state) => state.common.categories;
const shipPlacesSelector  = (state) => state.common.shipPlaces;
const currentUserSelector = (state) => state.user.currentUser;
const shopsFeedSelector   = (state) => state.feed.shops;

export const getCategories = createSelector(
  categoriesSelector,
  (categories) => {
    return categories
  }
);

export const getShipPlaces = createSelector(
  shipPlacesSelector,
  (shipPlaces) => {
    return shipPlaces
  }
);

export const getUser = createSelector(
  currentUserSelector,
  (currentUser) => {
    return currentUser
  }
);

export const getShopsFeed = createSelector(
  [ shopsFeedSelector, categoriesSelector, shipPlacesSelector ],
  (shops, categories, shipPlaces) => {
    let newShops = shops;
    // Append categories
    _.map(newShops, (shop) => {
      if (categories.length > 0) {
        shop.categories = _.map(shop.categoryIds, (categoryID) =>
          _.find(categories, { 'id': categoryID})
        )
      } else {
        shop.categories = []
      }
    });
    // Append ship places
    _.map(newShops, (shop) => {
      if (shipPlaces.length > 0) {
        shop.shipPlaces = _.map(shop.shipPlaceIds, (shipPlaceID) =>
          _.find(shipPlaces, { 'id': shipPlaceID})
        )
      } else {
        shop.shipPlaces = []
      }
    });

    // Remove categoryIDs and shipPlaceIds key and return
    return _.map(newShops, (shop) => {
      return _.omit(shop, [ 'categoryIds', 'shipPlaceIds' ])
    });
  }
);
