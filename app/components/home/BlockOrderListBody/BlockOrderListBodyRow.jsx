import React, { Component } from 'react';
import { FormattedRelative, FormattedNumber } from 'react-intl';
import LabelOrderStatus from 'app/components/home/LabelOrderStatus';
import _ from 'lodash';
import { Tooltip, OverlayTrigger} from 'react-bootstrap';
import LabelCustomerInformation from 'app/components/home/LabelCustomerInformation';

class BlockOrderListBodyRow extends Component {
  renderItemNameListWithQuantity(order) {
    let names = [];
    order.orderLines.map(orderLine => {
      names = _.concat(names, `${orderLine.item.name}(${orderLine.quantity})`);
    });
    return _.join(names, ', ');
  }

  renderItemNameList(order) {
    let names = [];
    order.orderLines.map(orderLine => {
      names = _.concat(names, orderLine.item.name);
    });
    return _.toString(names);
  }
  calculateTotalAmount(order) {
    const total = _.reduce(order.orderLines, (sum, order) => {
      return sum + (order.item.price * order.quantity);
    }, 0);
    return <FormattedNumber value={total}/>;
  }

  render() {
    const { order, viewOrder } = this.props;
    const tooltip = (
      <Tooltip id="tooltip">
        <div>
          {this.renderItemNameListWithQuantity(order)}
        </div>
      </Tooltip>
    );
    return (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>
          <OverlayTrigger placement="top" overlay={tooltip}>
          <div className="order-item-list">
          {this.renderItemNameList(order)}
          </div>
          </OverlayTrigger>
        </td>
        <td>
          <LabelCustomerInformation buyer={order.user}/>
        </td>
        <td>
        {this.calculateTotalAmount(order)}₫
        </td>
        <td>
        {order.shipAddress}
        </td>
        <td>
        <FormattedRelative value={new Date(order.createdAt)} />
        </td>
        <td>
          <LabelOrderStatus status={order.status}/>
        </td>
        <td>
          <button className="btn btn-warning" onClick={() => viewOrder(order)}><i className="fa fa-eye"></i></button>
        </td>
      </tr>
    )
  }

}

export default BlockOrderListBodyRow;
