import * as OrderActionTypes from 'app/actions/order';
import _ from 'lodash';
import AsyncResultCode from 'app/shared/asyncResultCodes';
const INITIAL_STATE = {
  orders: [],
  orderResult: ''
};

export const order = (state = INITIAL_STATE, action) => {
  const { type } = action;
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
        orders: action.response.orders
      });
    case OrderActionTypes.SELLER_GET_ORDER_FAILURE:
      return _.merge({}, state, {
        orders: []
      });
    case OrderActionTypes.USER_GET_ORDER_SUCCESS:
      return _.assign({}, state, {
        orders: action.response.orders
      });
    case OrderActionTypes.USER_GET_ORDER_FAILURE:
      return _.assign({}, state, {
        orders: []
      });
    default:
      return state;
  }
}
