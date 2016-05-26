import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        This is dashboard container
      </div>
    );
  }
}


Dashboard.path = '/dashboard';
Dashboard.title = 'Dashboard';
Dashboard.description = 'Shop opening request & statistics';
Dashboard.faIcon = 'fa-th-large';
