import React, { Component } from 'react';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import classNames from 'classnames';
import _ from 'lodash';
import { FormattedMessage, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/ModalViewOrder/ModalViewOrder.i18n';
import BlockCurrentOrderListAction from './BlockCurrentOrderListAction.jsx';
import LabelCustomerInformation from 'app/components/home/LabelCustomerInformation';
import OrderStatus from 'app/shared/orderStatus';
import LabelItem from './LabelItem.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class BlockCurrentOrderListRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order: props.order,
      canceled: false,
      countingDown: false
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
      this.hideOrder();
      setTimeout(() => {
        this.props.removeOrder(order.id);
      }, 7000);
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
      this.hideOrder();
      setTimeout(() => {
        this.props.removeOrder(order.id);
      }, 7000);
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
      this.hideOrder();
      setTimeout(() => {
        this.props.removeOrder(order.id);
      }, 7000);
    }

    this.hideOrder = () => {
      this.setState({
        countingDown: true
      });
      setTimeout(() => {
        this.setState({
          canceled: true,
          countingDown: false
        });
      }, 6000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.order.status === OrderStatus.CANCELED ) {
      const { order } = this.state;
      order['status'] = OrderStatus.CANCELED;
      this.setState({
        order
      });
      this.hideOrder();
    }
  }

  calculateTotalAmount(order) {
    const total = _.reduce(order.orderLines, (sum, order) => {
      return sum + (order.item.price * order.quantity);
    }, 0);
    return <FormattedNumber value={total}/>;
  }

  render() {
    const { order, countingDown } = this.state;
    const orderCardClass = classNames({
      'order-card': true
    });

    const shrinkingClassName = classNames({
      'shrinking': true,
      'hide': !countingDown
    });
    const output = (
      <div className={orderCardClass} key={order.id}>
        {
          countingDown ?
          <div className="timerwrapper">
            <div className={shrinkingClassName}></div>
          </div> : <div className="timerwrapper-placeholder"></div>
        }
        <div className="preview clearfix">
          <div className="col-sm-8">
            <div><strong><FormattedMessage {...messages.modalViewOrder.body.orderId}/>: </strong> {order.id}</div>
            <div>
              <div className="row">
                <span className="col-sm-6">
                  <strong><FormattedMessage {...messages.modalViewOrder.body.buyer}/></strong>:{' '}
                  <LabelCustomerInformation buyer={order.user}/>
                </span>
                <span className="col-sm-6">
                <strong><FormattedMessage {...messages.modalViewOrder.body.createdAt}/></strong>
                <FormattedRelative value={new Date(order.createdAt)}/>
                </span>
              </div>
            </div>
            <div className="order-item">
              <strong><FormattedMessage {...messages.modalViewOrder.body.table.item}/>: </strong>
              {
                order.orderLines.map(orderLine =>
                  <LabelItem orderLine={orderLine} key={orderLine.item.id}/>
                )
              }
            </div>
            <div>
              <strong><FormattedMessage {...messages.modalViewOrder.body.table.total}/>: </strong>
              {this.calculateTotalAmount(order)}₫
            </div>
            <div>
              <strong><FormattedMessage {...messages.modalViewOrder.body.note}/>: </strong>
              {order.note == '' ? <FormattedMessage {...messages.modalViewOrder.body.noNote}/> : order.note}
            </div>
            </div>
          <div className="col-sm-3">
            <p>
              <strong><FormattedMessage {...messages.modalViewOrder.body.orderStatus}/>: </strong>
              <LabelOrderStatus status={order.status}/>
            </p>
          </div>
          <div className="col-sm-1">
            <button type="button" className="btn btn-warning" style={{ 'padding': '1px 6px'}}onClick={() => this.props.viewOrder(order)}>
              <i className="fa fa-eye"></i>
            </button>
          </div>
        </div>
        <hr />
        <div className="current-order-action">
        <BlockCurrentOrderListAction
          order={order}
          acceptOrder={this.acceptOrder}
          rejectOrder={this.rejectOrder}
          startShippingOrder={this.startShippingOrder}
          completeOrder={this.completeOrder}
          abortOrder={this.abortOrder}
        />
        </div>
      </div>
    );

    return (
      <ReactCSSTransitionGroup
        transitionName="dynamicOrderCard"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        >
        { !this.state.canceled && output}
      </ReactCSSTransitionGroup>
    );
  }
}

export default injectIntl(BlockCurrentOrderListRow);
