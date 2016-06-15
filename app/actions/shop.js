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
    return dispatch(requestShopUploadAvatar(formFileData, shopID))
  }
};
