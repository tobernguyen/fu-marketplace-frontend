jest.unmock('../App.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from '../App.jsx';

describe('App', () => {
  it('should render hieu-cui text', () => {
    const app = TestUtils.renderIntoDocument(<App/>);
    const appNode = ReactDOM.findDOMNode(app);
    expect(appNode.textContent).toEqual('Hieu cui');
    expect(appNode.className).toEqual('hieu-cui');
  });
});
