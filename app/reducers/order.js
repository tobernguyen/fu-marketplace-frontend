import * as OrderActionTypes from 'app/actions/order';
import _ from 'lodash';

const INITIAL_STATE = {
  expressOrderResult: ''
};

export const order = (state = INITIAL_STATE, action) => {
  const { type, response } = action;
  switch(type) {
    case OrderActionTypes.USER_PLACE_ORDER_REQUEST:
    case OrderActionTypes.CLEAR_ORDER_RESULT:
      return _.merge({}, state, {
        expressOrderResult: ''
      });
    case OrderActionTypes.USER_PLACE_ORDER_SUCCESS:
      return _.merge({}, state, {
        expressOrderResult: 'SUCCESS'
      });
    case OrderActionTypes.USER_PLACE_ORDER_FAILURE:
      console.log(response);
      return _.merge({}, state, {
        expressOrderResult: 'FAIL'
      });
    default:
      return state;
  }
}