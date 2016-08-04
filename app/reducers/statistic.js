import _ from 'lodash';
import * as StatisticActionTypes from '../actions/statistic';

const INITIAL_STATISTIC_DATA = {
  updatedAt: null,
  data: []

};
const INITIAL_STATE = {
  ordersStatistic: INITIAL_STATISTIC_DATA,
  salesStatistic: INITIAL_STATISTIC_DATA,
  itemSoldStatistic: INITIAL_STATISTIC_DATA,
  fetchingData: false
};

export const statistic = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch (type) {
    case StatisticActionTypes.GET_SHOP_STATISTIC_SUCCESS:
      return _.merge({}, state, _.assign({}, response, {
        fetchingData: false
      }));
    case StatisticActionTypes.GET_SHOP_STATISTIC_FAILURE:
      return _.merge({}, state, {
        fetchingData: false
      });
    case StatisticActionTypes.GET_SHOP_STATISTIC_REQUEST:
      return _.merge({}, state, {
        fetchingData: true
      });
    case StatisticActionTypes.CLEAR_STATISTICS:
      return _.assign({}, state, INITIAL_STATE);
    default:
      return state;
  }
};
