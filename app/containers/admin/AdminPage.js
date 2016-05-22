import React, { Component, PropTypes } from 'react';
import Main from 'app/components/admin/Main';
import SideBar from 'app/components/admin/SideBar';

export default class AdminPage extends Component {
  render() {
    return (
      <div className="admin-page">
        <SideBar />
        <Main children={this.props.children} onAdminSignOut={this.props.onAdminSignOut}/>
      </div>
    )
  }
}

AdminPage.propTypes = {
  onAdminSignOut: PropTypes.func.isRequired
};
