import * as OrderActionTypes from 'app/actions/order';
import _ from 'lodash';
import AsyncResultCode from 'app/shared/asyncResultCodes';
const INITIAL_STATE = {
  orders: [],
  orderResult: '',
  shouldUpdateOrderList: false
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
    default:
      return state;
  }
}
