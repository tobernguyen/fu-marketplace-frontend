import React, { Component, PropTypes } from 'react';
import FormChangePassword from 'app/components/admin/FormChangePassword';

class ChangePassword extends Component {
  render() {
    return (
      <div className="dashboard">
        <FormChangePassword />
      </div>
    );
  }
}


ChangePassword.path = '/changepwd';
ChangePassword.title = 'Change Password';
ChangePassword.description = 'Change password';
ChangePassword.faIcon = 'fa-key';

export default ChangePassword;