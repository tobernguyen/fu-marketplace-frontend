import React, { Component, PropTypes } from 'react';
import ShopList from 'app/components/admin/ShopList';

export default class ShopManagement extends Component {
  render() {
    return (
      <div className="dashboard">
        <ShopList />
      </div>
    );
  }
}


ShopManagement.path = '/shops';
ShopManagement.title = 'Shop management';
ShopManagement.description = 'Shop management';
ShopManagement.faIcon = 'fa-shopping-bag';
