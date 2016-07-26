import * as AdminActionTypes from '../actions/admin';
import * as CommonActionTypes from '../actions/common';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import _ from 'lodash';

const LOST_CONNECTION = {
  status: 404,
  message_code: AsyncResultCode.UNKNOWN_ERROR
};

const initialState = {
  userManagement: {
    isFetching: false,
    userList: [],
    selectedUser: {},
    isSubmittingBanStatus: false,
    isSubmittingUserInformation: false,
    isSubmittingUserRole: false,
    submitResultBanStatus: '',
    submitResultUserInformation: '',
    submitResultUserRole: ''
  },
  shopManagement: {
    isFetching: false,
    shopList: [],
    selectedShop: {},
    isSubmittingAvatarAndCover: false,
    isSubmittingShopBanStatus: false,
    isSubmittingShopInformation: false,
    isSubmittingShopShipPlace: false,
    isSubmittingShopPromotion: false,
    submitResultAvatarAndCover: '',
    submitResultShopBanStatus: '',
    submitResultShopInformation: '',
    submitResultShopShipPlace: '',
    submitResultShopPromotion: '',
    availableShipPlaces: []
  },
  requestManagement: {
    isFetching: false,
    requestList: [],
    selectedRequest: {},
    isSubmitting: false,
    submitResult: ''
  },
  promotionManagement: {
    isFetching: false,
    promotionList: [],
    submitResult: '',
    isSubmitting: false,
    selectedPromotion: {}
  },
  changePasswordFormStatus: {
    isSubmitting: false,
    submitResult: ''
  }
};

export const admin = (state = initialState, action) => {
  console.log(action);
  const { type, response, error } = action;
  switch (type) {
    case AdminActionTypes.ADMIN_GET_USERS_REQUEST:
      return _.assign({}, state, {
        userManagement: {
          isFetching: true,
          selectedUser: {},
          isSubmitting: false,
          isSubmittingBanStatus: false,
          isSubmittingUserInformation: false,
          submitResult: '',
          submitResultBanStatus: '',
          submitResultUserInformation: '',
          shopList: []
        }
      });
    case AdminActionTypes.ADMIN_GET_USERS_SUCCESS:
      return _.assign({}, state, {
        userManagement: {
          isFetching: false,
          userList: response.users,
          isSubmitting: false,
          isSubmittingBanStatus: false,
          isSubmittingUserInformation: false,
          submitResult: '',
          submitResultBanStatus: '',
          submitResultUserInformation: ''
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
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isSubmittingUserInformation: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          submitResultUserInformation: {
            status: 200,
            message_code: AsyncResultCode.UPDATE_USER_INFORMATION_SUCCESS
          },
          isSubmittingUserInformation: false
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_INFORMATION_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          submitResultUserInformation: action.error || action.errors || LOST_CONNECTION,
          isSubmittingUserInformation: false
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isSubmittingUserRole: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          isSubmittingUserRole: false,
          submitResultUserRole: {
            status: 200,
            message_code: AsyncResultCode.UPDATE_USER_ROLE_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_USER_ROLE_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          isSubmittingUserRole: false,
          submitResultUserRole: action.error || action.errors || LOST_CONNECTION
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isSubmittingBanStatus: true
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          submitResultBanStatus: {
            status: 200,
            message_code: AsyncResultCode.BAN_USER_SUCCESS
          },
          isSubmittingBanStatus: false
        }
      });
    case AdminActionTypes.ADMIN_BAN_USER_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          submitResultBanStatus: action.error || LOST_CONNECTION,
          isSubmittingBanStatus: false
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_REQUEST:
      return _.merge({}, state, {
        userManagement: {
          isSubmittingBanStatus: true
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_SUCCESS:
      return _.merge({}, state, {
        userManagement: {
          selectedUser: response,
          submitResultBanStatus: {
            status: 200,
            message_code: AsyncResultCode.UNBAN_USER_SUCCESS
          },
          isSubmittingBanStatus: false
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_USER_FAILURE:
      return _.merge({}, state, {
        userManagement: {
          submitResult: action.error || LOST_CONNECTION,
          isSubmitting: false
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOPS_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isFetching: true,
          isSubmittingAvatarAndCover: false,
          isSubmittingShopBanStatus: false,
          isSubmittingShopInformation: false,
          isSubmittingShopShipPlace: false,
          submitResultAvatarAndCover: '',
          submitResultShopBanStatus: '',
          submitResultShopInformation: '',
          submitResultShopShipPlace: '',
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
          isSubmittingShopInformation: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopInformation: false,
          selectedShop: response,
          submitResultShopInformation: {
            status: 200,
            message_code: AsyncResultCode.UPDATE_SHOP_INFORMATION_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_INFORMATION_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopInformation: false,
          submitResultShopInformation: action.error || LOST_CONNECTION
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_OPENING_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          submitResultShopShipPlace: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_OPENING_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopShipPlace: false,
          selectedShop: response,
          submitResultShopShipPlace: {
            status: 200,
            message_code: AsyncResultCode.UPDATE_SHOP_SHIP_PLACES_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_OPENING_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopShipPlace: false,
          submitResultShopShipPlace: action.error
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_SHIP_PLACES_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopShipPlace: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_SHIP_PLACES_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopShipPlace: false,
          selectedShop: response,
          submitResultShopShipPlace: {
            status: 200,
            message_code: AsyncResultCode.UPDATE_SHOP_SHIP_PLACES_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_SHIP_PLACES_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopShipPlace: false,
          submitResultShopShipPlace: action.error
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingAvatarAndCover: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingAvatarAndCover: false,
          selectedShop: response,
          submitResultAvatarAndCover: {
            status: 200,
            message_code: AsyncResultCode.UPDATE_SHOP_AVATAR_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_AVATAR_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingAvatarAndCover: false,
          submitResultAvatarAndCover: action.error || LOST_CONNECTION
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingAvatarAndCover: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingAvatarAndCover: false,
          selectedShop: response,
          submitResultAvatarAndCover: {
            status: 200,
            message_code: AsyncResultCode.UPDATE_SHOP_COVER_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_COVER_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingAvatarAndCover: false,
          submitResultAvatarAndCover: action.error || LOST_CONNECTION
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopBanStatus: true
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          selectedShop: response,
          submitResultShopBanStatus: {
            status: 200,
            message_code: AsyncResultCode.BAN_SHOP_SUCCESS
          },
          isSubmittingShopBanStatus: false
        }
      });
    case AdminActionTypes.ADMIN_BAN_SHOP_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopBanStatus: false,
          submitResultShopBanStatus: action.error
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopBanStatus: true
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          selectedShop: response,
          submitResultShopBanStatus: {
            status: 200,
            message_code: AsyncResultCode.UNBAN_SHOP_SUCCESS
          },
          isSubmittingShopBanStatus: false
        }
      });
    case AdminActionTypes.ADMIN_UNBAN_SHOP_FAILURE:
      return _.merge({}, state, {
        shopManagement: {
          submitResultShopBanStatus: action.error || LOST_CONNECTION,
          isSubmittingShopBanStatus: false
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
      return _.assign({}, state, {
        requestManagement: {
          isFetching: false,
          requestList: response.shopOpeningRequests,
          submitResult: '',
          isSubmitting: false
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
          submitResult: {
            status: 200,
            message_code: AsyncResultCode.ACCEPT_REQUEST_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_ACCEPT_REQUEST_FAILURE:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: false,
          submitResult: action.error
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
          submitResult: {
            status: 200,
            message_code: AsyncResultCode.REJECT_REQUEST_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_REJECT_REQUEST_FAILURE:
      return _.merge({}, state, {
        requestManagement: {
          isSubmitting: false,
          submitResult: action.error
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
          submitResult: action.error
        }
      });
    case AdminActionTypes.ADMIN_CREATE_SHOP_PROMOTION_CAMPAIGN_REQUEST:
      return _.merge({}, state, {
        shopManagement: {
          isSubmittingShopPromotion: true
        }
      });
    case AdminActionTypes.ADMIN_CREATE_SHOP_PROMOTION_CAMPAIGN_SUCCESS:
      return _.merge({}, state,{
        shopManagement: {
          submitResultShopPromotion: {
            status: 200,
            message_code: AsyncResultCode.CREATE_PROMOTION_SUCCESS
          },
          isSubmittingShopPromotion: false
        }
      });
    case AdminActionTypes.ADMIN_CREATE_SHOP_PROMOTION_CAMPAIGN_FAILURE:
      return _.merge({}, state,{
        shopManagement: {
          submitResultShopPromotion: action.error || LOST_CONNECTION,
          isSubmittingShopPromotion: false
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOP_PROMOTION_CAMPAIGN_REQUEST:
      return _.merge({}, state, {
        promotionManagement: {
          isFetching: true,
          promotionList: []
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOP_PROMOTION_CAMPAIGN_SUCCESS:
      return _.merge({}, state, {
        promotionManagement: {
          isFetching: false,
          promotionList: response.shopPromotionCampaigns
        }
      });
    case AdminActionTypes.ADMIN_GET_SHOP_PROMOTION_CAMPAIGN_FAILURE:
      return _.merge({}, state, {
        promotionManagement: {
          isFetching: false,
          promotionList: []
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_PROMOTION_CAMPAIGN_REQUEST:
      return _.merge({}, state, {
        promotionManagement: {
          isSubmitting: true
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_PROMOTION_CAMPAIGN_SUCCESS:
      let promotionList = state.promotionManagement.promotionList;
      const index = _.indexOf(promotionList, _.find(promotionList, { id: response.id}));
      promotionList.splice(index, 1, response);
      return _.merge({}, state, {
        promotionManagement: {
          promotionList,
          isSubmitting: false,
          submitResult: {
            status: 200,
            message_code: AsyncResultCode.EDIT_PROMOTION_SUCCESS
          }
        }
      });
    case AdminActionTypes.ADMIN_UPDATE_SHOP_PROMOTION_CAMPAIGN_FAILURE:
      return _.merge({}, state, {
        promotionManagement: {
          isSubmitting: false,
          submitResult: action.error || action.errors || LOST_CONNECTION
        }
      });

    case CommonActionTypes.GET_SHIP_PLACES_SUCCESS:
      return _.merge({}, state, {
        shopManagement: {
          availableShipPlaces: response.shipPlaces
        }
      });
    case 'ADMIN_GOT_ERROR':
      return _.assign({}, state, {
        error: error
      });
    default:
      return state;
  }
};
