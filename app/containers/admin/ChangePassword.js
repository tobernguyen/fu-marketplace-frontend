import React, { Component, PropTypes } from 'react';
import FormChangePassword from 'app/components/admin/FormChangePassword';
import { adminChangePassword } from 'app/actions';
import { connect } from 'react-redux';

class ChangePassword extends Component {  
  render() {
    return (
      <div className="dashboard">
        <FormChangePassword
          changePassword={this.props.adminChangePassword}
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