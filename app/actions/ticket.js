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

export const adminGetTickets = (status = '', page = 1, size = 10) => {
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

export const ADMIN_INVESTIGATE_TICKET_REQUEST = 'ADMIN_INVESTIGATE_TICKET_REQUEST';
export const ADMIN_INVESTIGATE_TICKET_SUCCESS = 'ADMIN_INVESTIGATE_TICKET_SUCCESS';
export const ADMIN_INVESTIGATE_TICKET_FAILURE = 'ADMIN_INVESTIGATE_TICKET_FAILURE';

const adminRequestInvestigateTicket = (ticketId) => ({
  [CALL_API]: {
    types: [ADMIN_INVESTIGATE_TICKET_REQUEST, ADMIN_INVESTIGATE_TICKET_SUCCESS, ADMIN_INVESTIGATE_TICKET_FAILURE],
    url: `/api/v1/admin/tickets/${ticketId}/investigate`,
    method: HTTP_METHODS.POST
  }
});

export const adminInvestigateTicket = (ticketId) => {
  return (dispatch) => {
    dispatch(adminRequestInvestigateTicket(ticketId));
  }
}

export const ADMIN_CLOSE_TICKET_REQUEST = 'ADMIN_CLOSE_TICKET_REQUEST';
export const ADMIN_CLOSE_TICKET_SUCCESS = 'ADMIN_CLOSE_TICKET_SUCCESS';
export const ADMIN_CLOSE_TICKET_FAILURE = 'ADMIN_CLOSE_TICKET_FAILURE';

const adminRequestCloseTicket = (ticketId, adminMessage) => ({
  [CALL_API]: {
    types: [ADMIN_CLOSE_TICKET_REQUEST, ADMIN_CLOSE_TICKET_SUCCESS, ADMIN_CLOSE_TICKET_FAILURE],
    url: `/api/v1/admin/tickets/${ticketId}/close`,
    method: HTTP_METHODS.POST,
    params: {
      adminComment: adminMessage
    }
  }
});

export const adminCloseTicket = (ticketId, adminMessage) => {
  return (dispatch) => {
    dispatch(adminRequestCloseTicket(ticketId, adminMessage));
  }
}

export const USER_GET_TICKETS_REQUEST = 'USER_GET_TICKETS_REQUEST';
export const USER_GET_TICKETS_SUCCESS = 'USER_GET_TICKETS_SUCCESS';
export const USER_GET_TICKETS_FAILURE = 'USER_GET_TICKETS_FAILURE';

const userRequestGetTickets = (status, page, size) => ({
  [CALL_API]: {
    types: [USER_GET_TICKETS_REQUEST, USER_GET_TICKETS_SUCCESS, USER_GET_TICKETS_FAILURE],
    url: `/api/v1/tickets/?status=${status}&size=${size}&page=${page}`,
    method: HTTP_METHODS.GET
  }
});

export const userGetTickets = (status = '', page = 1, size = 5) => {
  return (dispatch) => {
    dispatch(userRequestGetTickets(status, page, size));
  }
}

export const USER_REOPEN_TICKET_REQUEST = 'USER_REOPEN_TICKET_REQUEST';
export const USER_REOPEN_TICKET_SUCCESS = 'USER_REOPEN_TICKET_SUCCESS';
export const USER_REOPEN_TICKET_FAILURE = 'USER_REOPEN_TICKET_FAILURE';

const userRequestReopenTicket = (ticketId) => ({
  [CALL_API]: {
    types: [USER_REOPEN_TICKET_REQUEST, USER_REOPEN_TICKET_SUCCESS, USER_REOPEN_TICKET_FAILURE],
    url: `/api/v1/tickets/${ticketId}/reopen`,
    method: HTTP_METHODS.POST
  }
});

export const userReopenTicket = (ticketId) => {
  return (dispatch) => {
    dispatch(userRequestReopenTicket(ticketId));
  }
}

export const USER_CLOSE_TICKET_MODAL = 'USER_CLOSE_TICKET_MODAL';

export const userCloseTicketModal = () => ({
  type: USER_CLOSE_TICKET_MODAL
});
