import React, { Component } from 'react';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import classNames from 'classnames';
import _ from 'lodash';
import { FormattedMessage, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';
import ModalViewOrderFooter from 'app/components/home/ModalViewOrder/ModalViewOrderFooter.jsx';

class BlockCurrentOrderListRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpand: false
    };

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

  onMouseEnter() {
    this.setState({
      isExpand: true
    });
  }

  calculateTotalAmount(order) {
    const total = _.reduce(order.orderLines, (sum, order) => {
      return sum + (order.item.price * order.quantity);
    }, 0);
    return <FormattedNumber value={total} style="currency" currency="VND"/>;
  }
  renderNumberOfItems(order) {
    const total = _.reduce(order.orderLines, (sum, order) => {
      return sum + order.quantity
    }, 0);

    return <FormattedNumber value={total} />
  }
  render() {
    const orderCardClass = classNames({
      'order-card': true,
      'is-expand': this.state.isExpand
    });

    const { order } = this.props;
    return (
      <li className={orderCardClass} onMouseEnter={() => this.setState({ isExpand : true})} onMouseLeave={() => this.setState({ isExpand: false })}>
        <div className="preview">
          <div className="col-sm-8">
            <p><strong><FormattedMessage {...messages.modalViewOrder.body.orderId}/>: </strong> {order.id}</p>
            <p>
              <strong><FormattedMessage {...messages.modalViewOrder.body.createdAt}/></strong>
              <FormattedRelative value={new Date(order.createdAt)}/>
            </p>
            <p className="row">
              <span className="col-sm-6">
                <strong><FormattedMessage {...messages.modalViewOrder.body.numberOfItems}/></strong>
                {this.renderNumberOfItems(order)}
              </span>
              <span className="col-sm-6">
                <strong><FormattedMessage {...messages.modalViewOrder.body.table.total}/>: </strong>
                {this.calculateTotalAmount(order)}
              </span>
            </p>
            <p>
              <strong><FormattedMessage {...messages.modalViewOrder.body.note}/>: </strong>
              {order.note == '' ? <FormattedMessage {...messages.modalViewOrder.body.noNote}/> : order.note}
            </p>
          </div>
          <div className="col-sm-4">
            <p>
              <strong><FormattedMessage {...messages.modalViewOrder.body.orderStatus}/>: </strong>
              <LabelOrderStatus status={order.status}/>
            </p>
          </div>
        </div>
        <div className="detail">
          <hr />
          <h4><FormattedMessage {...messages.modalViewOrder.body.orderDetail}/></h4>
          <table className="table table-responsive table-bordered">
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
          <hr />
          <ModalViewOrderFooter
            order={order}
            acceptOrder={this.props.acceptOrder}
            rejectOrder={this.rejectOrder}
            startShippingOrder={this.props.startShippingOrder}
            completeOrder={this.props.completeOrder}
            abortOrder={this.abortOrder}
          />
        </div>
      </li>
    );
  }
}

export default injectIntl(BlockCurrentOrderListRow);
