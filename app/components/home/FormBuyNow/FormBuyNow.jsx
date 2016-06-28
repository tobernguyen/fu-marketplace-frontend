import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './FormBuyNow.scss';

export default class FormBuyNow extends Component {
  render() {
    const {
      fields: { shipAddress, quantity, note },
      dirty,
      handleSubmit,
      item,
      submitting,
      placeOrderResult
    } = this.props;
    return (
      <Modal className="form-buy-now" show={this.props.show} onHide={this.props.onHide} bsSize={this.props.bsSize}>
        <Modal.Header closeButton>
          <Modal.Title>
            Order Now
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <form className="form-horizontal" onSubmit={handleSubmit}>
            <div className={`form-group has-feedback ${shipAddress.touched && shipAddress.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                Ship to
              </label>
              <div className="col-sm-9 ship-address">
                <input type="text"
                       className="form-control"
                  {...shipAddress} />
                <span className="glyphicon glyphicon-flag form-control-feedback"/>

                <div className="help-block">
                  {shipAddress.touched ? shipAddress.error : ''}
                </div>
              </div>

            </div>
            <div className={`form-group has-feedback  ${quantity.touched && quantity.invalid ? 'has-error' : ''}`}>
              <label className="col-sm-3 control-label">
                Quantity
              </label>
              <div className="col-sm-9">
                <div className="input-group">
                  <span className="input-group-btn">
                      <button type="button" className="btn btn-info btn-number" onClick={() => quantity.onChange(--quantity.value)}>
                        <span className="glyphicon glyphicon-minus"/>
                      </button>
                  </span>
                  <input type="text" className="form-control input-number" {...quantity}/>
                  <span className="input-group-btn">
                      <button type="button" className="btn btn-success btn-number" onClick={() => quantity.onChange(++quantity.value)}>
                          <span className="glyphicon glyphicon-plus"/>
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
                Note
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
            {placeOrderResult === 'SUCCESS' && <div className="alert alert-success">Order has been placed</div>}
            {placeOrderResult === 'FAIL' && <div className="alert alert-danger">Error occured!</div>}
            <button type="submit" className="btn btn-danger btn-block" disabled={submitting || !dirty}>
              Place order
            </button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}
