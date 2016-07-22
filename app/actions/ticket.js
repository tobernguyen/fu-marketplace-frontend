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
