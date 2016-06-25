import React, { Component } from 'react';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        Hello, this is a dashboard
      </div>
    );
  }
}


Dashboard.path = '/dashboard';
Dashboard.title = 'Dashboard';
Dashboard.description = 'Dashboard';
Dashboard.faIcon = 'fa-th-large';
