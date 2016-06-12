import React, { Component, PropTypes } from 'react';

class ShopManagement extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


ShopManagement.path = '/shops';
ShopManagement.title = 'Shop management';
ShopManagement.description = 'Shop management';
ShopManagement.faIcon = 'fa-shopping-bag';

export default ShopManagement;