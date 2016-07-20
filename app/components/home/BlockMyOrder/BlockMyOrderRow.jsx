import React, { Component } from 'react';
import { FormattedMessage, FormattedTime, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import _ from 'lodash';
import OrderStatus from 'app/shared/orderStatus';
import BlockStars from 'app/components/home/BlockStars';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';

class BlockMyOrderRow extends Component {
  constructor(props) {
    super(props);


    this.rateOrder = (rate) => {
      const { order } = this.props;
      this.props.rateOrder(order.id, rate);
    }
  }

  renderItemNameList(order) {
    let names = [];
    order.orderLines.map(orderLine => {
      names = _.concat(names, orderLine.item.name);
    });
    return _.join(names, ', ');
  }

  calculateTotalAmount(order) {
    const total = _.reduce(order.orderLines, (sum, order) => {
      return sum + (order.item.price * order.quantity);
    }, 0);
    return <FormattedNumber value={total} />;
  }

  renderFinishTime(order) {
    if (order.status === 3) { //Order is completed
      return <FormattedTime value={new Date(order.createdAt)}/>
    } else {
      return <FormattedMessage {...messages.myOrder.tableBody.notFinish}/>
    }
  }

  renderAction(order) {
    let output;
    switch (order.status) {
      case OrderStatus.NEW:
        output = (
          <button type="button" className="btn order-status btn-cancel" onClick={() => this.props.openModal(order.id)}>
            <FormattedMessage {...messages.myOrder.button.abort} />
          </button>
        );
        break;
      case OrderStatus.COMPLETED:
      case OrderStatus.ABORTED:
        output = (
          <BlockStars
            name={`rate-order-${order.id}`}
            value={order.rate || 0}
            onStarClick={this.rateOrder}
            key={order.id}
          />
        );
        break;
      case OrderStatus.REJECTED:
        output = (
          <button type="button" className={`btn order-status status-${OrderStatus.REJECTED} seller-message`} onClick={() => this.props.openSellerMessageModal(order)}>
            <i className="fa fa-info"></i>
          </button>
        );
        break;
      default:
    }
    return output;
  }

  render() {
    const { order } = this.props;
    return (
      <tr>
        <td>{order.id}</td>
        <td>{this.renderItemNameList(order)}</td>
        <td>{this.calculateTotalAmount(order)}₫</td>
        <td>{order.shipAddress}</td>
        <td><FormattedRelative value={new Date(order.createdAt)}/></td>
        <td>{this.renderFinishTime(order)}</td>
        <td><LabelOrderStatus status={order.status}/></td>
        <td className="text-center">
          {this.renderAction(order)}
        </td>
      </tr>
    );
  }
}

export default injectIntl(BlockMyOrderRow);
