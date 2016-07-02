import React, { Component } from 'react';
import { Modal, Dropdown } from 'react-bootstrap';
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl';
import RejectOrderForm from 'app/containers/home/SellerDashboard/ManageOrders/RejectOrderForm';
import './ModalViewOrder.scss';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';

class ModalViewOrder extends Component {
  constructor(props) {
    super(props);

    this.rejectOrder = (formData) => {
      const { order } = this.props;
      const messages = {
        "sellerMessage": formData.reason
      }
      this.props.rejectOrder(order.id, messages);
    }
  }
  calculateTotal(orderLine) {
    const total= orderLine.quantity * orderLine.item.price;
    return <FormattedNumber value={total} />
  }
  renderAction(order) {
    let output = '';
    switch (order.status) {
      case 0:
        output = <div className="btn-toolbar">
            <button type="button" className="btn btn-success" onClick={() => this.props.acceptOrder(order.id)}>
              <FormattedMessage {...messages.modalViewOrder.button.accept} />
            </button>
            <Dropdown id="FormRejectOrder">
            <button type="button" className="btn btn-danger" bsRole="toggle">
              <FormattedMessage {...messages.modalViewOrder.button.reject} />
            </button>
            <RejectOrderForm
              bsRole="menu"
              onSubmit={this.rejectOrder}
              />
            </Dropdown>
          </div>
          break;
      case 1:
        output = <div className="text-center"><h4><FormattedMessage {...messages.modalViewOrder.orderStatus.accepted}/></h4></div>
        break;
      case 4:
        output = <div className="text-center"><h4><FormattedMessage {...messages.modalViewOrder.orderStatus.rejected}/></h4></div>
        break;
      default:
        output = 'Coming soon...';
    }
    return output;
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { order } = this.props;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>
          <FormattedMessage {...messages.modalViewOrder.title}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

          <table className="table table-responsive table-striped order-items">
            <thead>
            <tr>
              <th>#</th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.item}/></th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.quantity}/></th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.total}/></th>
              <th><FormattedMessage {...messages.modalViewOrder.body.table.note}/></th>
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
          {this.renderAction(order)}
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
