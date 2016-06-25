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
import AsyncResultCode from 'app/shared/asyncResultCodes';

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
    const { fields: { name, description, address }, handleSubmit, submitting, submitResult , seller} = this.props;
    let sellerName = '';
    if(seller) {
      sellerName = seller.fullName;
    }
    return (
      <div className="row">
        <Col lg={3}>
          <h4><strong>Contact information</strong></h4>
          <p>Shop contact information</p>
        </Col>
        <Col lg={9}>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <ControlLabel>Owner</ControlLabel>
              <FormControl.Static>
                {sellerName}
              </FormControl.Static>
            </FormGroup>
            <FormGroup
              className={`${name.touched && name.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Name"
                {...name} />
              <HelpBlock>{name.touched ? name.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${description.touched && description.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Description"
                {...description} />
              <HelpBlock>{description.touched ? description.error: '' }</HelpBlock>
            </FormGroup>
            <FormGroup
              className={`${address.touched && address.invalid ? 'has-error' : ''}`}>
              <ControlLabel>Address</ControlLabel>
              <FormControl
                type="text"
                placeholder="Address"
                {...address} />
              <HelpBlock>{address.touched ? address.error: '' }</HelpBlock>
            </FormGroup>
            <div className ="form-actions">
              {submitResult === AsyncResultCode.UPDATE_SHOP_INFORMATION_SUCCESS && <Alert bsStyle="success">Shop information has been saved</Alert>}
              {submitResult === AsyncResultCode.UPDATE_SHOP_INFORMATION_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
              <Button type="submit" bsStyle="success" disabled={submitting}>
                Save changes
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
}, mapStateToProps, null)(FormEditShopInformation);