import * as OrderActionTypes from 'app/actions/order';
import _ from 'lodash';
import AsyncResultCode from 'app/shared/asyncResultCodes';
const INITIAL_STATE = {
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
    default:
      return state;
  }
}