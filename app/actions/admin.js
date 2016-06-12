import { CALL_API, HTTP_METHODS } from '../middleware/api';
import { accessTokenKey, adminAccessTokenKey } from 'app/config';

export const ADMIN_GET_USERS_REQUEST = 'ADMIN_GET_USERS_REQUEST';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_FAILURE = 'ADMIN_GET_USERS_FAILURE';
export const adminGetUsers = () => ({
  [CALL_API]: {
    types: [ADMIN_GET_USERS_REQUEST, ADMIN_GET_USERS_SUCCESS, ADMIN_GET_USERS_FAILURE],
    url: '/api/v1/admin/users',
    method: HTTP_METHODS.GET
  }
});

export const ADMIN_GET_USER_REQUEST = 'ADMIN_GET_USER_REQUEST';
export const ADMIN_GET_USER_SUCCESS = 'ADMIN_GET_USER_SUCCESS';
export const ADMIN_GET_USER_FAILURE = 'ADMIN_GET_USER_FAILURE';
export const adminGetUser = (userId) => ({
  [CALL_API]: {
    types: [ADMIN_GET_USER_REQUEST, ADMIN_GET_USER_SUCCESS, ADMIN_GET_USER_FAILURE],
    url: `/api/v1/admin/users/${userId}`,
    method: HTTP_METHODS.GET
  }
});

export const ADMIN_UPDATE_USER_INFORMATION_REQUEST = 'ADMIN_UPDATE_USER_INFORMATION_REQUEST';
export const ADMIN_UPDATE_USER_INFORMATION_SUCCESS = 'ADMIN_UPDATE_USER_INFORMATION_SUCCESS';
export const ADMIN_UPDATE_USER_INFORMATION_FAILURE = 'ADMIN_UPDATE_USER_INFORMATION_FAILURE';
export const adminUpdateUserInformation = (user) => ({
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


export const ADMIN_UPDATE_USER_ROLE_REQUEST = 'ADMIN_UPDATE_USER_ROLE_REQUEST';
export const ADMIN_UPDATE_USER_ROLE_SUCCESS = 'ADMIN_UPDATE_USER_ROLE_SUCCESS';
export const ADMIN_UPDATE_USER_ROLE_FAILURE = 'ADMIN_UPDATE_USER_ROLE_FAILURE';
export const adminUpdateUserRole = (userId, roles) => ({
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

export const ADMIN_BAN_USER_REQUEST = 'ADMIN_BAN_USER_REQUEST';
export const ADMIN_BAN_USER_SUCCESS = 'ADMIN_BAN_USER_SUCCESS';
export const ADMIN_BAN_USER_FAILURE = 'ADMIN_BAN_USER_FAILURE';
export const adminBanUser = (user) => ({
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

export const ADMIN_UNBAN_USER_REQUEST = 'ADMIN_UNBAN_USER_REQUEST';
export const ADMIN_UNBAN_USER_SUCCESS = 'ADMIN_UNBAN_USER_SUCCESS';
export const ADMIN_UNBAN_USER_FAILURE = 'ADMIN_UNBAN_USER_FAILURE';
export const adminUnbanUser = (user) => ({
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

export const ADMIN_GET_SHOPS_REQUEST = 'ADMIN_GET_SHOPS_REQUEST';
export const ADMIN_GET_SHOPS_SUCCESS = 'ADMIN_GET_SHOPS_SUCCESS';
export const ADMIN_GET_SHOPS_FAILURE = 'ADMIN_GET_SHOPS_FAILURE';
export const adminGetShops = () => ({
  [CALL_API]: {
    types: [ADMIN_GET_SHOPS_REQUEST, ADMIN_GET_SHOPS_SUCCESS, ADMIN_GET_SHOPS_FAILURE],
    url: '/api/v1/admin/shops',
    method: HTTP_METHODS.GET
  }
});

export const ADMIN_GET_SHOP_REQUEST = 'ADMIN_GET_SHOP_REQUEST';
export const ADMIN_GET_SHOP_SUCCESS = 'ADMIN_GET_SHOP_SUCCESS';
export const ADMIN_GET_SHOP_FAILURE = 'ADMIN_GET_SHOP_FAILURE';
export const adminGetShop = (shopId) => ({
  [CALL_API]: {
    types: [ADMIN_GET_SHOP_REQUEST, ADMIN_GET_SHOP_SUCCESS, ADMIN_GET_SHOP_FAILURE],
    url: `/api/v1/admin/shops/${shopId}`,
    method: HTTP_METHODS.GET
  }
});

export const ADMIN_UPDATE_SHOP_INFORMATION_REQUEST = 'ADMIN_UPDATE_SHOP_INFORMATION_REQUEST';
export const ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS = 'ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS';
export const ADMIN_UPDATE_SHOP_INFORMATION_FAILURE = 'ADMIN_UPDATE_SHOP_INFORMATION_FAILURE';
export const adminUpdateShopInformation = (shopId, shop) => ({
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

export const ADMIN_BAN_SHOP_REQUEST = 'ADMIN_BAN_SHOP_REQUEST';
export const ADMIN_BAN_SHOP_SUCCESS = 'ADMIN_BAN_SHOP_SUCCESS';
export const ADMIN_BAN_SHOP_FAILURE = 'ADMIN_BAN_SHOP_FAILURE';
export const adminBanShop = (shopId) => ({
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

export const ADMIN_UNBAN_SHOP_REQUEST = 'ADMIN_UNBAN_SHOP_REQUEST';
export const ADMIN_UNBAN_SHOP_SUCCESS = 'ADMIN_UNBAN_SHOP_SUCCESS';
export const ADMIN_UNBAN_SHOP_FAILURE = 'ADMIN_UNBAN_SHOP_FAILURE';
export const adminUnbanShop = (shopId) => ({
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