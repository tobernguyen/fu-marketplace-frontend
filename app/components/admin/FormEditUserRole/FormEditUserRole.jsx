import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Button,
  FormGroup,
  Checkbox,
  Alert
} from 'react-bootstrap';
import _ from 'lodash';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class FormEditUserRole extends Component {
  constructor(props) {
    super(props);
    
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.state = {
      rolesToBeUpdated: []
    };
  }
  
  componentWillMount() {
    if(this.props.user) {
      this.setState({
        rolesToBeUpdated: this.props.user.roles
      });
    }
  }
  
  handleCheckboxChange(e) {
    const { rolesToBeUpdated } = this.state;
    if(_.includes(rolesToBeUpdated, e.target.value)) {
      this.setState({
        rolesToBeUpdated: _.remove(rolesToBeUpdated,(role) => role !== e.target.value)
      });
    } else {
      this.setState({
        rolesToBeUpdated: _.concat(rolesToBeUpdated, e.target.value)
      });
    }
  }
  
  updateRole() {
    const { id } = this.props.user;
    const { rolesToBeUpdated } = this.state;
    this.props.adminUpdateUserRole(id, { roles: rolesToBeUpdated});
  }
  
  render() {
    const { submitResult, isSubmitting } = this.props;
    const { rolesToBeUpdated } = this.state;
    const title = (
      <h3>Change user role</h3>
    );
    return (
      <Panel bsStyle="warning" header={title}>
      <p>User can have multiple roles ( default: <strong>Buyer</strong>)</p>
      <FormGroup defaultChecked="admin">
        <Checkbox
          inline
          value="admin"
          checked={_.includes(rolesToBeUpdated, 'admin')}
          onChange={this.handleCheckboxChange}>
          Admin
        </Checkbox>
        {' '}
        <Checkbox
          inline
          value="seller"
          checked={_.includes(rolesToBeUpdated, 'seller')}
          onChange={this.handleCheckboxChange}>
          Seller
        </Checkbox>
      </FormGroup>
      <div className="form-actions">
        {submitResult === AsyncResultCode.UPDATE_USER_ROLE_SUCCESS && <Alert bsStyle="success">User roles has been saved</Alert>}
        {submitResult === AsyncResultCode.UPDATE_USER_ROLE_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
        <Button bsStyle="warning" onClick={this.updateRole} disabled={isSubmitting}>Update roles</Button>
      </div>
      </Panel>
    );
  }
}

export default FormEditUserRole;