import * as AdminActionTypes from '../actions/admin';
import * as CommonActionTypes from '../actions/common';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import _ from 'lodash';


const initialState = {
  userManagement: {
    isFetching: false,
    userList: [],
    selectedUser: {},
    isSubmitting: false,
    submitResult: ''
  },
  shopManagement: {
    isFetching: false,
    shopList: [],
    selectedShop: {},
    isSubmitting: false,
    submitResult: '',
    availableShipPlaces: []
  },
  requestManagement: {
    isFetching: false,
    requestList: [],
    selectedRequest: {},
    isSubmitting: false,
    submitResult: ''
  },
  changePasswordFormStatus: {
    isSubmitting: false,
    response: {}
  }
};

export const admin = (state = initialState, action) => {
  const { type, response } = action;
  switch (type) {
    case AdminActionTypes.ADMIN_GET_USERS_REQUEST:
      return _.assign({}, state, {
        userManagement: {
          isFetching: true,
          selectedUser: {},
          submitResult: '',
          shopList: []
        }
      });
    case AdminActionTypes.ADMIN_GET_USERS_SUCCESS:
      return _.assign({}, state, {
        userManagement: {
          isFetching: false,
          userList: response.users
        }
      });
    case AdminActionTypes.ADMIN_GET_USER_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isFetching: true,
          selectedUser: {},
          submitResult: false
        }
      });
    case AdminActionTypes.ADMIN_GET_USER_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          isFetching: false,
          selectedUser: response
        }
      });
    case AdminActionTypes.ADMIN_GET_USERS_FAILURE:
      return _.merge({}, state, { users: [] });
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          submitResult: AsyncResultCode.UPDATE_USER_INFORMATION_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          submitResult: AsyncResultCode.UPDATE_USER_INFORMATION_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_USER_ROLE_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_USER_ROLE_FAIL
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          submitResult: AsyncResultCode.BAN_USER_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          submitResult: AsyncResultCode.BAN_USER_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          submitResult: AsyncResultCode.UNBAN_USER_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          submitResult: AsyncResultCode.UNBAN_USER_FAIL
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOPS_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isFetching: true,
          submitResult: '',
          shopList: []
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOPS_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isFetching: false,
          shopList: response.shops
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOPS_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isFetching: false,
          shopList: []
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOP_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isFetching: true,
          submitResult: '',
          selectedShop: {}
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOP_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isFetching: false,
          selectedShop: response
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          selectedShop: response,
          submitResult: AsyncResultCode.UPDATE_SHOP_INFORMATION_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_SHOP_INFORMATION_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_SHIP_PLACES_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_SHIP_PLACES_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          selectedShop: response,
          submitResult: AsyncResultCode.UPDATE_SHOP_SHIP_PLACES_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_SHIP_PLACES_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_SHOP_SHIP_PLACES_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          selectedShop: response,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          selectedShop: response,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_FAIL
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          selectedShop: response,
          submitResult: AsyncResultCode.BAN_SHOP_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          submitResult: AsyncResultCode.BAN_SHOP_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          selectedShop: response,
          submitResult: AsyncResultCode.UNBAN_SHOP_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          submitResult: AsyncResultCode.UNBAN_SHOP_FAIL
        }
      });
    case AdminActionTypes.ADMIN_GET_REQUESTS_REQUEST:
      return _.merge({}, state, {
        requestManagement: {
          isFetching: true,
          submitResult: '',
          requestList: []
        }
      });
    case  AdminActionTypes.ADMIN_GET_REQUESTS_SUCCESS:
      return _.merge({}, state, {
        requestManagement: {
          isFetching: false,
          requestList: response.shopOpeningRequests
        }
      });
    case AdminActionTypes.ADMIN_GET_REQUESTS_FAILURE:
      return _.merge({}, state, {
        requestManagement: {
          isFetching: false
        }
      });
    case AdminActionTypes.ADMIN_ACCEPT_REQUEST_REQUEST:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_ACCEPT_REQUEST_SUCCESS:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: false,
          submitResult: 'OK'
        }
      });
    case AdminActionTypes.ADMIN_ACCEPT_REQUEST_FAILURE:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: false,
          submitResult: response.message_code
        }
      });
    case AdminActionTypes.ADMIN_REJECT_REQUEST_REQUEST:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_REJECT_REQUEST_SUCCESS:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: false,
          submitResult: 'OK'
        }
      });
    case AdminActionTypes.ADMIN_REJECT_REQUEST_FAILURE:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: false,
          submitResult: response.message_code
        }
      });
    case AdminActionTypes.ADMIN_CHANGE_PASSWORD_REQUEST:
      return _.merge({}, state, {
        changePasswordFormStatus: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
      return _.merge({}, state, {
        changePasswordFormStatus: {
          isSubmitting: false
        }
      });
    case AdminActionTypes.ADMIN_CHANGE_PASSWORD_FAILURE:
      return _.merge({}, state, {
        changePasswordFormStatus: {
          isSubmitting: false,
          response: action.error || ''
        }
      });
    case CommonActionTypes.GET_SHIP_PLACES_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          availableShipPlaces: response.shipPlaces
        }
      });
    default:
      return state;
  }
};
