import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import './FormBuyNow.scss';

export default class FormBuyNow extends Component {
  render() {
    const {
      fields: { shipAddress, quantity, note },
      handleSubmit,
      item
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
                {item.price}₫ × 3 = 85000₫
              </p>
            </div>
          </div>}
          <form className="form-horizontal">
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
                      <button className="btn btn-info btn-number">
                        <span className="glyphicon glyphicon-minus"/>
                      </button>
                  </span>
                  <input type="text" className="form-control input-number" {...quantity}/>
                  <span className="input-group-btn">
                      <button type="button" className="btn btn-success btn-number">
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
            <button type="submit" className="btn btn-danger btn-block">
              Place order
            </button>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}