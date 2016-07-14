import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Alert,
  Col
} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/admin/FormEditShopInformation/FormEditShopInformation.i18n';

const validate = (values) => {
  let errors = {};
  let hasErrors = false;

  if(!values.name || values.name.trim() === '') {
    errors.name = 'Name cannot be blank';
    hasErrors = true;
  }
  return hasErrors && errors;
}

class FormEditShopInformation extends Component {
  render() {
    const { fields: { name, description, address }, handleSubmit, submitting, dirty, submitResult , seller, intl: { formatMessage }} = this.props;
    let sellerName = '';
    let sellerID = 0;
    if(seller) {
      sellerID = seller.id;
      sellerName = seller.fullName;
    }
    return (
      <div className="row">
        <Col lg={3}>
          <h4>
            <strong>
              <FormattedMessage {...messages.formEditShopInformation.contactInformation.sectionName}/>
            </strong>
          </h4>
          <p>
            <FormattedMessage {...messages.formEditShopInformation.contactInformation.sectionDescription}/>
          </p>
        </Col>
        <Col lg={9}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <ControlLabel>
                <FormattedMessage {...messages.formEditShopInformation.contactInformation.fields.owner}/>
              </ControlLabel>
              <FormControl.Static>
              <Link to={`/admin/users/${sellerID}/edit`}>
                {sellerName}
              </Link>
              </FormControl.Static>
            </FormGroup>
            <FormGroup
              className={`${name.touched && name.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditShopInformation.contactInformation.fields.name}/>
              </ControlLabel>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.formEditShopInformation.contactInformation.fields.name)}
                {...name} />
              <HelpBlock>{name.touched ? name.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${description.touched && description.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditShopInformation.contactInformation.fields.description}/>
              </ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder={formatMessage(messages.formEditShopInformation.contactInformation.fields.description)}
                {...description} />
              <HelpBlock>{description.touched ? description.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${address.touched && address.invalid ? 'has-error' : ''}`}>
              <ControlLabel>
                <FormattedMessage {...messages.formEditShopInformation.contactInformation.fields.address}/>
              </ControlLabel>
              <FormControl
                type="text"
                placeholder={formatMessage(messages.formEditShopInformation.contactInformation.fields.address)}
                {...address} />
              <HelpBlock>{address.touched ? address.error: '' }</HelpBlock>
            </FormGroup>
            <div className ="form-actions">
              {
                submitResult === AsyncResultCode.UPDATE_SHOP_INFORMATION_SUCCESS &&
                <Alert bsStyle="success">
                {formatMessage(messages.formEditShopInformation.contactInformation.submitResult.success)}
                </Alert>
              }
              {
                submitResult === AsyncResultCode.UPDATE_SHOP_INFORMATION_FAIL &&
                <Alert bsStyle="danger">
                {formatMessage(messages.formEditShopInformation.contactInformation.submitResult.fail)}
                </Alert>
              }
              <Button type="submit" bsStyle="success" disabled={submitting || !dirty}>
                <FormattedMessage {...messages.formEditShopInformation.contactInformation.button.saveChanges} />
              </Button>
            </div>
          </form>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialValues: state.admin.shopManagement.selectedShop
});

export default reduxForm({
  form: 'FormEditShopInformation',
  fields: ['name', 'description', 'address'],
  asyncBlurFields: ['name', 'description', 'opening'],
  validate
}, mapStateToProps, null)(injectIntl(FormEditShopInformation));
