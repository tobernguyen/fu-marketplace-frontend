import React, { Component, PropTypes } from 'react'
import './FormCheckOut.scss';

class FormCheckOut extends Component {
  constructor(props) {
    super(props);

    const { fields: { items }, removeFromCartItem } = this.props;
    this.handleRemoveCartItem = (index, itemID) => {
      removeFromCartItem(itemID);
      items.removeField(index);
    }
  }

  renderNoCartItemMessage() {
    // TODO: @dong.do: Design UI for this case
    return (
      <div>
        No item to check out
      </div>
    )
  }

  renderCheckOutForm() {
    const { fields: { note, shipAddress, items }, handleSubmit, submitting, dirty, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className={`form-group has-feedback  ${shipAddress.touched && shipAddress.invalid ? 'has-error' : ''}`}>
          <label className="control-label">
            Ship To
          </label>
          <input type="text"
                 className="form-control"
            {...shipAddress} />
          <div className="help-block">
            {shipAddress.touched ? shipAddress.error : ''}
          </div>
        </div>
        <div className='form-group'>
          <label className="control-label">
            Note
          </label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Con gai ship, ship truoc 12h, mang theo tien le"
              {...note} />
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
                          <button className="btn btn-warning btn-number">
                            <span className="fa fa-minus"/>
                          </button>
                      </span>
                    <input type="text" className="form-control input-number" {...item.quantity}/>
                      <span className="input-group-btn">
                          <button type="button" className="btn btn-success btn-number">
                              <span className="fa fa-plus"/>
                          </button>
                      </span>
                  </div>
                </td>
                <td className="note">
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Special request for this item"
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
        <button type="submit"
                className="btn btn-danger btn-block"
                disabled={submitting || !dirty || invalid}>
          Place order
        </button>
      </form>
    );
  }

  render() {
    const { fields: { items } } = this.props;
    let output;
    if (items.length === 0) {
      output = this.renderNoCartItemMessage()
    } else {
      output = this.renderCheckOutForm();
    }

    return (
      <div className="form-check-out">
        {output}
      </div>
    );
  }
}

export default FormCheckOut
