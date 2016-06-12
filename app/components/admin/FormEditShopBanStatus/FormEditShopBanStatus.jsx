import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Button,
  FormGroup,
  FormControl,
  Alert
} from 'react-bootstrap';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class FormEditShopBanStatus extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: ''
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  
  handleOnChange(e) {
    this.setState({
      name: e.target.value
    });
  }
  
  handleOnClick() {
    const { shop } = this.props;
    if(this.state.name === shop.name) {
      if(shop.banned === false) {
        this.props.adminBanShop();
      } else if ( shop.banned === true) {
        this.props.adminUnbanShop();
      }
    }
  }
  
  render() {
    const title = (
      <h3>Ban shop</h3>
    );
    const { shop, isSubmitting, submitResult } = this.props;
    return(
      <Panel bsStyle="danger" header={title}>
        <p>This action will {shop.banned ? 'release' : 'ban'} shop,
        please type <strong>{shop.name}</strong> to confirm this action.</p>
        <FormGroup>
          <FormControl
            type="text"
            name="name"
            onChange={this.handleOnChange}
            />
          <div className="form-actions">
            {submitResult === AsyncResultCode.BAN_SHOP_SUCCESS && <Alert bsStyle="danger">Shop has been banned</Alert>}
            {submitResult === AsyncResultCode.BAN_SHOP_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
            {submitResult === AsyncResultCode.UNBAN_SHOP_SUCCESS && <Alert bsStyle="danger">Shop has been released</Alert>}
            {submitResult === AsyncResultCode.UNBAN_SHOP_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
            
            <Button
              bsStyle="danger"
              onClick={this.handleOnClick}
              disabled={isSubmitting}>
              {shop.banned ? 'Release' : 'Ban'}
            </Button>
          </div>
        </FormGroup>
      </Panel>
    );
  }
}

export default FormEditShopBanStatus;