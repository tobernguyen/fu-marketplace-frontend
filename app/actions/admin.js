import { CALL_API, HTTP_METHODS } from '../middleware/api';

export const ADMIN_GET_USERS_REQUEST = 'ADMIN_GET_USERS_REQUEST';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_FAILURE = 'ADMIN_GET_USERS_FAILURE';
const adminRequestGetUsers = (filter) => ({
  [CALL_API]: {
    types: [ADMIN_GET_USERS_REQUEST, ADMIN_GET_USERS_SUCCESS, ADMIN_GET_USERS_FAILURE],
    url: `/api/v1/admin/users${filter}`,
    method: HTTP_METHODS.GET
  }
});

export const adminGetUsers = (page = 1, size = 10) => {
  const filter = `?page=${page}&size=${size}`
  return (dispatch) => {
    return dispatch(adminRequestGetUsers(filter));
  }
};

export const ADMIN_GET_USER_REQUEST = 'ADMIN_GET_USER_REQUEST';
export const ADMIN_GET_USER_SUCCESS = 'ADMIN_GET_USER_SUCCESS';
export const ADMIN_GET_USER_FAILURE = 'ADMIN_GET_USER_FAILURE';
export const adminRequestGetUser = (userId) => ({
  [CALL_API]: {
    types: [ADMIN_GET_USER_REQUEST, ADMIN_GET_USER_SUCCESS, ADMIN_GET_USER_FAILURE],
    url: `/api/v1/admin/users/${userId}`,
    method: HTTP_METHODS.GET
  }
});

export const adminGetUser = (userId) => {
  return (dispatch) => {
    return dispatch(adminRequestGetUser(userId));
  }
};

export const ADMIN_UPDATE_USER_INFORMATION_REQUEST = 'ADMIN_UPDATE_USER_INFORMATION_REQUEST';
export const ADMIN_UPDATE_USER_INFORMATION_SUCCESS = 'ADMIN_UPDATE_USER_INFORMATION_SUCCESS';
export const ADMIN_UPDATE_USER_INFORMATION_FAILURE = 'ADMIN_UPDATE_USER_INFORMATION_FAILURE';
const adminRequestUpdateUserInformation = (user) => ({
  [CALL_API]: {
    types: [
      ADMIN_UPDATE_USER_INFORMATION_REQUEST,
      ADMIN_UPDATE_USER_INFORMATION_SUCCESS,
      ADMIN_UPDATE_USER_INFORMATION_FAILURE
      ],
    url: `/api/v1/admin/users/${user.id}`,
    params: user,
    method: HTTP_METHODS.PUT
  }
});

export const adminUpdateUserInformation = (user) => {
  return (dispatch) => {
    return dispatch(adminRequestUpdateUserInformation(user));
  }
};


export const ADMIN_UPDATE_USER_ROLE_REQUEST = 'ADMIN_UPDATE_USER_ROLE_REQUEST';
export const ADMIN_UPDATE_USER_ROLE_SUCCESS = 'ADMIN_UPDATE_USER_ROLE_SUCCESS';
export const ADMIN_UPDATE_USER_ROLE_FAILURE = 'ADMIN_UPDATE_USER_ROLE_FAILURE';
const adminRequestUpdateUserRole = (userId, roles) => ({
  [CALL_API]: {
    types: [
      ADMIN_UPDATE_USER_ROLE_REQUEST,
      ADMIN_UPDATE_USER_ROLE_SUCCESS,
      ADMIN_UPDATE_USER_ROLE_FAILURE
    ],
    url: `/api/v1/admin/users/${userId}/setRoles`,
    params: roles,
    method: HTTP_METHODS.POST
  }
});

export const adminUpdateUserRole = (userId, roles) => {
  return (dispatch) => {
    return dispatch(adminRequestUpdateUserRole(userId, roles));
  }
}

export const ADMIN_BAN_USER_REQUEST = 'ADMIN_BAN_USER_REQUEST';
export const ADMIN_BAN_USER_SUCCESS = 'ADMIN_BAN_USER_SUCCESS';
export const ADMIN_BAN_USER_FAILURE = 'ADMIN_BAN_USER_FAILURE';
const adminRequestBanUser = (user) => ({
  [CALL_API]: {
    types: [
      ADMIN_BAN_USER_REQUEST,
      ADMIN_BAN_USER_SUCCESS,
      ADMIN_BAN_USER_FAILURE
    ],
    url: `/api/v1/admin/users/${user.id}`,
    params: {
      banned: true
    },
    method: HTTP_METHODS.PUT
  }
});

export const adminBanUser = (user) => {
  return (dispatch) => {
    return dispatch(adminRequestBanUser(user));
  }
};

export const ADMIN_UNBAN_USER_REQUEST = 'ADMIN_UNBAN_USER_REQUEST';
export const ADMIN_UNBAN_USER_SUCCESS = 'ADMIN_UNBAN_USER_SUCCESS';
export const ADMIN_UNBAN_USER_FAILURE = 'ADMIN_UNBAN_USER_FAILURE';
const adminRequestUnbanUser = (user) => ({
  [CALL_API]: {
    types: [
      ADMIN_UNBAN_USER_REQUEST,
      ADMIN_UNBAN_USER_SUCCESS,
      ADMIN_UNBAN_USER_FAILURE
    ],
    url: `/api/v1/admin/users/${user.id}`,
    params: {
      banned: false
    },
    method: HTTP_METHODS.PUT
  }
});

export const adminUnbanUser = (user) => {
  return (dispatch) => {
    return dispatch(adminRequestUnbanUser(user));
  }
};

export const ADMIN_GET_SHOPS_REQUEST = 'ADMIN_GET_SHOPS_REQUEST';
export const ADMIN_GET_SHOPS_SUCCESS = 'ADMIN_GET_SHOPS_SUCCESS';
export const ADMIN_GET_SHOPS_FAILURE = 'ADMIN_GET_SHOPS_FAILURE';
const adminRequestGetShops = (filter) => ({
  [CALL_API]: {
    types: [ADMIN_GET_SHOPS_REQUEST, ADMIN_GET_SHOPS_SUCCESS, ADMIN_GET_SHOPS_FAILURE],
    url: `/api/v1/admin/shops${filter}`,
    method: HTTP_METHODS.GET
  }
});

export const adminGetShops = (page = 1, size = 10) => {
  const filter = `?page=${page}&size=${size}`
  return (dispatch) => {
    return dispatch(adminRequestGetShops(filter));
  }
};

export const ADMIN_GET_SHOP_REQUEST = 'ADMIN_GET_SHOP_REQUEST';
export const ADMIN_GET_SHOP_SUCCESS = 'ADMIN_GET_SHOP_SUCCESS';
export const ADMIN_GET_SHOP_FAILURE = 'ADMIN_GET_SHOP_FAILURE';
const adminRequestGetShop = (shopId) => ({
  [CALL_API]: {
    types: [ADMIN_GET_SHOP_REQUEST, ADMIN_GET_SHOP_SUCCESS, ADMIN_GET_SHOP_FAILURE],
    url: `/api/v1/admin/shops/${shopId}`,
    method: HTTP_METHODS.GET
  }
});

export const adminGetShop = (shopId) => {
  return (dispatch) => {
    return dispatch(adminRequestGetShop(shopId));
  }
};

export const ADMIN_UPDATE_SHOP_INFORMATION_REQUEST = 'ADMIN_UPDATE_SHOP_INFORMATION_REQUEST';
export const ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS = 'ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS';
export const ADMIN_UPDATE_SHOP_INFORMATION_FAILURE = 'ADMIN_UPDATE_SHOP_INFORMATION_FAILURE';
const adminRequestUpdateShopInformation = (shopId, shop) => ({
  [CALL_API]: {
    types: [
      ADMIN_UPDATE_SHOP_INFORMATION_REQUEST,
      ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS,
      ADMIN_UPDATE_SHOP_INFORMATION_FAILURE
      ],
    url: `/api/v1/admin/shops/${shopId}`,
    params: shop,
    method: HTTP_METHODS.PUT
  }
});

export const adminUpdateShopInformation = (shopId, shop) => {
  return (dispatch) => {
    return dispatch(adminRequestUpdateShopInformation(shopId, shop));
  }
};

export const ADMIN_UPDATE_SHOP_SHIP_PLACES_REQUEST = 'ADMIN_UPDATE_SHOP_SHIP_PLACES_REQUEST';
export const ADMIN_UPDATE_SHOP_SHIP_PLACES_SUCCESS = 'ADMIN_UPDATE_SHOP_SHIP_PLACES_SUCCESS';
export const ADMIN_UPDATE_SHOP_SHIP_PLACES_FAILURE = 'ADMIN_UPDATE_SHOP_SHIP_PLACES_FAILURE';
const adminRequestUpdateShopShipPlaces = (shopId, shipPlaces) => ({
  [CALL_API]: {
    types: [ADMIN_UPDATE_SHOP_SHIP_PLACES_REQUEST, ADMIN_UPDATE_SHOP_SHIP_PLACES_SUCCESS, ADMIN_UPDATE_SHOP_SHIP_PLACES_FAILURE],
    url: `/api/v1/admin/shops/${shopId}/shipPlaces`,
    params: shipPlaces,
    method: HTTP_METHODS.POST
  }
});

export const adminUpdateShopShipPlaces = (shopId, shipPlaces) => {
  return (dispatch) => {
    return dispatch(adminRequestUpdateShopShipPlaces(shopId, shipPlaces));
  }
};

export const ADMIN_UPDATE_SHOP_AVATAR_REQUEST = 'ADMIN_UPDATE_SHOP_AVATAR_REQUEST';
export const ADMIN_UPDATE_SHOP_AVATAR_SUCCESS = 'ADMIN_UPDATE_SHOP_AVATAR_SUCCESS';
export const ADMIN_UPDATE_SHOP_AVATAR_FAILURE = 'ADMIN_UPDATE_SHOP_AVATAR_FAILURE';
const adminRequestUpdateShopAvatar = (shopId, formData) => ({
  [CALL_API]: {
    types: [ADMIN_UPDATE_SHOP_AVATAR_REQUEST, ADMIN_UPDATE_SHOP_AVATAR_SUCCESS, ADMIN_UPDATE_SHOP_AVATAR_FAILURE],
    url: `/api/v1/admin/shops/${shopId}/uploadAvatar`,
    params: formData,
    method: HTTP_METHODS.POST
  }
});

export const adminUpdateShopAvatar = (shopId, formData) =>{
  return (dispatch) => {
    return dispatch(adminRequestUpdateShopAvatar(shopId, formData));
  }
};

export const ADMIN_UPDATE_SHOP_COVER_REQUEST = 'ADMIN_UPDATE_SHOP_COVER_REQUEST';
export const ADMIN_UPDATE_SHOP_COVER_SUCCESS = 'ADMIN_UPDATE_SHOP_COVER_SUCCESS';
export const ADMIN_UPDATE_SHOP_COVER_FAILURE = 'ADMIN_UPDATE_SHOP_COVER_FAILURE';
const adminRequestUpdateShopCover = (shopId, formData) => ({
  [CALL_API]: {
    types: [ADMIN_UPDATE_SHOP_AVATAR_REQUEST, ADMIN_UPDATE_SHOP_AVATAR_SUCCESS, ADMIN_UPDATE_SHOP_AVATAR_FAILURE],
    url: `/api/v1/admin/shops/${shopId}/uploadCover`,
    params: formData,
    method: HTTP_METHODS.POST
  }
});

export const adminUpdateShopCover = (shopId, formData) =>{
  return (dispatch) => {
    return dispatch(adminRequestUpdateShopCover(shopId, formData));
  }
};

export const ADMIN_BAN_SHOP_REQUEST = 'ADMIN_BAN_SHOP_REQUEST';
export const ADMIN_BAN_SHOP_SUCCESS = 'ADMIN_BAN_SHOP_SUCCESS';
export const ADMIN_BAN_SHOP_FAILURE = 'ADMIN_BAN_SHOP_FAILURE';
const adminRequestBanShop = (shopId) => ({
  [CALL_API]: {
    types: [
      ADMIN_BAN_SHOP_REQUEST,
      ADMIN_BAN_SHOP_SUCCESS,
      ADMIN_BAN_SHOP_FAILURE
    ],
    url: `/api/v1/admin/shops/${shopId}`,
    params: {
      banned: true
    },
    method: HTTP_METHODS.PUT
  }
});

export const adminBanShop = (shopId) => {
  return (dispatch) => {
    return dispatch(adminRequestBanShop(shopId));
  }
};

export const ADMIN_UNBAN_SHOP_REQUEST = 'ADMIN_UNBAN_SHOP_REQUEST';
export const ADMIN_UNBAN_SHOP_SUCCESS = 'ADMIN_UNBAN_SHOP_SUCCESS';
export const ADMIN_UNBAN_SHOP_FAILURE = 'ADMIN_UNBAN_SHOP_FAILURE';
const adminRequestUnbanShop = (shopId) => ({
  [CALL_API]: {
    types: [
      ADMIN_UNBAN_SHOP_REQUEST,
      ADMIN_UNBAN_SHOP_SUCCESS,
      ADMIN_UNBAN_SHOP_FAILURE
    ],
    url: `/api/v1/admin/shops/${shopId}`,
    params: {
      banned: false
    },
    method: HTTP_METHODS.PUT
  }
});

export const adminUnbanShop = (shopId) => {
  return (dispatch) => {
    return dispatch(adminRequestUnbanShop(shopId));
  }
};

export const ADMIN_GET_REQUESTS_REQUEST = 'ADMIN_GET_REQUESTS_REQUEST';
export const ADMIN_GET_REQUESTS_SUCCESS = 'ADMIN_GET_REQUESTS_SUCCESS';
export const ADMIN_GET_REQUESTS_FAILURE = 'ADMIN_GET_REQUESTS_FAILURE';
const adminRequestGetRequests = (filter) => ({
  [CALL_API]: {
    types: [
      ADMIN_GET_REQUESTS_REQUEST,
      ADMIN_GET_REQUESTS_SUCCESS,
      ADMIN_GET_REQUESTS_FAILURE
    ],
    url: `/api/v1/admin/shopOpeningRequests${filter}`,
    method: HTTP_METHODS.GET
  }
});

export const adminGetRequests = (page = 1, size = 10, showAll = true) => {
  const filter = `?size=${size}&page=${page}&showAll=${showAll}`;
  return (dispatch) => {
    return dispatch(adminRequestGetRequests(filter));
  }
};

export const ADMIN_ACCEPT_REQUEST_REQUEST = 'ADMIN_ACCEPT_REQUEST_REQUEST';
export const ADMIN_ACCEPT_REQUEST_SUCCESS = 'ADMIN_ACCEPT_REQUEST_SUCCESS';
export const ADMIN_ACCEPT_REQUEST_FAILURE = 'ADMIN_ACCEPT_REQUEST_FAILURE';
const adminRequestAcceptRequest = (requestId, message) => ({
  [CALL_API]: {
    types: [
      ADMIN_ACCEPT_REQUEST_REQUEST,
      ADMIN_ACCEPT_REQUEST_SUCCESS,
      ADMIN_ACCEPT_REQUEST_FAILURE
    ],
    url: `/api/v1/admin/shopOpeningRequests/${requestId}/accept`,
    params: {
      message
    },
    method: HTTP_METHODS.POST
  }
});

export const adminAcceptRequest = (requestId, message) => {
  return (dispatch) => {
    return dispatch(adminRequestAcceptRequest(requestId, message));
  }
};

export const ADMIN_REJECT_REQUEST_REQUEST = 'ADMIN_REJECT_REQUEST_REQUEST';
export const ADMIN_REJECT_REQUEST_SUCCESS = 'ADMIN_REJECT_REQUEST_SUCCESS';
export const ADMIN_REJECT_REQUEST_FAILURE = 'ADMIN_REJECT_REQUEST_FAILURE';
const adminRequestRejectRequest = (requestId, message) => ({
  [CALL_API]: {
    types: [
      ADMIN_REJECT_REQUEST_REQUEST,
      ADMIN_REJECT_REQUEST_SUCCESS,
      ADMIN_REJECT_REQUEST_FAILURE
    ],
    url: `/api/v1/admin/shopOpeningRequests/${requestId}/reject`,
    params: {
      message
    },
    method: HTTP_METHODS.POST
  }
});

export const adminRejectRequest = (requestId, message) => {
  return (dispatch) => {
    return dispatch(adminRequestRejectRequest(requestId, message));
  }
};

export const ADMIN_CHANGE_PASSWORD_REQUEST = 'ADMIN_CHANGE_PASSWORD_REQUEST';
export const ADMIN_CHANGE_PASSWORD_SUCCESS = 'ADMIN_CHANGE_PASSWORD_SUCCESS';
export const ADMIN_CHANGE_PASSWORD_FAILURE = 'ADMIN_CHANGE_PASSWORD_FAILURE';

const adminRequestChangePassword = (passwordToBeChanged) => ({
  [CALL_API]: {
    types: [ADMIN_CHANGE_PASSWORD_REQUEST, ADMIN_CHANGE_PASSWORD_SUCCESS, ADMIN_CHANGE_PASSWORD_FAILURE],
    url: '/api/v1/admin/changePassword',
    method: HTTP_METHODS.POST,
    params: passwordToBeChanged
  }
});

export const adminChangePassword = (passwordToBeChanged) => {
  return (dispatch) => {
    return dispatch(adminRequestChangePassword(passwordToBeChanged))
  }
};
