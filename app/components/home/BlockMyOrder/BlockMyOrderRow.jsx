import React, { Component } from 'react';
import { FormattedMessage, FormattedTime, FormattedNumber, FormattedRelative, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import { Link } from 'react-router';
import _ from 'lodash';
import OrderStatus from 'app/shared/orderStatus';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import { Tooltip, OverlayTrigger} from 'react-bootstrap';

class BlockMyOrderRow extends Component {
  renderItemNameList(order) {
    let names = [];
    order.orderLines.map(orderLine => {
      names = _.concat(names, orderLine.item.name);
    });
    return _.join(names, ', ');
  }

  renderItemNameListWithQuantity(order) {
    let names = [];
    order.orderLines.map(orderLine => {
      names = _.concat(names, `${orderLine.item.name}(${orderLine.quantity})`);
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
          <button type="button" className="btn btn-warning order-status" onClick={() => this.props.openModal(order.id)}>
            <FormattedMessage {...messages.myOrder.button.abort} />
          </button>
        );
        break;
      case OrderStatus.REJECTED:
        output = (
          <button type="button" className="btn order-status btn-info seller-message" onClick={() => this.props.openSellerMessageModal(order)}>
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
    const tooltip = (
      <Tooltip id="tooltip">
        <div>
          {this.renderItemNameListWithQuantity(order)}
        </div>
      </Tooltip>
    );
    return (
      <tr>
        <td>{order.id}</td>
        <td>
          <OverlayTrigger placement="top" overlay={tooltip}>
          <div className="order-item-list">
          {this.renderItemNameList(order)}
          </div>
          </OverlayTrigger>
        </td>
        <td><Link to={`/shops/${order.shopId}`}>{order.shopName}</Link></td>
        <td>{this.calculateTotalAmount(order)}₫</td>
        <td><FormattedRelative value={new Date(order.createdAt)}/></td>
        <td><LabelOrderStatus status={order.status}/></td>
        <td>
          <button type="button" className="btn order-status btn-danger" onClick={() => this.props.openOpenTicketModal(order)}>
            <FormattedMessage {...messages.myOrder.button.report} />
          </button>
          {this.renderAction(order)}
        </td>
      </tr>
    );
  }
}

export default injectIntl(BlockMyOrderRow);
