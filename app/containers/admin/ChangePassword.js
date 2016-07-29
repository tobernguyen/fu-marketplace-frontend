import React, { Component } from 'react';
import FormChangePassword from 'app/components/admin/FormChangePassword';
import FormChangeLanguage from 'app/components/admin/FormChangeLanguage';
import { adminChangePassword } from 'app/actions/admin';
import { changeLanguage } from 'app/actions';
import { connect } from 'react-redux';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.changeLanguage = (language) => {
      this.props.changeLanguage(language);

      window.location.reload();
    }
  }

  handleChangePassword(formData) {
    const passwordToBeChanged = {
      password: formData.newPassword,
      oldPassword: formData.oldPassword
    };

    this.props.adminChangePassword(passwordToBeChanged);
  }

  render() {
    return (
      <div className="container-fluid">
        <FormChangePassword
          onSubmit={this.handleChangePassword}
          formStatus={this.props.admin.changePasswordFormStatus}
          currentUserEmail={this.props.currentUserEmail}
          />
        <hr />
        <FormChangeLanguage
          adminChangeLanguage={this.changeLanguage}
          />
      </div>
    );
  }
}


ChangePassword.path = '/settings';
ChangePassword.title = {
  id: 'breadCrumb.changePassword.title',
  defaultMessage: 'Setting'
};
ChangePassword.description = {
  id: 'breadCrumb.changePassword.description',
  defaultMessage: 'Change settings of admin site'
};
ChangePassword.faIcon = 'fa-cogs';

const mapStateToProps = (state) => ({
  admin: state.admin,
  currentUserEmail: state.user.currentUser.email
});

export default connect(mapStateToProps, {
  adminChangePassword,
  changeLanguage
})(ChangePassword);
