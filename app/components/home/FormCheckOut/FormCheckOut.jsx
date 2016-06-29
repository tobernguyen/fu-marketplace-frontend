import React, { Component, PropTypes } from 'react'
import './FormCheckOut.scss';

class FormCheckOut extends Component {

  render() {
    const { fields: { note, shipAddress, items }, handleSubmit, submitting, dirty, invalid } = this.props;
    return (
      <div className="form-check-out">
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
              placeholder="Con gai ship, ship truoc 12h"
              {...note} />
          </div>

          <table className="table table-responsive order-items">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Note</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {items.map((item, index) => {
              const { name, price, image } = item;
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
                      placeholder="Add your special request for this item"
                      {...item.note} />
                  </td>
                  <td className="delete">
                    <button
                      className="btn btn-danger fa fa-trash"
                      onClick={() => {
                        items.removeField(index)
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
      </div>
    );
  }
}

export default FormCheckOut
