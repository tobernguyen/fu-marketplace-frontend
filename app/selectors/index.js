import { createSelector } from 'reselect';
import _ from 'lodash';

const categoriesSelector        = (state) => state.common.categories;
const shipPlacesSelector        = (state) => state.common.shipPlaces;
const currentUserSelector       = (state) => state.user.currentUser;
const shopsFeedSelector         = (state) => state.feed.shops;
const aggregationsSelector      = (state) => state.feed.aggregations;
const totalShopSelector         = (state) => state.feed.total;
const pinnedShopsSelector       = (state) => state.feed.pinnedShops;
const currentViewedShopSelector = (state) => state.user.currentViewedShop;
const sellerShopSelector        = (state) => state.shop.sellerShop;
const notificationsSelector     = (state) => state.notification.notifications;

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

export const getPinnedShops = createSelector(
  pinnedShopsSelector,
  (shops) => {
    return shops
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

export const getAggregations = createSelector(
  [aggregationsSelector, totalShopSelector],
  (aggregations, total) => {
    let { category, shipPlace } = aggregations;
    category = _.mapValues(_.keyBy(category, 'key'), 'doc_count');
    shipPlace = _.mapValues(_.keyBy(shipPlace, 'key'), 'doc_count');
    return {
      category,
      shipPlace,
      total
    }
  }
);

export const getCurrentViewedShop = createSelector(
  currentViewedShopSelector,
  (currentViewedShop) => {
    const shopInfo = _.pickBy(currentViewedShop, (value, key) => {
      return _.indexOf(['items', 'shipPlaces', 'seller', 'groupItems'], key) === -1
    });
    const seller = _.get(currentViewedShop, 'seller');
    const sellingItems = _.get(currentViewedShop, 'groupItems');

    return {
      shopInfo: shopInfo,
      seller: seller || {},
      sellingItems: sellingItems || {},
      reviews: currentViewedShop.reviews || []
    };
  }
);

export const getHashCategories = createSelector(
  categoriesSelector,
  (categories) => {
    return _.mapValues(_.keyBy(categories, 'id'), 'name')
  }
);

export const getSellerShopShipPlaces = createSelector(
  [shipPlacesSelector, sellerShopSelector],
  (shipPlaces, sellerShop) => {
    const shopShipPlaces = sellerShop.shipPlaces || [];
    let arrayShipPlaces = _.map(shipPlaces, (place) => {
      if (shopShipPlaces.indexOf(place.id) === -1) {
        place.checked = false;
      } else {
        place.checked = true;
      }
      return place;
    });
    return arrayShipPlaces;
  }
);

export const getOwnNotifications = createSelector(
  notificationsSelector,
  (notifications) => {
    return notifications
  }
);
