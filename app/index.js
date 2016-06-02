import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Root from './containers/Root';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';

addLocaleData(en);
addLocaleData(vi);

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
