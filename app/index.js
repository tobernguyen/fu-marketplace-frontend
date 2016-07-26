import 'babel-polyfill';
import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import vi from 'react-intl/locale-data/vi';


addLocaleData(vi);
addLocaleData(en);

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

if (!global.Intl) {
  require.ensure(['intl'], require => {
    require('intl');
    require('intl/locale-data/jsonp/vi.js');
    require('intl/locale-data/jsonp/en.js');
    start()
  }, 'IntlBundle')
} else {
  start()
}

function start() {
  ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('root')
  )
}
