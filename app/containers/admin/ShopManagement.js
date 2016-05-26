import React, { Component, PropTypes } from 'react';

export default class ShopManagement extends Component {
  render() {
    return (
      <div className="dashboard">
        This is ShopManagement container
      </div>
    );
  }
}


ShopManagement.path = '/shops';
ShopManagement.title = 'Shop management';
ShopManagement.description = 'Shop management';
ShopManagement.faIcon = 'fa-shopping-bag';
