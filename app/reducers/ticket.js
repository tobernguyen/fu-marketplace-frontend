import * as TicketActionTypes from '../actions/ticket';
import * as AdminActionTypes from '../actions/admin';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import _ from 'lodash';

const LOST_CONNECTION = {
  status: 404,
  message_code: AsyncResultCode.UNKNOWN_ERROR
};


const INITIAL_STATE = {
  isFetching: false,
  isFetchingNextPage: false,
  tickets: [],
  nextPageTickets: [],
  hasNextPage: false,
  isSubmitting: false,
  submitResult: '',
  selectedTicket: {},
  selectedShop: {},
  isFetchingShop: false,
  selectedUser: {},
  isFetchingUser: false,
  shouldUpdateTicketList: false
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
    case TicketActionTypes.ADMIN_GET_TICKETS_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
        tickets: []
      });
    case TicketActionTypes.ADMIN_GET_TICKETS_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        tickets: action.response.tickets
      });
    case TicketActionTypes.ADMIN_GET_TICKETS_FAILURE:
      return _.merge({}, state, {
        isFetching: false,
        tickets: []
      });
    case TicketActionTypes.ADMIN_GET_TICKET_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
        isFetchingShop: true,
        isFetchingUser: true
      });
    case TicketActionTypes.ADMIN_GET_TICKET_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        selectedTicket: action.response
      });
    case TicketActionTypes.ADMIN_GET_TICKET_FAILURE:
      return _.merge({}, state, {
        isFetching: false,
        selectedTicket: {}
      });
    case AdminActionTypes.ADMIN_GET_SHOP_REQUEST:
      return _.merge({}, state, {
        isFetchingShop: true,
        selectedShop: {}
      });
    case AdminActionTypes.ADMIN_GET_SHOP_SUCCESS:
      return _.merge({}, state, {
        isFetchingShop: false,
        selectedShop: action.response
      });
    case AdminActionTypes.ADMIN_GET_SHOP_FAILURE:
      return _.merge({}, state, {
        isFetchingShop: false,
        selectedShop: {}
      });
    case AdminActionTypes.ADMIN_GET_USER_REQUEST:
      return _.merge({}, state, {
        isFetchingUser: true,
        selectedUser: {}
      });
    case AdminActionTypes.ADMIN_GET_USER_SUCCESS:
      return _.merge({}, state, {
        isFetchingUser: false,
        selectedUser: action.response
      });
    case AdminActionTypes.ADMIN_GET_USER_FAILURE:
      return _.merge({}, state, {
        isFetchingUser: false,
        selectedUser: {}
      });
    case TicketActionTypes.ADMIN_INVESTIGATE_TICKET_REQUEST:
      return _.merge({}, state,{
        isSubmitting: true
      });
    case TicketActionTypes.ADMIN_INVESTIGATE_TICKET_SUCCESS:
      return _.merge({}, state, {
        isSubmitting: false,
        selectedTicket: action.response,
        submitResult: {
          status: 200,
          message_code: AsyncResultCode.INVESTIGATING_TICKET_SUCCESS
        }
      });
    case TicketActionTypes.ADMIN_INVESTIGATE_TICKET_FAILURE:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: action.error || action.errors || LOST_CONNECTION
      });
    case TicketActionTypes.ADMIN_CLOSE_TICKET_REQUEST:
      return _.merge({}, state, {
        isSubmitting: true
      });
    case TicketActionTypes.ADMIN_CLOSE_TICKET_SUCCESS:
      return _.merge({}, state, {
        isSubmitting: false,
        selectedTicket: action.response,
        submitResult: {
          status: 200,
          submitResult: AsyncResultCode.CLOSE_TICKET_SUCCESS
        }
      });
    case TicketActionTypes.ADMIN_CLOSE_TICKET_FAILURE:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: action.error || LOST_CONNECTION
      });
    case TicketActionTypes.USER_GET_TICKETS_REQUEST:
      return _.assign({}, state, {
        tickets: [],
        shouldUpdateTicketList: false,
        isFetching: true
      });
    case TicketActionTypes.USER_GET_TICKETS_SUCCESS:
      return _.assign({}, state, {
        tickets: action.response.tickets,
        isFetching: false
      });
    case TicketActionTypes.USER_GET_NEXT_PAGE_TICKETS_REQUEST:
      return _.assign({}, state, {
        isFetchingNextPage: true,
        hasNextPage: false,
        nextPageTickets: []
      });
    case TicketActionTypes.USER_GET_NEXT_PAGE_TICKETS_SUCCESS:
      return _.assign({}, state, {
        isFetchingNextPage: false,
        hasNextPage: action.response.tickets.length > 0,
        nextPageTickets: action.response.tickets
      });
    case TicketActionTypes.USER_GET_TICKETS_FAILURE:
     return _.assign({}, state, {
       tickets: [],
       isFetching: false,
     });
    case TicketActionTypes.USER_REOPEN_TICKET_REQUEST:
      return _.merge({}, state, {
        isSubmitting: true
      });
    case TicketActionTypes.USER_REOPEN_TICKET_SUCCESS:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: AsyncResultCode.REOPEN_TICKET_SUCCESS
      });
    case TicketActionTypes.USER_REOPEN_TICKET_FAILURE:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: AsyncResultCode.REOPEN_TICKET_FAIL
      });
    case TicketActionTypes.USER_CLOSE_TICKET_REQUEST:
      return _.merge({}, state, {
        isSubmitting: true
      });
    case TicketActionTypes.USER_CLOSE_TICKET_SUCCESS:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: AsyncResultCode.CLOSE_TICKET_SUCCESS
      });
    case TicketActionTypes.USER_CLOSE_TICKET_FAILURE:
      return _.merge({}, state, {
        isSubmitting: false,
        submitResult: AsyncResultCode.REOPEN_TICKET_FAIL
      });
    case TicketActionTypes.USER_CLOSE_TICKET_MODAL:
    case TicketActionTypes.USER_CLOSE_NEW_TICKET_MODAL:
      return _.merge({}, state, {
        submitResult: '',
        isSubmitting: false,
        isFetching: false,
        shouldUpdateTicketList: true
      });
    case TicketActionTypes.ADMIN_SELECT_TICKET:
      return _.merge({}, state,{
        selectedTicket: action.payload
      });
    default:
      return state;
  }
}
