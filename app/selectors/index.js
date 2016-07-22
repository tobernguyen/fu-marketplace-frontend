import { createSelector } from 'reselect';
import _ from 'lodash';
import moment from 'moment';
require('moment-range');

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
const ordersStatisticSelector   = (state) => state.statistic.ordersStatistic;
const salesStatisticSelector    = (state) => state.statistic.salesStatistic;

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


const HOLDER = {
  completedOrders: 0,
  incompleteOrders: 0
};

const CHART_DATA_HOLDER = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(236, 240, 241,1.0)',
  borderColor: "rgba(75,192,192,1)",
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(127, 140, 141,1.0)',
  pointBackgroundColor: "#fff",
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: "rgba(75,192,192,1)",
  pointHoverBorderColor: 'rgba(41, 128, 185,1.0)',
  pointHoverBorderWidth: 2,
  pointRadius: 3,
  pointHitRadius: 10,
  spanGaps: false,
};

export const calculateOrdersStatisticData = createSelector(
  ordersStatisticSelector,
  (ordersStatistic) => {
    let calculatedData = {};

    var realData =_.keyBy(ordersStatistic.data, (o) => {
      return moment(`${o.day}/${o.month}/${o.year}`, 'DD/MM/YYYY').format('DD/MM/YYYY')
    });

    const today = moment();
    const last7Days   = moment().subtract(6, 'days');
    const range    = moment.range(last7Days, today);
    const momentArray = range.toArray('days');
    const dayArray = momentArray.map((moment) => {
      return moment.format('DD/MM/YYYY')
    });

    const fullWeekData = dayArray.map((day) => {
      let dayData;
      if (realData.hasOwnProperty(day)) {
        dayData = _.pick(realData[day], ['completedOrders', 'incompleteOrders'])
      } else {
        dayData = HOLDER;
      }
      return dayData;
    });

    const completedOrdersData = _.map(fullWeekData, (data) => {
      return data.completedOrders
    });
    const inCompletedOrdersData = _.map(fullWeekData, (data) => {
      return data.incompleteOrders
    });

    const completedOrdersDataSet = _.assign({}, CHART_DATA_HOLDER, {
      data: completedOrdersData,
      label: 'Completed orders',
      borderColor: 'rgba(39, 174, 96,1.0)'
    });

    const inCompletedOrdersDataSet = _.assign({}, CHART_DATA_HOLDER, {
      data: inCompletedOrdersData,
      label: 'In-completed orders',
      borderColor: 'rgba(192, 57, 43,1.0)'
    });

    calculatedData['labels'] = dayArray;
    calculatedData['datasets'] = [completedOrdersDataSet, inCompletedOrdersDataSet];

    return calculatedData
  }
);

export const calculateSalesStatisticSelector = createSelector(
  salesStatisticSelector,
  (salesStatistic) => {
    let calculatedData = {};

    var realData =_.keyBy(salesStatistic.data, (o) => {
      return moment(`${o.day}/${o.month}/${o.year}`, 'DD/MM/YYYY').format('DD/MM/YYYY')
    });

    const today = moment();
    const last7Days   = moment().subtract(6, 'days');
    const range    = moment.range(last7Days, today);
    const momentArray = range.toArray('days');
    const dayArray = momentArray.map((moment) => {
      return moment.format('DD/MM/YYYY')
    });

    const fullWeekData = dayArray.map((day) => {
      let dayData;
      if (realData.hasOwnProperty(day)) {
        dayData = realData[day]['totalSales']
      } else {
        dayData = 0;
      }
      return dayData;
    });

    calculatedData['labels'] = dayArray;
    calculatedData['datasets'] = [
      {
        label: 'Total sales',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        data: fullWeekData,
      }
    ];

    return calculatedData;
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
      return _.indexOf(['items', 'shipPlaces', 'seller', 'groupItems', 'ownerId'], key) === -1
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
