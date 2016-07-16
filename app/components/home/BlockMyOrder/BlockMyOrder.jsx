import React, { Component } from 'react';
import './BlockMyOrder.scss';
import BlockMyOrderFooter from './BlockMyOrderFooter.jsx'
import ModalCancelOrder from './ModalCancelOrder.jsx';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import { Link } from 'react-router';
import BlockMyOrderRow from './BlockMyOrderRow.jsx';

class BlockMyOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      selectedOrderID: null
    };

    this.openModal = (orderID) => {
      this.setState({
        showModal: true,
        selectedOrderID: orderID
      });
    }

    this.closeModal= () => {
      this.setState({
        showModal: false,
        selectedOrderID: null
      });
    }

    this.userCancelOrder = () => {
      const { selectedOrderID } = this.state;
      this.props.cancelOrder(selectedOrderID);
      this.setState({
        showModal: false
      });
    }

    this.renderOrderList = this.renderOrderList.bind(this);
  }

  renderOrderList(orders) {
    return (
      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th><FormattedMessage {... messages.myOrder.tableHead.item}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.total} /></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.shipAddress}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.time} /></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.finishedTime}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.status}/></th>
            <th><FormattedMessage {...messages.myOrder.tableHead.action}/></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <BlockMyOrderRow
              order={order}
              openModal={this.openModal}
              rateOrder={this.props.rateOrder}
              key={order.id}
              />
          )}
        </tbody>
      </table>
    );
  }
  renderEmptyOrderList() {
    return (
    <div className="alert alert-warning">
      <FormattedMessage {...messages.myOrder.emptyOrderList.message.text}/>
      <Link to="/" ><FormattedMessage {...messages.myOrder.emptyOrderList.link}/></Link>
    </div>
    );
  }
  renderMyOrder(orders) {
    let output = '';
    if (!orders || orders.length == 0) {
      output = this.renderEmptyOrderList();
    } else {
      output = this.renderOrderList(orders);
    }
    return output;
  }
  render() {
    const { orders, page, changePageSize, size } = this.props;
    return (
      <div>
        {this.renderMyOrder(orders)}
        <ModalCancelOrder
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          cancelOrder={this.userCancelOrder}
        />
        <BlockMyOrderFooter
          page={page}
          orders={orders}
          size={size}
          changePageSize={changePageSize}
        />
      </div>
    );
  }
}

export default injectIntl(BlockMyOrder);
