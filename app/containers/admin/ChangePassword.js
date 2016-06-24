import React, { Component, PropTypes } from 'react';
import FormChangePassword from 'app/components/admin/FormChangePassword';
import { adminChangePassword } from 'app/actions/admin';
import { connect } from 'react-redux';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.handleChangePassword = this.handleChangePassword.bind(this);
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
          />
      </div>
    );
  }
}


ChangePassword.path = '/changepwd';
ChangePassword.title = 'Change Password';
ChangePassword.description = 'Change password';
ChangePassword.faIcon = 'fa-key';

ChangePassword.propTypes = {
  adminChangePassword: PropTypes.func.isRequired,
  formStatus: PropTypes.object
};

const mapStateToProps = (state) => ({
  admin: state.admin
});

export default connect(mapStateToProps, {
  adminChangePassword
})(ChangePassword);