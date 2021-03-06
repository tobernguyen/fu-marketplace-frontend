import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const STATISTIC_TYPE = {
  SALES: 'salesStatistic',
  ORDERS: 'ordersStatistic',
  ITEM_SOLD: 'itemSoldStatistic'
};

export const GET_SHOP_STATISTIC_REQUEST = 'GET_SHOP_STATISTIC_REQUEST';
export const GET_SHOP_STATISTIC_SUCCESS = 'GET_SHOP_STATISTIC_SUCCESS';
export const GET_SHOP_STATISTIC_FAILURE = 'GET_SHOP_STATISTIC_FAILURE';
const requestGetShopStatistics = (shopID, type) => ({
  [CALL_API]: {
    types: [GET_SHOP_STATISTIC_REQUEST, GET_SHOP_STATISTIC_SUCCESS, GET_SHOP_STATISTIC_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/${type}`,
    method: HTTP_METHODS.GET
  }
});

export const getShopStatistics = (shopID, type) => {
  return (dispatch) => {
    return dispatch(requestGetShopStatistics(shopID, type))
  }
};

export const CLEAR_STATISTICS = 'CLEAR_STATISTICS';
export const clearStatistics = () => ({
  type: CLEAR_STATISTICS
});
