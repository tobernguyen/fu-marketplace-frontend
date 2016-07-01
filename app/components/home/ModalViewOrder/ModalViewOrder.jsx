import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';
import './ModalViewOrder.scss';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';

class ModalViewOrder extends Component {
  calculateTotal(orderLine) {
    const total= orderLine.quantity * orderLine.item.price;
    return <FormattedNumber value={total} />
  }
  render() {
    const { order } = this.props;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
        <Modal.Header>
          <Modal.Title>
          <FormattedMessage {...messages.modalViewOrder.title}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">
            <FormattedMessage {...messages.modalViewOrder.body.shipAddress}/>
            </label>
            <div className="col-sm-10">
              <p className="form-control-static">{order.shipAddress}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
            <FormattedMessage {...messages.modalViewOrder.body.note}/>
            </label>
            <div className="col-sm-10">
              <p className="form-control-static">{order.note}</p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">
            <FormattedMessage {...messages.modalViewOrder.body.orderLines}/>:
            </label>
          </div>

          <table className="table table-responsive order-items">
            <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.item}/></th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.quantity}/></th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.total}/></th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.note}/></th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {order.orderLines.map((orderLine,index) =>
              <tr key={index}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <strong>{orderLine.item.name}</strong>
                  <p><FormattedNumber value={orderLine.item.price}/>₫</p>
                </td>
                <td>
                  {orderLine.quantity}
                </td>
                <td>
                  {this.calculateTotal(orderLine)}₫
                </td>
                <td>
                  {orderLine.note}
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </form>
        </Modal.Body>
      </Modal>
    );
  }
}

ModalViewOrder.defaultProps = {
  order: {
    orderLine: [{}]
  }
}

export default injectIntl(ModalViewOrder);