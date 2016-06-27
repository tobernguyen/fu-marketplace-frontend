import React, { Component } from 'react';

class RequestManagement extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}


RequestManagement.path = '/requests';
RequestManagement.title = 'Request Management';
RequestManagement.description = 'Request management';
RequestManagement.faIcon = 'fa-shopping-bag';

export default RequestManagement;
