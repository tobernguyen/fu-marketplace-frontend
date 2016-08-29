import * as OrderActionTypes from '../actions/order';
import _ from 'lodash';
import AsyncResultCode from 'app/shared/asyncResultCodes';
const INITIAL_STATE = {
  isFetchingNextPage: false,
  isFetching: false,
  orders: [],
  nextPageOrders: [],
  currentOrders: [],
  isSubmitting: false,
  orderResult: '',
  shouldUpdateOrderList: false,
  hasMore: true,
  hasNextPage: false,
  ticket: {
    isSubmitting: false,
    submitResult: ''
  }
};

export const order = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch(type) {
    case OrderActionTypes.CLEAR_ORDER_RESULT:
      return _.merge({}, state, {
        orderResult: ''
      });
    case OrderActionTypes.USER_PLACE_ORDER_REQUEST:
      return _.merge({}, state, {
        isSubmitting: true,
        orderResult: ''
      });
    case OrderActionTypes.USER_PLACE_ORDER_SUCCESS:
      return _.merge({}, state, {
        isSubmitting: false,
        orderResult: AsyncResultCode.PLACE_ORDER_SUCCESS
      });
    case OrderActionTypes.USER_PLACE_ORDER_FAILURE:
      return _.merge({}, state, {
        isSubmitting: false,
        orderResult: AsyncResultCode.PLACE_ORDER_FAIL
      });
    case OrderActionTypes.SELLER_GET_ORDER_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
        shouldUpdateOrderList: false
      });
    case OrderActionTypes.SELLER_GET_ORDER_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        orders: action.response.orders
      });
    case OrderActionTypes.SELLER_GET_ORDER_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        orders: []
      });
    case OrderActionTypes.SELLER_GET_ORDER_OF_NEXT_PAGE_REQUEST:
      return _.assign({}, state, {
        hasNextPage: false,
        isFetchingNextPage: true,
        nextPageOrders: []
      });
    case OrderActionTypes.SELLER_GET_ORDER_OF_NEXT_PAGE_SUCCESS:
      return _.assign({}, state, {
        hasNextPage: action.response.orders.length > 0,
        nextPageOrders: action.response.orders,
        isFetchingNextPage: false
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
    case OrderActionTypes.USER_GET_ORDER_REQUEST:
      return _.merge({}, state, {
        shouldUpdateOrderList: false,
        isFetching: true
      });
    case OrderActionTypes.USER_GET_ORDER_SUCCESS:
      return _.assign({}, state, {
        orders: action.response.orders,
        isFetching: false
      });
    case OrderActionTypes.USER_GET_ORDER_FAILURE:
      return _.assign({}, state, {
        orders: [],
        isFetching: false,
        hasNextPage: false
      });
    case OrderActionTypes.USER_GET_ORDER_OF_NEXT_PAGE_REQUEST:
      return _.assign({}, state, {
        isFetchingNextPage: true
      });
    case OrderActionTypes.USER_GET_ORDER_OF_NEXT_PAGE_SUCCESS:
      const hasNextPage = action.response.orders.length > 0;
      return _.assign({}, state, {
        nextPageOrders: action.response.orders,
        hasNextPage,
        isFetchingNextPage: false
      });
    case OrderActionTypes.USER_NEXT_PAGE_ORDER:
    case OrderActionTypes.SELLER_NEXT_PAGE_ORDER:
      const newState = state;
      newState.orders = newState.nextPageOrders;
      return _.assign({}, state, newState);
    case OrderActionTypes.USER_CANCEL_ORDER_SUCCESS:
      return _.merge({}, state, {
        shouldUpdateOrderList: true
      });
    case OrderActionTypes.GET_ORDERS_OF_PAGE_REQUEST:
    {
      const { isFetching } = state;
      if(!isFetching) {
        return _.merge({}, state, {
          isFetching: true
        });
      }
      return state;
    }
    case OrderActionTypes.GET_ORDERS_OF_PAGE_SUCCESS:
    {
      const { orders } = response;
      return _.assign({}, state, {
        isFetching: false,
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
    case OrderActionTypes.UPDATE_ORDER_STATUS:
    {
      const { currentOrders } = state;
      const { payload: { orderId, status } } = action;
      const index = _.findIndex(currentOrders, (order) => {
        return order.id == orderId
      });
      const targetOrder = currentOrders[index];
      targetOrder.status = status;
      currentOrders.splice(index, 1, targetOrder);
      return _.merge({}, state, {
        currentOrders
      });
    }
    case OrderActionTypes.REMOVE_ORDER:
    {
      const { currentOrders } = state;
      const { payload } = action;
      const updatedCurrentOrders = _.remove(currentOrders, (order) => {
        return order.id != payload
      });
      return _.assign({}, state, {
        currentOrders: updatedCurrentOrders
      });
    }
    case OrderActionTypes.SELLER_GET_NEW_ORDER_SUCCESS:
    {
      const { currentOrders } = state;
      const { response } = action;
      const updatedCurrentOrders = _.concat(currentOrders, response);
      return _.merge({}, state, {
        currentOrders: updatedCurrentOrders
      });
    }
    case OrderActionTypes.CHANGE_ORDER_STATUS:
    {
      const { orders } = state;
      const { payload: { orderId, status } } = action;
      const index = _.findIndex(orders, (order) => {
        return order.id == orderId
      });
      const targetOrder = orders[index];
      targetOrder.status = status;
      orders.splice(index, 1, targetOrder);
      return _.merge({}, state, {
        orders
      });
    }
    default:
      return state;
  }
};
