import * as ActionTypes from '../actions';
import * as AdminActionTypes from '../actions/admin';
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
    submitResult: ''
  },
  changePasswordFormStatus: {
    isSubmitting: false,
    response: ''
  }
};

export const admin = (state = initialState, action) => {
  const { type, response } = action;
  switch (type) {
    case AdminActionTypes.ADMIN_GET_USERS_REQUEST:
      return _.assign({}, state, {
        userManagement: {
          isFetching: true
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
      return _.assign({}, state, {
        userManagement: {
          isFetching: true
        }
      });
    case AdminActionTypes.ADMIN_GET_USER_SUCCESS:
      return _.assign({}, state, {
        userManagement: {
          isFetching: false,
          selectedUser: response
        }
      });
    case AdminActionTypes.ADMIN_GET_USERS_FAILURE:
      return _.assign({}, state, { users: [] });
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_SUCCESS:
      return _.assign({}, state, {
        userManagement: {
          selectedUser: response,
          submitResult: AsyncResultCode.UPDATE_USER_INFORMATION_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_FAILURE:
      return _.assign({}, state, {
        userManagement: {
          submitResult: AsyncResultCode.UPDATE_USER_INFORMATION_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_REQUEST:
      return _.assign({}, state, {
        userManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_SUCCESS:
      return _.assign({}, state, {
        userManagement: {
          selectedUser: response,
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_USER_ROLE_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_FAILURE:
      return _.assign({}, state, {
        userManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_USER_ROLE_FAIL
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_REQUEST:
      return _.assign({}, state, {
        userManagement: {
          isSubmitting: true,
          selectedUser: state.userManagement.selectedUser
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_SUCCESS:
      return _.assign({}, state, {
        userManagement: {
          selectedUser: response,
          submitResult: AsyncResultCode.BAN_USER_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_FAILURE:
      return _.assign({}, state, {
        userManagement: {
          submitResult: AsyncResultCode.BAN_USER_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_REQUEST:
      return _.assign({}, state, {
        userManagement: {
          isSubmitting: true,
          selectedUser: state.userManagement.selectedUser
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_SUCCESS:
      return _.assign({}, state, {
        userManagement: {
          selectedUser: response,
          submitResult: AsyncResultCode.UNBAN_USER_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_FAILURE:
      return _.assign({}, state, {
        userManagement: {
          submitResult: AsyncResultCode.UNBAN_USER_FAIL
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOPS_REQUEST:
      return _.assign({}, state, {
        shopManagement: {
          isFetching: true
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOPS_SUCCESS:
      return _.assign({}, state, {
        shopManagement: {
          isFetching: false,
          shopList: response.shops
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOPS_FAILURE:
      return _.assign({}, state, {
        shopManagement: {
          isFetching: false,
          shopList: []
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOP_REQUEST:
      return _.assign({}, state, {
        shopManagement: {
          isFetching: true
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOP_SUCCESS:
      return _.assign({}, state, {
        shopManagement: {
          isFetching: false,
          selectedShop: response
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_REQUEST:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: false,
          selectedShop: response,
          submitResult: AsyncResultCode.UPDATE_SHOP_INFORMATION_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_FAILURE:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_SHOP_INFORMATION_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_REQUEST:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: true,
          selectedShop: state.shopManagement.selectedShop
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_SUCCESS:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: false,
          selectedShop: response,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_FAILURE:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_FAIL
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_REQUEST:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: true,
          selectedShop: state.shopManagement.selectedShop
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_SUCCESS:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: false,
          selectedShop: response,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_FAILURE:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: false,
          submitResult: AsyncResultCode.UPDATE_SHOP_AVATAR_FAIL
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_REQUEST:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: true,
          selectedShop: state.shopManagement.selectedShop
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_SUCCESS:
      return _.assign({}, state, {
        shopManagement: {
          selectedShop: response,
          submitResult: AsyncResultCode.BAN_SHOP_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_FAILURE:
      return _.assign({}, state, {
        shopManagement: {
          submitResult: AsyncResultCode.BAN_SHOP_FAIL,
          selectedShop: state.shopManagement.selectedShop
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_REQUEST:
      return _.assign({}, state, {
        shopManagement: {
          isSubmitting: true,
          selectedShop: state.shopManagement.selectedShop
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_SUCCESS:
      return _.assign({}, state, {
        shopManagement: {
          selectedShop: response,
          submitResult: AsyncResultCode.UNBAN_SHOP_SUCCESS
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_FAILURE:
      return _.assign({}, state, {
        shopManagement: {
          submitResult: AsyncResultCode.UNBAN_SHOP_FAIL,
          selectedShop: state.shopManagement.selectedShop
        }
      });
    case ActionTypes.ADMIN_CHANGE_PASSWORD_REQUEST:
      return _.assign({}, state, {
        changePasswordFormStatus: {
          isSubmitting: true
        }
      });
    case ActionTypes.ADMIN_CHANGE_PASSWORD_SUCCESS:
      return _.assign({}, state, {
        changePasswordFormStatus: {
          isSubmitting: false,
          response: ''
        }
      });
    case ActionTypes.ADMIN_CHANGE_PASSWORD_FAILURE:
      return _.assign({}, state, {
        changePasswordFormStatus: {
          isSubmitting: false,
          response: 'Error happened'
        }
      });
    default:
      return state;
  }
};
