import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormEditUser from 'app/components/admin/FormEditUser';
import { adminGetUser } from 'app/actions';

class EditUser extends Component {
  componentWillMount() {
    this.props.adminGetUser(this.props.params.userId);
  }
  render() {
    return(
      <div className="container">
        <FormEditUser formStatus={this.props.formStatus}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  formStatus: state.admin.editUserFormStatus
});

export default connect(mapStateToProps, {
  adminGetUser
})(EditUser);