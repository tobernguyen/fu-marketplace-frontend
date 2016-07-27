import { CALL_API, HTTP_METHODS } from '../middleware/api';
import _ from 'lodash';

export const SHOP_REQUEST_OPENING_REQUEST = 'SHOP_REQUEST_OPENING_REQUEST';
export const SHOP_REQUEST_OPENING_SUCCESS = 'SHOP_REQUEST_OPENING_SUCCESS';
export const SHOP_REQUEST_OPENING_FAILURE = 'SHOP_REQUEST_OPENING_FAILURE';
const requestRequestCreateShop = (formValues, hasShop) => ({
  [CALL_API]: {
    types: [SHOP_REQUEST_OPENING_REQUEST, SHOP_REQUEST_OPENING_SUCCESS, SHOP_REQUEST_OPENING_FAILURE],
    url: `/api/v1/${hasShop ? 'seller/shopOpeningRequest' : 'requestOpenShopFirstTime' }`,
    method: HTTP_METHODS.POST,
    params: formValues
  }
});

export const requestCreateShop = (formValues, hasShop) => {
  const { phone, identityNumber, shopName, description, address, shopPhone } = formValues;
  let requestForm = {
    sellerInfo: {
      phone: phone,
      identityNumber: identityNumber
    },
    shopInfo: {
      name: shopName,
      description: description,
      address: address,
      phone: shopPhone
    }
  };

  if (hasShop) {
    requestForm = _.omit(requestForm, 'sellerInfo');
  }

  return (dispatch) => {
    return dispatch(requestRequestCreateShop(requestForm, hasShop))
  }
};


export const GET_PENDING_REQUESTS_REQUEST = 'GET_PENDING_REQUESTS_REQUEST';
export const GET_PENDING_REQUESTS_SUCCESS = 'GET_PENDING_REQUESTS_SUCCESS';
export const GET_PENDING_REQUESTS_FAILURE = 'GET_PENDING_REQUESTS_FAILURE';
const requestGetPendingRequests = () => ({
  [CALL_API]: {
    types: [GET_PENDING_REQUESTS_REQUEST, GET_PENDING_REQUESTS_SUCCESS, GET_PENDING_REQUESTS_FAILURE],
    url: '/api/v1/users/me/shopOpeningRequests',
    method: HTTP_METHODS.GET
  }
});

export const getPendingRequests = () => {
  return (dispatch) => {
    return dispatch(requestGetPendingRequests())
  }
};


export const UPLOAD_SHOP_AVATAR_REQUEST = 'UPLOAD_SHOP_AVATAR_REQUEST';
export const UPLOAD_SHOP_AVATAR_SUCCESS = 'UPLOAD_SHOP_AVATAR_SUCCESS';
export const UPLOAD_SHOP_AVATAR_FAILURE = 'UPLOAD_SHOP_AVATAR_FAILURE';
const requestShopUploadAvatar = (formFileData, shopID) => ({
  [CALL_API]: {
    types: [UPLOAD_SHOP_AVATAR_REQUEST, UPLOAD_SHOP_AVATAR_SUCCESS, UPLOAD_SHOP_AVATAR_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/uploadAvatar`,
    method: HTTP_METHODS.POST,
    params: formFileData
  }
});

export const uploadShopAvatar = (formFileData, shopID) => {
  return (dispatch) => {
    return dispatch(requestShopUploadAvatar(formFileData, shopID))
  }
};


export const UPLOAD_SHOP_COVER_REQUEST = 'UPLOAD_SHOP_COVER_REQUEST';
export const UPLOAD_SHOP_COVER_SUCCESS = 'UPLOAD_SHOP_COVER_SUCCESS';
export const UPLOAD_SHOP_COVER_FAILURE = 'UPLOAD_SHOP_COVER_FAILURE';
const requestShopUploadCover = (formFileData, shopID) => ({
  [CALL_API]: {
    types: [UPLOAD_SHOP_COVER_REQUEST, UPLOAD_SHOP_COVER_SUCCESS, UPLOAD_SHOP_COVER_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/uploadCover`,
    method: HTTP_METHODS.POST,
    params: formFileData
  }
});

export const uploadShopCover = (formFileData, shopID) => {
  return (dispatch) => {
    return dispatch(requestShopUploadCover(formFileData, shopID))
  }
};


export const SELLER_GET_SHOP_REQUEST = 'SELLER_GET_SHOP_REQUEST';
export const SELLER_GET_SHOP_SUCCESS = 'SELLER_GET_SHOP_SUCCESS';
export const SELLER_GET_SHOP_FAILURE = 'SELLER_GET_SHOP_FAILURE';
const requestGetSellerShop = (shopID) => ({
  [CALL_API]: {
    types: [SELLER_GET_SHOP_REQUEST, SELLER_GET_SHOP_SUCCESS, SELLER_GET_SHOP_FAILURE],
    url: `/api/v1/seller/shops/${shopID}`,
    method: HTTP_METHODS.GET
  }
});

export const getSellerShop = (shopID) => {
  return (dispatch) => {
    return dispatch(requestGetSellerShop(shopID))
  }
};


export const UPDATE_SHOP_INFO_REQUEST = 'UPDATE_SHOP_INFO_REQUEST';
export const UPDATE_SHOP_INFO_SUCCESS = 'UPDATE_SHOP_INFO_SUCCESS';
export const UPDATE_SHOP_INFO_FAILURE = 'UPDATE_SHOP_INFO_FAILURE';
const requestUpdateShopInfo = (shopData, shopID) => ({
  [CALL_API]: {
    types: [UPDATE_SHOP_INFO_REQUEST, UPDATE_SHOP_INFO_SUCCESS, UPDATE_SHOP_INFO_FAILURE],
    url: `/api/v1/seller/shops/${shopID}`,
    method: HTTP_METHODS.PUT,
    params: shopData
  }
});

export const updateShopInfo = (shopData, shopID) => {
  return (dispatch) => {
    return dispatch(requestUpdateShopInfo(shopData, shopID))
  }
};


export const SHOP_CREATE_ITEM_REQUEST = 'SHOP_CREATE_ITEM_REQUEST';
export const SHOP_CREATE_ITEM_SUCCESS = 'SHOP_CREATE_ITEM_SUCCESS';
export const SHOP_CREATE_ITEM_FAILURE = 'SHOP_CREATE_ITEM_FAILURE';
const requestCreateShopItem = (formValues, shopID) => ({
  [CALL_API]: {
    types: [SHOP_CREATE_ITEM_REQUEST, SHOP_CREATE_ITEM_SUCCESS, SHOP_CREATE_ITEM_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/items`,
    method: HTTP_METHODS.POST,
    params: formValues
  }
});

export const createShopItem = (formValues, shopID) => {
  const { name, description, quantity, price, imageData, categoryId } = formValues;
  const formShopItem = new FormData();
  formShopItem.append('name', name);
  if (description) {
    formShopItem.append('description', description);
  }
  if (quantity) {
    formShopItem.append('quantity', quantity);
  }
  formShopItem.append('price', price);
  formShopItem.append('imageFile', imageData);
  formShopItem.append('categoryId', categoryId);
  formShopItem.append('sort', 1);

  return (dispatch) => {
    return dispatch(requestCreateShopItem(formShopItem, shopID))
  }
};


export const SELLER_GET_SHOP_ITEM_LIST_REQUEST = 'SELLER_GET_SHOP_ITEM_LIST_REQUEST';
export const SELLER_GET_SHOP_ITEM_LIST_SUCCESS = 'SELLER_GET_SHOP_ITEM_LIST_SUCCESS';
export const SELLER_GET_SHOP_ITEM_LIST_FAILURE = 'SELLER_GET_SHOP_ITEM_LIST_FAILURE';
const requestGetSellerShopItems = (shopID) => ({
  [CALL_API]: {
    types: [SELLER_GET_SHOP_ITEM_LIST_REQUEST, SELLER_GET_SHOP_ITEM_LIST_SUCCESS, SELLER_GET_SHOP_ITEM_LIST_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/items`,
    method: HTTP_METHODS.GET
  }
});

export const getSellerShopItems = (shopID) => {
  return (dispatch) => {
    return dispatch(requestGetSellerShopItems(shopID))
  }
};


export const SELLER_DELETE_SHOP_ITEM_REQUEST = 'SELLER_DELETE_SHOP_ITEM_REQUEST';
export const SELLER_DELETE_SHOP_ITEM_SUCCESS = 'SELLER_DELETE_SHOP_ITEM_SUCCESS';
export const SELLER_DELETE_SHOP_ITEM_FAILURE = 'SELLER_DELETE_SHOP_ITEM_FAILURE';
const requestDeleteShopItem = (shopID, itemID) => ({
  [CALL_API]: {
    types: [SELLER_DELETE_SHOP_ITEM_REQUEST, SELLER_DELETE_SHOP_ITEM_SUCCESS, SELLER_DELETE_SHOP_ITEM_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/items/${itemID}`,
    method: HTTP_METHODS.DELETE
  }
});

export const deleteShopItem = (shopID, itemID) => {
  return (dispatch) => {
    return dispatch(requestDeleteShopItem(shopID, itemID))
  }
};

export const SELLER_UPDATE_SHOP_ITEM_REQUEST = 'SELLER_UPDATE_SHOP_ITEM_REQUEST';
export const SELLER_UPDATE_SHOP_ITEM_SUCCESS = 'SELLER_UPDATE_SHOP_ITEM_SUCCESS';
export const SELLER_UPDATE_SHOP_ITEM_FAILURE = 'SELLER_UPDATE_SHOP_ITEM_FAILURE';
const requestUpdateShopItem = (shopID, itemID, formShopItem) => ({
  [CALL_API]: {
    types: [SELLER_UPDATE_SHOP_ITEM_REQUEST, SELLER_UPDATE_SHOP_ITEM_SUCCESS, SELLER_UPDATE_SHOP_ITEM_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/items/${itemID}`,
    method: HTTP_METHODS.PUT,
    params: formShopItem
  }
});

export const updateShopItem = (shopID, itemID, formValues) => {
  const { name, description, quantity, price, imageData, categoryId } = formValues;
  const formShopItem = new FormData();
  formShopItem.append('name', name);
  formShopItem.append('price', price);
  formShopItem.append('categoryId', categoryId);
  formShopItem.append('sort', 1);

  if (description) {
    formShopItem.append('description', description);
  }
  if (quantity) {
    formShopItem.append('quantity', quantity);
  }
  if (imageData) {
    formShopItem.append('imageFile', imageData);
  }

  return (dispatch) => {
    return dispatch(requestUpdateShopItem(shopID, itemID, formShopItem))
  }
};

export const SELLER_SET_ITEM_STATUS_REQUEST = 'SELLER_SET_ITEM_STATUS_REQUEST';
export const SELLER_SET_ITEM_STATUS_SUCCESS = 'SELLER_SET_ITEM_STATUS_SUCCESS';
export const SELLER_SET_ITEM_STATUS_FAILURE = 'SELLER_SET_ITEM_STATUS_FAILURE';
const requestSetItemStatus = (shopID, itemID, status) => ({
  [CALL_API]: {
    types: [SELLER_SET_ITEM_STATUS_REQUEST, SELLER_SET_ITEM_STATUS_SUCCESS, SELLER_SET_ITEM_STATUS_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/items/${itemID}/setStatus`,
    method: HTTP_METHODS.PUT,
    params: {
      status: status
    }
  }
});

export const setItemStatus = (shopID, itemID, status) => {
  return (dispatch) => {
    return dispatch(requestSetItemStatus(shopID, itemID, status))
  }
};


export const REMOVE_SHOP_ITEM_FROM_LIST = 'REMOVE_SHOP_ITEM_FROM_LIST';
export const removeShopItemFromList = (itemID) => ({
  type: REMOVE_SHOP_ITEM_FROM_LIST,
  payload: {
    itemID: itemID
  }
});


export const SET_TO_BE_UPDATED_ITEM = 'SET_TO_BE_UPDATED_ITEM';
export const setToBeUpdatedItem = (item) => ({
  type: SET_TO_BE_UPDATED_ITEM,
  payload: {
    toBeUpdatedItem: item
  }
});


export const RESET_UPDATED_ITEM_STATUS = 'RESET_UPDATED_ITEM_STATUS';
export const resetUpdatedItemStatus = () => ({
  type: RESET_UPDATED_ITEM_STATUS
});


export const SELLER_UPDATE_SHIP_PLACES_REQUEST = 'SELLER_UPDATE_SHIP_PLACES_REQUEST';
export const SELLER_UPDATE_SHIP_PLACES_SUCCESS = 'SELLER_UPDATE_SHIP_PLACES_SUCCESS';
export const SELLER_UPDATE_SHIP_PLACES_FAILURE = 'SELLER_UPDATE_SHIP_PLACES_FAILURE';
const requestUpdateShipPlaces = (shopID, shipPlaces) => ({
  [CALL_API]: {
    types: [SELLER_UPDATE_SHIP_PLACES_REQUEST, SELLER_UPDATE_SHIP_PLACES_SUCCESS, SELLER_UPDATE_SHIP_PLACES_FAILURE],
    url: `/api/v1/seller/shops/${shopID}/shipPlaces`,
    method: HTTP_METHODS.POST,
    params: {
      shipPlaces: shipPlaces
    }
  }
});

export const updateShipPlaces = (shopID, shipPlaces) => {
  return (dispatch) => {
    return dispatch(requestUpdateShipPlaces(shopID, shipPlaces))
  }
};


export const USER_RATES_SHOP_REQUEST = 'USER_RATES_SHOP_REQUEST';
export const USER_RATES_SHOP_SUCCESS = 'USER_RATES_SHOP_SUCCESS';
export const USER_RATES_SHOP_FAILURE = 'USER_RATES_SHOP_FAILURE';
const requestRateShop = (shopID, rateValue) => ({
  [CALL_API]: {
    types: [USER_RATES_SHOP_REQUEST, USER_RATES_SHOP_SUCCESS, USER_RATES_SHOP_FAILURE],
    url: `/api/v1/shops/${shopID}/review`,
    method: HTTP_METHODS.POST,
    params: rateValue
  }
});

export const rateShop = (shopID, rateValue) => {
  return (dispatch) => {
    return dispatch(requestRateShop(shopID, rateValue))
  }
};

export const CLEAR_REVIEW_STATUS = 'CLEAR_REVIEW_STATUS';
export const clearReviewStatus = () => ({
  type: CLEAR_REVIEW_STATUS
});


export const USER_GETS_SHOP_REVIEWS_REQUEST = 'USER_GETS_SHOP_REVIEWS_REQUEST';
export const USER_GETS_SHOP_REVIEWS_SUCCESS = 'USER_GETS_SHOP_REVIEWS_SUCCESS';
export const USER_GETS_SHOP_REVIEWS_FAILURE = 'USER_GETS_SHOP_REVIEWS_FAILURE';
const requestShopReviews = (shopID, params) => ({
  [CALL_API]: {
    types: [USER_GETS_SHOP_REVIEWS_REQUEST, USER_GETS_SHOP_REVIEWS_SUCCESS, USER_GETS_SHOP_REVIEWS_FAILURE],
    url: `/api/v1/shops/${shopID}/reviews`,
    method: HTTP_METHODS.GET,
    params: params
  }
});

export const getShopReviews = (shopID, params) => {
  return (dispatch) => {
    return dispatch(requestShopReviews(shopID, params))
  }
};
