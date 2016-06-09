import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class FormEditUserRole extends Component {
  render() {
    const { adminUpdateUserRole, fields: { id, roles}, handleSubmit, submitting, formStatus} = this.props;
    
    if(!formStatus.isFetching) {
      return (
        <form onSubmit={handleSubmit(adminUpdateUserRole)}>
          <div className="form-actions">
            <Button bsStyle="warning" type="submit">Save changes</Button>
          </div>
        </form>
      );
    } else {
      return (
        <div>...loading</div>
      );
    }
  }
}

export default FormEditUserRole;