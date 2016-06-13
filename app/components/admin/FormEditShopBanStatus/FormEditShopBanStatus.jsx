import React, { Component, PropTypes } from 'react';
import {
  Panel,
  Button,
  FormGroup,
  FormControl,
  Alert,
  Col
} from 'react-bootstrap';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class FormEditShopBanStatus extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      isValid: false
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  
  handleOnChange(e) {
    this.setState({
      name: e.target.value
    });
    if (e.target.value === this.props.shop.name) {
      this.setState({
        isValid: true
      });
    } else {
      this.setState({
        isValid: false
      });
    }
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
      <div className="row">
        <div className="container">
          <Col lg={3}>
            <h4 className="ban-title"><strong>Ban</strong></h4>
          </Col>
          <Col lg={9}>
            <FormGroup>
              <FormControl
                type="text"
                name="name"
                onChange={this.handleOnChange}
                />
            </FormGroup>
            <ul>
              <li>Shop will be banned from FU Marketplace</li>
              <li>Banned shop won't be list in feeds or access by buyer</li>
              <li>Type <code>{shop.name}</code> to confirm banning this user</li>
            </ul>
            <div className="form-actions">
                {submitResult === AsyncResultCode.BAN_SHOP_SUCCESS && <Alert bsStyle="danger">Shop has been banned</Alert>}
                {submitResult === AsyncResultCode.BAN_SHOP_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
                {submitResult === AsyncResultCode.UNBAN_SHOP_SUCCESS && <Alert bsStyle="danger">Shop has been released</Alert>}
                {submitResult === AsyncResultCode.UNBAN_SHOP_FAIL && <Alert bsStyle="danger">Error occurred!</Alert>}
                
                <Button
                  bsStyle="danger"
                  onClick={this.handleOnClick}
                  disabled={isSubmitting || !this.state.isValid}>
                  {shop.banned ? 'Release' : 'Ban'}
                </Button>
              </div>
          </Col>
        </div>
      </div>
    );
  }
}

export default FormEditShopBanStatus;