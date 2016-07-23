import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const USER_OPEN_TICKET_REQUEST = 'USER_OPEN_TICKET_REQUEST';
export const USER_OPEN_TICKET_SUCCESS = 'USER_OPEN_TICKET_SUCESS';
export const USER_OPEN_TICKET_FAILURE = 'USER_OPEN_TICKET_FAILURE';

const userRequestOpenTicket = (orderId, message) => ({
  [CALL_API]: {
    types: [USER_OPEN_TICKET_REQUEST, USER_OPEN_TICKET_SUCCESS, USER_OPEN_TICKET_FAILURE],
    url: `/api/v1/orders/${orderId}/openTicket`,
    method: HTTP_METHODS.POST,
    params: {
      userNote: message
    }
  }
});

export const userOpenTicket = (orderId, message) => {
  return (dispatch) => {
    dispatch(userRequestOpenTicket(orderId, message));
  }
}

export const ADMIN_GET_TICKETS_REQUEST = 'ADMIN_GET_TICKETS_REQUEST';
export const ADMIN_GET_TICKETS_SUCCESS = 'ADMIN_GET_TICKETS_SUCCESS';
export const ADMIN_GET_TICKETS_FAILURE = 'ADMIN_GET_TICKETS_FAILURE';

const adminRequestGetTickets = (status, page, size)  => ({
  [CALL_API]: {
    types: [ADMIN_GET_TICKETS_REQUEST, ADMIN_GET_TICKETS_SUCCESS, ADMIN_GET_TICKETS_FAILURE],
    url: `/api/v1/admin/tickets?status=${status}&page=${page}&size=${size}`,
    method: HTTP_METHODS.GET
  }
});

export const adminGetTickets = (status = 'OPENING', page = 1, size = 10) => {
  return (dispatch) => {
    dispatch(adminRequestGetTickets(status, page, size));
  }
}


export const ADMIN_GET_TICKET_REQUEST = 'ADMIN_GET_TICKET_REQUEST';
export const ADMIN_GET_TICKET_SUCCESS = 'ADMIN_GET_TICKET_SUCCESS';
export const ADMIN_GET_TICKET_FAILURE = 'ADMIN_GET_TICKET_FAILURE';

const adminRequestGetTicket = (ticketId) => ({
  [CALL_API]: {
    types: [ADMIN_GET_TICKET_REQUEST, ADMIN_GET_TICKET_SUCCESS, ADMIN_GET_TICKET_FAILURE],
    url: `/api/v1/admin/tickets/${ticketId}`,
    method: HTTP_METHODS.GET
  }
});

export const adminGetTicket = (ticketId) => {
  return (dispatch) => {
    dispatch(adminRequestGetTicket(ticketId));
  }
}
