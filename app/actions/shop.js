import { CALL_API, HTTP_METHODS } from '../middleware/api';


export const SHOP_REQUEST_OPENING_REQUEST = 'SHOP_REQUEST_OPENING_REQUEST';
export const SHOP_REQUEST_OPENING_SUCCESS = 'SHOP_REQUEST_OPENING_SUCCESS';
export const SHOP_REQUEST_OPENING_FAILURE = 'SHOP_REQUEST_OPENING_FAILURE';
const requestRequestCreateShop = (formValues) => ({
  [CALL_API]: {
    types: [SHOP_REQUEST_OPENING_REQUEST, SHOP_REQUEST_OPENING_SUCCESS, SHOP_REQUEST_OPENING_FAILURE],
    url: '/api/v1/requestOpenShopFirstTime',
    method: HTTP_METHODS.POST,
    params: formValues
  }
});

export const requestCreateShop = (formValues) => {
  const { phone, identityNumber, shopName, description, address } = formValues;
  const requestForm = {
    sellerInfo: {
      phone: phone,
      identityNumber: identityNumber
    },
    shopInfo: {
      name: shopName,
      description: description,
      address: address
    },
    note: 'Chua co note'
  };
  return (dispatch) => {
    return dispatch(requestRequestCreateShop(requestForm))
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
