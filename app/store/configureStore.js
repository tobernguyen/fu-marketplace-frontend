import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import api from '../middleware/api';
import localStorage from '../middleware/localStorage';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, api, localStorage),
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
}
