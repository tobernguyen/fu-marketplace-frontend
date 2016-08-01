import React, { Component } from 'react'
import './FormCheckOut.scss';
import AsyncResultCode from 'app/shared/asyncResultCodes';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from './FormCheckOut.i18n';

class FormCheckOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderPlaced: false,
      items: []
    };

    const { fields: { items }, removeFromCartItem } = this.props;
    this.handleRemoveCartItem = (index, itemID) => {
      removeFromCartItem(itemID);
      items.removeField(index);
    };

    this.submitOrder = (formData) => {
      this.props.submitOrder(formData);
      this.setState({
        orderPlaced: true,
        items: formData.items
      });
    }
  }

  renderNoCartItemMessage() {
    return (
      <div className="alert alert-warning">
        <FormattedMessage {...messages.formCheckOut.emptyCart}/>{'. '}
        <a href="#" onClick={(e) =>{ e.preventDefault(); this.props.hideModal();}}>
          <FormattedMessage {...messages.formCheckOut.continueShopping}/>
        </a>
      </div>
    )
  }

  renderSuccessPlaceOrder() {
    const { items } = this.state;
    return (
      <div>
      <div className="alert alert-success">
        <FormattedMessage {...messages.formCheckOut.orderPlaced}/>{'. '}
        <a href="#" onClick={(e) =>{ e.preventDefault(); this.props.hideModal();}}>
          <FormattedMessage {...messages.formCheckOut.continueShopping}/>
        </a>
      </div>
      <table className="table table-responsive order-items">
          <thead>
          <tr>
            <th>#</th>
            <th><FormattedMessage {...messages.formCheckOut.tableHead.item}/></th>
            <th><FormattedMessage {...messages.formCheckOut.tableHead.quantity}/></th>
            <th><FormattedMessage {...messages.formCheckOut.tableHead.note}/></th>
            <th><FormattedMessage {...messages.formCheckOut.tableHead.total}/></th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
            const { name, price, image } = item;
            return (
              <tr key={items.id}>
                <td>
                  {index + 1}
                </td>
                <td className="item">
                  <div className="as-table">
                    <div>
                      <div className="image">
                        <img className="thumbnail" src={image} />
                      </div>
                      <div className="info">
                        {name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="quantity">
                  <p>{item.quantity}</p>
                </td>
                <td className="note">
                  <p>{item.note}</p>
                </td>
                <td>
                  <p>{Number(item.quantity) * Number(price)}₫</p>
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
    const { fields: { note, shipAddress, items }, handleSubmit, dirty, invalid, orderResult, isSubmitting } = this.props;
    return (
      <form className="form-horizontal" onSubmit={handleSubmit(this.submitOrder)}>
        <div className={`form-group has-feedback  ${shipAddress.touched && shipAddress.invalid ? 'has-error' : ''}`}>
          <label className="col-sm-2 control-label">
            <FormattedMessage {...messages.formCheckOut.tableHead.shipTo}/>
          </label>
          <div className="col-sm-10 ship-address">
            <input
              type="text"
              className="form-control"
              {...shipAddress} />
            <span className="glyphicon glyphicon-flag form-control-feedback"/>
            <div className="help-block">
              {shipAddress.touched && shipAddress.error? <FormattedMessage {...shipAddress.error}/> : ''}
            </div>
          </div>

        </div>
        <div className='form-group'>
          <label className="col-sm-2 control-label">
            <FormattedMessage {...messages.formCheckOut.tableHead.note}/>
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
            <th><FormattedMessage {...messages.formCheckOut.tableHead.item} /></th>
            <th><FormattedMessage {...messages.formCheckOut.tableHead.quantity} /></th>
            <th><FormattedMessage {...messages.formCheckOut.tableHead.note} /></th>
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
                    <input type="text" className="form-control input-number quantity-input" {...item.quantity} readOnly/>
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
        {orderResult === AsyncResultCode.PLACE_ORDER_FAIL && <div className="alert alert-danger">Error occurred!</div>}
        <button type="submit"
                className="btn btn-danger btn-block"
                disabled={isSubmitting || invalid }>
          <FormattedMessage {...messages.formCheckOut.button.placeOrder} />{' '}{isSubmitting && <i className="fa fa-spinner fa-spin"/>}
        </button>
      </form>
    );
  }

  render() {
    const {
      fields: { items },
      orderResult
    } = this.props;
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

export default injectIntl(FormCheckOut);
