import * as TicketActionTypes from '../actions/ticket';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import _ from 'lodash';

const INITIAL_STATE = {
  isFetching: false,
  tickets: [],
  isSubmitting: false,
  submitResult: ''
}


export const ticket = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TicketActionTypes.USER_OPEN_TICKET_REQUEST:
      return _.merge({}, state, {
        isSubmitting: true,
        submitResult: ''
      });
    case TicketActionTypes.USER_OPEN_TICKET_SUCCESS:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: AsyncResultCode.OPEN_TICKET_SUCCESS
      });
    case TicketActionTypes.USER_OPEN_TICKET_FAILURE:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: AsyncResultCode.OPEN_TICKET_FAILURE
      });
    case TicketActionTypes.ADMIN_GET_TICKET_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
        tickets: []
      });
    case TicketActionTypes.ADMIN_GET_TICKET_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        tickets: action.response.tickets
      });
    case TicketActionTypes.ADMIN_GET_TICKET_FAILURE:
      return _.merge({}, state, {
        isFetching: false,
        tickets: []
      });
    default:
      return state;
  }
}
