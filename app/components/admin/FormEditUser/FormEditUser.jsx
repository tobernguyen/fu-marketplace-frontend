import React, { Component } from 'react';
import {
  Panel
} from 'react-bootstrap';
import FormEditUserInformation from 'app/containers/admin/FormEditUserInformation';
import FormEditUserRole from 'app/containers/admin/FormEditUserRole';
import FormBanUser from 'app/containers/admin/FormBanUser';
import './FormEditUser.scss';

class FormEditUser extends Component {
  render() {
    const { formStatus:{ isFetching, user } } = this.props;
    if(!isFetching) {
      const informationPanelTitle= (
        <h3>{`Edit ${user.email}`}</h3>
      );
      const rolePanelTitle= (
        <h3>{`Change role of ${user.email}`}</h3>
      );
      const banPanelTitle= (
        <h3>{`Ban ${user.email}`}</h3>
      );
      
      return(
        <div>
          <Panel header={informationPanelTitle}>
            <FormEditUserInformation />
          </Panel>
          <Panel header={rolePanelTitle} bsStyle="warning">
            <FormEditUserRole />
          </Panel>
          <Panel header={banPanelTitle} bsStyle="danger">
            <FormBanUser />
          </Panel>
        </div>
      );
    } else {
      return(
        <div>Loading...</div>
      );
    }
    
  }
}

export default FormEditUser;