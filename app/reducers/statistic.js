import _ from 'lodash';
import * as StatisticActionTypes from '../actions/statistic';

const INITIAL_STATISTIC_DATA = {
  updatedAt: null,
  data: []
};
const INITIAL_STATE = {
  ordersStatistic: INITIAL_STATISTIC_DATA,
  salesStatistic: INITIAL_STATISTIC_DATA,
  itemSoldStatistic: INITIAL_STATISTIC_DATA
};

export const statistic = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch (type) {
    case StatisticActionTypes.GET_SHOP_STATISTIC_SUCCESS:
      return _.merge({}, state, response);
    default:
      return state;
  }
};
