import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Checkbox,
  Alert,
  Col
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
    return (
      <div className="row">
        <Col lg={3}>
          <h4 className="role-title"><strong>Role</strong></h4>
          <p>Assign role</p>
        </Col>
        <Col lg={9}>
          <FormGroup defaultChecked="admin" className="role-checkboxes">
            <Checkbox
              value="admin"
              checked={_.includes(rolesToBeUpdated, 'admin')}
              onChange={this.handleCheckboxChange}>
              <i className="fa fa-user-secret fa-fw"></i>
              <div className="role-name">
                Admin
              </div>
              <div className="role-description">
                Admin can access to admin dashboard and manage FU Marketplace system.
              </div>
            </Checkbox>
            {' '}
            <Checkbox
              value="seller"
              checked={_.includes(rolesToBeUpdated, 'seller')}
              onChange={this.handleCheckboxChange}>
              <i className="fa fa-shopping-bag fa-fw"></i>
              <div className="role-name">
                Seller
              </div>
              <div className="role-description">
                Seller can create shop
              </div>
            </Checkbox>
          </FormGroup>
          <div className="form-actions">
            {submitResult === AsyncResultCode.UPDATE_USER_ROLE_SUCCESS && <Alert bsStyle="success">User roles has been saved</Alert>}
            {submitResult === AsyncResultCode.UPDATE_USER_ROLE_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
            <Button bsStyle="warning" onClick={this.updateRole} disabled={isSubmitting}>Update roles</Button>
          </div>
        </Col>
      </div>
    );
  }
}

export default FormEditUserRole;