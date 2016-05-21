import axios from 'axios';

const API_ROOT = 'http://localhost:3000';

export const HTTP_METHODS = {
  GET:    'GET',
  POST:   'POST',
  PUT:    'PUT',
  DELETE: 'DELETE',
  PATCH:  'PATCH'
};

const fetch = (method = HTTP_METHODS.GET, url = '', params = {}) => {
  const fullURL = `${API_ROOT}${url}`;
  return axios({
    url: fullURL,
    method: method,
    responseType: 'json',
    params: params
  }).then((response) => {
    return response.data
  }).catch((error) => {
    return Promise.reject(error.data)
  })
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const { types, url, method, params } = callAPI;

  if (typeof url !== 'string') {
    throw new Error('Specify a string URL.')
  }

  if (typeof method !== 'string') {
    throw new Error('Specify a string of HTTP Method.')
  }

  if (!method in HTTP_METHODS) {
    throw new Error('Unsupported HTTP Method.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  /**
   * Create a new action (because original should be immutable) and dispatch it
   * into reducers. It's unnecessary to send request info, so we remove it.
   * @param  {Object} data Incoming JSON payload (from the API)
   * @return {Object}      Data for reducers
   */
  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }
  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));
  return fetch(method, url, params || {}).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error || 'Something bad happened'
    }))
  )
}
