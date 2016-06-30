import React, { Component, PropTypes } from 'react'
import './FormCheckOut.scss';
import AsyncResultCode from 'app/shared/asyncResultCodes';

class FormCheckOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderPlaced: false
    }

    const { fields: { items }, removeFromCartItem } = this.props;  
    this.handleRemoveCartItem = (index, itemID) => {
      removeFromCartItem(itemID);
      items.removeField(index);
    }

    this.submitOrder = (formData) => {
      this.props.submitOrder(formData);
      this.setState({
        orderPlaced: true
      });
    }
  }

  renderNoCartItemMessage() {
    // TODO: @dong.do: Design UI for this case
    return (
      <div className="alert alert-warning">
        Your cart is empty.
        Click <a href="#" onClick={(e) =>{ e.preventDefault(); this.props.hideModal();}}>here</a> to continue shopping
      </div>
    )
  }

  renderSuccessPlaceOrder() {
    const { fields: { note, shipAddress, items } } = this.props;
    return (
      <div>
      <div className="alert alert-success">
        Your order is placed.
        Click <a href="#" onClick={(e) =>{ e.preventDefault(); this.props.hideModal();}}>here</a> to continue shopping
      </div>
      <table className="table table-responsive order-items">
          <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Note</th>
            <th>Total</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
            const { name, price, image, id } = item;
            return (
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td className="item">
                  <div className="as-table">
                    <div>
                      <div className="image">
                        <img className="thumbnail" src={image.value} />
                      </div>
                      <div className="info">
                        <h4>{name.value}</h4>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="quantity">
                  <p>{item.quantity.value}</p>
                </td>
                <td className="note">
                  <p>{item.note.value}</p>
                </td>
                <td>
                  <p>{Number(item.quantity.value) * Number(price.value)}₫</p>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    )
  }

  renderCheckOutForm() {
    const { fields: { note, shipAddress, items }, handleSubmit, submitting, dirty, invalid, orderResult } = this.props;
    return (
      <form className="form-horizontal" onSubmit={handleSubmit(this.submitOrder)}>
        <div className={`form-group has-feedback  ${shipAddress.touched && shipAddress.invalid ? 'has-error' : ''}`}>
          <label className="col-sm-2 control-label">
            Ship To
          </label>
          <div className="col-sm-10 ship-address">
            <input
              type="text"
              className="form-control"
              {...shipAddress} />
            <span className="glyphicon glyphicon-flag form-control-feedback"/>
            <div className="help-block">
              {shipAddress.touched ? shipAddress.error : ''}
            </div>
          </div>
          
        </div>
        <div className='form-group'>
          <label className="col-sm-2 control-label">
            Note
          </label>
            <div className="col-sm-10">
              <textarea
                type="text"
                className="form-control"
                placeholder=""
                {...note} />
            </div>
        </div>

        <table className="table table-responsive order-items">
          <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Note</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
            const { name, price, image, id } = item;
            return (
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td className="item">
                  <div className="as-table">
                    <div>
                      <div className="image">
                        <img className="thumbnail" src={image.value} />
                      </div>
                      <div className="info">
                        <h4>{name.value}</h4>
                        <p>{price.value}₫</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="quantity">
                  <div className="input-group">
                      <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn btn-warning btn-number"
                            onClick={() => {
                              if( item.quantity.value > 0 ) {
                                item.quantity.onChange(Number(item.quantity.value) -1);
                              }
                            }}>
                            <span className="fa fa-minus"/>
                          </button>
                      </span>
                    <input type="text" className="form-control input-number" {...item.quantity} />
                      <span className="input-group-btn">
                          <button
                            type="button"
                            className="btn btn-success btn-number"
                            onClick={() => {
                              item.quantity.onChange(Number(item.quantity.value) + 1);
                            }}>
                              <span className="fa fa-plus"/>
                          </button>
                      </span>
                  </div>
                </td>
                <td className="note">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder=""
                      {...item.note} />
                </td>
                <td className="delete">
                  <button
                    className="btn btn-danger fa fa-trash"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleRemoveCartItem(index, id.value)
                    }}/>
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
        {orderResult === AsyncResultCode.PLACE_ORDER_FAIL && <div className="alert alert-danger">Error occured!</div>}
        <button type="submit"
                className="btn btn-danger btn-block"
                disabled={submitting || !dirty || invalid }>
          Place order
        </button>
      </form>
    );
  }

  render() {
    const { fields: { items } ,orderResult } = this.props;
    const { orderPlaced } = this.state;
    let output;
    if(orderPlaced === true && orderResult === AsyncResultCode.PLACE_ORDER_SUCCESS) { //If order is placed, display a summary with success alert
      output = this.renderSuccessPlaceOrder();
    } else if(orderPlaced === false || orderResult !== AsyncResultCode.PLACE_ORDER_SUCCESS){
      if (items.length === 0) {
        output = this.renderNoCartItemMessage()
      } else {
        output = this.renderCheckOutForm();
      }
    }
    

    return (
      <div className="form-check-out">
        {output}
      </div>
    );
  }
}

export default FormCheckOut
