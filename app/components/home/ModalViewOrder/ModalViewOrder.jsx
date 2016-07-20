import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { FormattedMessage, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import ModalViewOrderFooter from './ModalViewOrderFooter.jsx';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import LabelCustomerInformation from 'app/components/home/LabelCustomerInformation';
import './ModalViewOrder.scss';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';
import _ from 'lodash';

class ModalViewOrder extends Component {
  constructor(props) {
    super(props);

    this.rejectOrder = (formData) => {
      const { order } = this.props;
      const messages = {
        sellerMessage: formData.reason
      };
      this.props.rejectOrder(order.id, messages);
    }

    this.abortOrder = (formData) => {
      const { order } = this.props;
      const messages = {
        sellerMessage: formData.reason
      };
      this.props.abortOrder(order.id, messages);
    }
  }
  calculateTotal(order) {
    const total = _.reduce(order.orderLines, (sum, order) => {
      return sum + (order.item.price * order.quantity);
    }, 0);
    return <FormattedNumber value={total} />;
  }
  render() {
    const { order } = this.props;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>
          <FormattedMessage {...messages.modalViewOrder.title}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            <FormattedMessage {...messages.modalViewOrder.body.orderLines}/>
          </h4>
          <div className="well">
            <table className="table table-responsive order-items">
              <thead>
                <tr>
                  <th>#</th>
                  <th><FormattedMessage {...messages.modalViewOrder.body.table.item}/></th>
                  <th><FormattedMessage {...messages.modalViewOrder.body.table.quantity}/></th>
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
                      {orderLine.note}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <strong><FormattedMessage {...messages.modalViewOrder.body.table.total}/>: </strong>
            {this.calculateTotal(order)}₫
          </div>
          <hr />
          <h4>
            <FormattedMessage {...messages.modalViewOrder.body.referenceInformation}/>
          </h4>
          <div>
            <div className="form-group">
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.modalViewOrder.body.buyer}/>:
              </label>
              <div class="col-sm-9">
                <LabelCustomerInformation buyer={order.user}/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.modalViewOrder.body.shipAddress}/>:
              </label>
              <div class="col-sm-9">
                <p class="form-control-static">{order.shipAddress}</p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.modalViewOrder.body.note}/>:
              </label>
              <div class="col-sm-9">
                <p class="form-control-static">{order.note}</p>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">
                <FormattedMessage {...messages.modalViewOrder.body.orderStatus}/>:
              </label>
              <div class="col-sm-9">
                <LabelOrderStatus status={order.status}/>
                <FormattedMessage {...messages.modalViewOrder.body.updatedAt} />
                <FormattedRelative value={new Date(order.updatedAt)}/>
              </div>
            </div>
          </div>
          <hr />
          <ModalViewOrderFooter
            order={order}
            acceptOrder={this.props.acceptOrder}
            rejectOrder={this.rejectOrder}
            startShippingOrder={this.props.startShippingOrder}
            completeOrder={this.props.completeOrder}
            abortOrder={this.abortOrder}
          />
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
