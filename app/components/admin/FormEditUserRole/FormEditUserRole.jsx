import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  Checkbox,
  Alert,
  Col
} from 'react-bootstrap';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditUserRole/FormEditUserRole.i18n';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class FormEditUserRole extends Component {
  constructor(props) {
    super(props);

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.state = {
      isValid: false,
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

    this.setState({
      isValid: true
    });
  }

  updateRole() {
    const { id } = this.props.user;
    const { rolesToBeUpdated } = this.state;
    this.props.adminUpdateUserRole(id, { roles: rolesToBeUpdated});
    this.setState({
      isValid: false
    });
  }

  render() {
    const { submitResult, isSubmitting, intl: { formatMessage } } = this.props;
    const { rolesToBeUpdated, isValid } = this.state;
    return (
      <div className="row">
        <Col lg={3}>
          <h4 className="role-title">
            <strong>
              <FormattedMessage {...messages.formEditUserRole.sectionName}/>
            </strong>
          </h4>
          <p>
          </p>
          <FormattedMessage {...messages.formEditUserRole.sectionDescription}/>
        </Col>
        <Col lg={9}>
          <FormGroup className="role-checkboxes ship-place-checkbox-wrapper">
            <Checkbox
              value="admin"
              checked={_.includes(rolesToBeUpdated, 'admin')}
              onChange={this.handleCheckboxChange}>
              <i className="fa fa-user-secret fa-fw"></i>
              <div className="role-name">
                <FormattedMessage {...messages.formEditUserRole.role.admin} />
              </div>
              <div className="role-description">
                <FormattedMessage {...messages.formEditUserRole.roleDescription.admin}/>
              </div>
            </Checkbox>
            {' '}
            <Checkbox
              value="seller"
              checked={_.includes(rolesToBeUpdated, 'seller')}
              onChange={this.handleCheckboxChange}>
              <i className="fa fa-shopping-bag fa-fw"></i>
              <div className="role-name">
                <FormattedMessage {...messages.formEditUserRole.role.seller} />
              </div>
              <div className="role-description">
                <FormattedMessage {...messages.formEditUserRole.roleDescription.seller}/>
              </div>
            </Checkbox>
          </FormGroup>
          <div className="form-actions">
            {
              submitResult === AsyncResultCode.UPDATE_USER_ROLE_SUCCESS &&
              <Alert bsStyle="success">
                <FormattedMessage {...messages.formEditUserRole.submitResult.success}/>
              </Alert>
            }
            {
              submitResult === AsyncResultCode.UPDATE_USER_ROLE_FAIL &&
              <Alert bsStyle="danger">
                <FormattedMessage {...messages.formEditUserRole.submitResult.fail}/>
              </Alert>
            }
            <Button bsStyle="warning" onClick={this.updateRole} disabled={isSubmitting || !isValid }>
              {formatMessage(messages.formEditUserRole.button.updateRole)}
            </Button>
          </div>
        </Col>
      </div>
    );
  }
}

export default injectIntl(FormEditUserRole);
