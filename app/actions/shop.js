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
