import React, { Component } from 'react';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import classNames from 'classnames';
import _ from 'lodash';
import { FormattedMessage, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';
import BlockCurrentOrderListAction from './BlockCurrentOrderListAction.jsx';
import LabelCustomerInformation from 'app/components/home/LabelCustomerInformation';
import OrderStatus from 'app/shared/orderStatus';

class BlockCurrentOrderListRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: props.order,
      isExpand: false
    };
    this.acceptOrder = () => {
      const { order } = this.state;
      this.props.acceptOrder(order.id);
      order['status'] = OrderStatus.ACCEPTED;
      this.setState({
        order
      });
    };

    this.startShippingOrder = () => {
      const { order } = this.state;
      this.props.startShippingOrder(order.id);
      order['status'] = OrderStatus.SHIPPING;
      this.setState({
        order
      });
    };

    this.completeOrder = () => {
      const { order } = this.state;
      this.props.completeOrder(order.id);
      order['status'] = OrderStatus.COMPLETED;
      this.setState({
        order
      });
    };

    this.rejectOrder = (formData) => {
      const { order } = this.state;
      const messages = {
        sellerMessage: formData.reason
      };
      this.props.rejectOrder(order.id, messages);
      order['status'] = OrderStatus.REJECTED;
      this.setState({
        order
      });
    };

    this.abortOrder = (formData) => {
      const { order } = this.state;
      const messages = {
        sellerMessage: formData.reason
      };
      this.props.abortOrder(order.id, messages);
      order['status'] = OrderStatus.ABORTED;
      this.setState({
        order
      });
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
    return <FormattedNumber value={total}/>;
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

    const { order } = this.state;
    return (
      <li className={orderCardClass}>
        <div className="preview">
          <div className="col-sm-8">
            <div><strong><FormattedMessage {...messages.modalViewOrder.body.orderId}/>: </strong> {order.id}</div>
            <div>
              <strong><FormattedMessage {...messages.modalViewOrder.body.buyer}/></strong>:{' '}
              <LabelCustomerInformation buyer={order.user}/>
            </div>
            <div>
              <strong><FormattedMessage {...messages.modalViewOrder.body.createdAt}/></strong>
              <FormattedRelative value={new Date(order.createdAt)}/>
            </div>
            <div>
              <div className="row">
              <span className="col-sm-6">
                <strong><FormattedMessage {...messages.modalViewOrder.body.numberOfItems}/></strong>
                {this.renderNumberOfItems(order)}
              </span>
                <span className="col-sm-6">
                <strong><FormattedMessage {...messages.modalViewOrder.body.table.total}/>: </strong>
                  {this.calculateTotalAmount(order)}₫
              </span>
              </div>
            </div>
            <div>
              <strong><FormattedMessage {...messages.modalViewOrder.body.note}/>: </strong>
              {order.note == '' ? <FormattedMessage {...messages.modalViewOrder.body.noNote}/> : order.note}
            </div>
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
          <BlockCurrentOrderListAction
            order={order}
            acceptOrder={this.acceptOrder}
            rejectOrder={this.rejectOrder}
            startShippingOrder={this.startShippingOrder}
            completeOrder={this.completeOrder}
            abortOrder={this.abortOrder}
          />
        </div>
      </li>
    );
  }
}

export default injectIntl(BlockCurrentOrderListRow);
