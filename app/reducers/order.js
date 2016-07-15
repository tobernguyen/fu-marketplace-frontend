import * as OrderActionTypes from '../actions/order';
import _ from 'lodash';
import AsyncResultCode from 'app/shared/asyncResultCodes';
const INITIAL_STATE = {
  orders: [],
  currentOrders: [],
  orderResult: '',
  shouldUpdateOrderList: false,
  hasMore: true
};

export const order = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch(type) {
    case OrderActionTypes.USER_PLACE_ORDER_REQUEST:
    case OrderActionTypes.CLEAR_ORDER_RESULT:
      return _.merge({}, state, {
        orderResult: ''
      });
    case OrderActionTypes.USER_PLACE_ORDER_SUCCESS:
      return _.merge({}, state, {
        orderResult: AsyncResultCode.PLACE_ORDER_SUCCESS
      });
    case OrderActionTypes.USER_PLACE_ORDER_FAILURE:
      return _.merge({}, state, {
        orderResult: AsyncResultCode.PLACE_ORDER_FAIL
      });
    case OrderActionTypes.SELLER_GET_ORDER_SUCCESS:
      return _.assign({}, state, {
        orders: action.response.orders,
        shouldUpdateOrderList: false
      });
    case OrderActionTypes.SELLER_GET_ORDER_FAILURE:
      return _.merge({}, state, {
        orders: [],
        shouldUpdateOrderList: false
      });
    case OrderActionTypes.SELLER_ACCEPT_ORDER_SUCCESS:
      return _.merge({}, state, {
        shouldUpdateOrderList: true
      });
    case OrderActionTypes.SELLER_REJECT_ORDER_SUCCESS:
      return _.merge({}, state, {
        shouldUpdateOrderList: true
      });
    case OrderActionTypes.SELLER_START_SHIPPING_ORDER_SUCCESS:
      return _.merge({}, state, {
        shouldUpdateOrderList: true
      });
    case OrderActionTypes.SELLER_COMPLETE_ORDER_SUCCESS:
      return _.merge({}, state, {
        shouldUpdateOrderList: true
      });
    case OrderActionTypes.SELLER_ABORT_ORDER_SUCCESS:
      return _.merge({}, state, {
        shouldUpdateOrderList: true
      });
    case OrderActionTypes.USER_GET_ORDER_SUCCESS:
      return _.assign({}, state, {
        orders: action.response.orders,
        shouldUpdateOrderList: false
      });
    case OrderActionTypes.USER_GET_ORDER_FAILURE:
      return _.assign({}, state, {
        orders: [],
        shouldUpdateOrderList: false
      });
    case OrderActionTypes.USER_CANCEL_ORDER_SUCCESS:
      return _.merge({}, state, {
        shouldUpdateOrderList: true
      });
    case OrderActionTypes.GET_ORDERS_OF_PAGE_SUCCESS:
    {
      const { orders } = response;
      return _.assign({}, state, {
        currentOrders: _.concat(state.currentOrders, orders),
        hasMore: orders.length !== 0
      });
    }
    case OrderActionTypes.CLEAR_CURRENT_ORDERS:
    {
      return _.assign({}, state, {
        currentOrders: INITIAL_STATE.currentOrders,
        hasMore: INITIAL_STATE.hasMore
      });
    }
    default:
      return state;
  }
};
