import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import './FormBuyNow.scss';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import BlockEnablePushSuggestion from 'app/components/home/BlockEnablePushSuggestion';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/FormBuyNow/FormBuyNow.i18n';

class FormBuyNow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderPlaced: false
    };

    this.submitOrder = (formData) => {
      this.props.handleExpressOrder(formData);

      this.setState({
        orderPlaced: true
      });
    }
  }
  renderFormBuyNow() {
    const {
      fields: { shipAddress, quantity, note },
      dirty,
      handleSubmit,
      item,
      isSubmitting,
      placeOrderResult
    } = this.props;
    return (
      <div>
      {item && <div className="item-preview clearfix">
        <div className="col-sm-3 image">
          <img src={item.image} className="img-responsive thumbnail"/>
        </div>
        <div className="col-sm-9 info">
          <h4>
            {item.name}
          </h4>
          <p>
            {item.price}₫ × {quantity.value} = {item.price*quantity.value}₫
          </p>
        </div>
      </div>}
      <form className="form-horizontal" onSubmit={handleSubmit(this.submitOrder)}>
        <div className={`form-group has-feedback ${shipAddress.touched && shipAddress.invalid ? 'has-error' : ''}`}>
          <label className="col-sm-3 control-label">
            <FormattedMessage {...messages.formBuyNow.modalBody.shipTo} />
          </label>
          <div className="col-sm-9 ship-address">
            <input type="text"
                   className="form-control"
              {...shipAddress} />
            <span className="glyphicon glyphicon-flag form-control-feedback"/>

            <div className="help-block">
              {shipAddress.touched && shipAddress.error ? <FormattedMessage {...shipAddress.error}/> : ''}
            </div>
          </div>

        </div>
        <div className={`form-group has-feedback  ${quantity.touched && quantity.invalid ? 'has-error' : ''}`}>
          <label className="col-sm-3 control-label">
            <FormattedMessage {...messages.formBuyNow.modalBody.quantity} />
          </label>
          <div className="col-sm-9">
            <div className="input-group">
              <span className="input-group-btn">
                  <button type="button" className="btn btn-info btn-number" onClick={() =>{ if (quantity.value > 1 ) { quantity.onChange(Number(quantity.value) - 1)}}}>
                    <span className="fa fa-minus"/>
                  </button>
              </span>
              <input type="text" className="form-control input-number" {...quantity} readOnly/>
              <span className="input-group-btn">
                  <button type="button" className="btn btn-success btn-number" onClick={() => quantity.onChange(Number(quantity.value) + 1)}>
                      <span className="fa fa-plus"/>
                  </button>
              </span>
            </div>
            <div className="help-block">
              {quantity.touched ? quantity.error : ''}
            </div>
          </div>
        </div>
        <div className={`form-group ${note.touched && note.invalid ? 'has-error' : ''}`}>
          <label className="col-sm-3 control-label">
            <FormattedMessage {...messages.formBuyNow.modalBody.note}/>
          </label>
          <div className="col-sm-9">
            <textarea type="text"
                      className="form-control"
              {...note} />
              <div className="help-block">
                {note.touched ? note.error : ''}
              </div>
          </div>
        </div>
        {placeOrderResult === AsyncResultCode.PLACE_ORDER_FAIL && <div className="alert alert-danger">
          <FormattedMessage {...messages.formBuyNow.modalBody.message.error}/>
        </div>}
        <button type="submit" className="btn btn-danger btn-block" disabled={isSubmitting || !dirty}>
          <FormattedMessage {...messages.formBuyNow.modalBody.button.placeOrder} />{' '}
          {isSubmitting && <i className="fa fa-spinner fa-spin"></i>}
        </button>
      </form>
      </div>
    );
  }
  renderInvoice() {
    return (
      <div className="alert alert-success">
        <FormattedMessage {...messages.formBuyNow.modalBody.message.orderSuccess}/><br />
        <a href="#" onClick={(e) =>{ e.preventDefault(); this.props.onHide();}}>
          <FormattedMessage {...messages.formBuyNow.modalBody.message.continueShopping} />
        </a>
      </div>
    )
  }
  render() {
    const { pushNotificationEnabled, oneSignalRegistered, placeOrderResult } = this.props;
    let modalBody = '';

    if(this.state.orderPlaced === true && placeOrderResult === AsyncResultCode.PLACE_ORDER_SUCCESS) {
      modalBody = this.renderInvoice();
    } else {
      modalBody = this.renderFormBuyNow();
    }
    return (
      <Modal className="form-buy-now" show={this.props.show} onHide={this.props.onHide} bsSize={this.props.bsSize}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FormattedMessage {...messages.formBuyNow.modalHeader.title}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BlockEnablePushSuggestion pushNotificationEnabled={pushNotificationEnabled} oneSignalRegistered={oneSignalRegistered} />
          {modalBody}
        </Modal.Body>
      </Modal>
    )
  }
}

FormBuyNow.propTypes = {
  pushNotificationEnabled: PropTypes.bool.isRequired,
  oneSignalRegistered: PropTypes.bool.isRequired
};

export default injectIntl(FormBuyNow);
