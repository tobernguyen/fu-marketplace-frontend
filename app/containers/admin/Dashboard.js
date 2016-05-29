import React, { Component } from 'react';
import RequestList from 'app/components/admin/RequestList';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <RequestList />
      </div>
    );
  }
}


Dashboard.path = '/dashboard';
Dashboard.title = 'Dashboard';
Dashboard.description = 'Shop opening request & statistics';
Dashboard.faIcon = 'fa-th-large';
