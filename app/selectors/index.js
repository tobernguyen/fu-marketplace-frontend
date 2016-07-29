import { createSelector } from 'reselect';
import _ from 'lodash';
import randomcolor from 'randomcolor';
import moment from 'moment';
require('moment-range');
require('frozen-moment');

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
const itemSoldStatisticSelector = (state) => state.statistic.itemSoldStatistic;

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
  borderColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(127, 140, 141,1.0)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(41, 128, 185,1.0)',
  pointHoverBorderWidth: 2,
  pointRadius: 3,
  pointHitRadius: 10,
  spanGaps: false
};

export const calculateOrdersStatisticData = createSelector(
  ordersStatisticSelector,
  (ordersStatistic) => {
    let calculatedData = {};

    var realData =_.keyBy(ordersStatistic.data, (o) => {
      return moment(`${o.day}/${o.month}/${o.year}`, 'DD/MM/YYYY').format('DD/MM/YYYY')
    });

    const today = moment();
    const last7Days   = today.clone().subtract(6, 'days');

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

    calculatedData['updatedAt'] = ordersStatistic['updatedAt'];

    return calculatedData
  }
);

export const calculateSalesStatistic = createSelector(
  salesStatisticSelector,
  (salesStatistic) => {
    let calculatedData = {};

    var realData =_.keyBy(salesStatistic.data, (o) => {
      return moment(`${o.day}/${o.month}/${o.year}`, 'DD/MM/YYYY').format('DD/MM/YYYY')
    });

    const today = moment();
    const last7Days   = today.clone().subtract(6, 'days');

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
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: fullWeekData
      }
    ];
    calculatedData['updatedAt'] = salesStatistic['updatedAt'];

    return calculatedData;
  }
);

export const calculateItemSoldStatistic = createSelector(
  [itemSoldStatisticSelector, categoriesSelector],
  (itemSoldStatistic, categories) => {
    let calculatedData = {};

    var realData =_.keyBy(itemSoldStatistic.data, (o) => {
      return moment(`${o.day}/${o.month}/${o.year}`, 'DD/MM/YYYY').format('DD/MM/YYYY')
    });

    const today = moment();
    const last7Days   = today.clone().subtract(6, 'days');

    const range    = moment.range(last7Days, today);
    const momentArray = range.toArray('days');
    const dayArray = momentArray.map((moment) => {
      return moment.format('DD/MM/YYYY')
    });

    const allCategoryIDs = _.uniq(_.flatten(_.map(itemSoldStatistic.data, (data) => {
      return _.keys(data.itemSold)
    })));

    const categoriesHash = _.keyBy(categories, 'id');
    const categoryLabels = allCategoryIDs.map((categoryID) => {
      return categoriesHash[categoryID]
    });

    const itemSoldDataHolder = _.fill(Array(7), 0);
    let itemSoldData = {};

    _.forEach(realData, (value, key) => {
      const indexToFill = _.indexOf(dayArray, key);
      if (indexToFill > -1) {
        const { itemSold } = value;
        _.forEach(itemSold, (value, key) => {
          itemSoldData[key] = _.concat(
            _.slice(itemSoldDataHolder, 0, indexToFill),
            value,
            _.slice(itemSoldDataHolder, indexToFill + 1, itemSoldDataHolder.length)
          );
        })
      }
    });

    const dataSets = _.fill(Array(allCategoryIDs.length), CHART_DATA_HOLDER).map((data, index) => {
      return _.merge({}, data, {
        label: categoryLabels[index]['name'],
        data: itemSoldData[categoryLabels[index]['id']] || itemSoldDataHolder,
        backgroundColor: randomcolor({
          seed: `${categoryLabels[index]['id'] * 26}_${categoryLabels[index]['name']}`
        })
      })
    });

    calculatedData['datasets'] = dataSets;
    calculatedData['labels'] = dayArray;
    calculatedData['updatedAt'] = itemSoldStatistic['updatedAt'];

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
      return _.indexOf(['items', 'shipPlaces', 'seller', 'groupItems'], key) === -1
    });
    const seller = _.get(currentViewedShop, 'seller');
    let sellingItems = _.get(currentViewedShop, 'groupItems');
    const allItems = _.get(currentViewedShop, 'allItems');
    if (sellingItems && allItems) {
      sellingItems[0] = allItems
    }

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
