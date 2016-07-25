import React, { Component } from 'react';
import './BlockMyOrder.scss';
import BlockMyOrderFooter from './BlockMyOrderFooter.jsx'
import ModalOpenTicket from './ModalOpenTicket.jsx';
import ModalCancelOrder from './ModalCancelOrder.jsx';
import ModalSellerMessage from './ModalSellerMessage.jsx';
import { FormattedMessage, injectIntl } from 'react-intl';
import { messages } from 'app/components/home/BlockMyOrder/BlockMyOrder.i18n';
import { Link } from 'react-router';
import BlockMyOrderRow from './BlockMyOrderRow.jsx';

class BlockMyOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showSellerMessageModal: false,
      showOpenTicketModal: false,
      selectedOrderID: null,
      selectedOrder: {}
    };

    this.openModal = (orderID) => {
      this.setState({
        showModal: true,
        selectedOrderID: orderID
      });
    };

    this.closeModal= () => {
      this.setState({
        showModal: false,
        selectedOrderID: null
      });
    };

    this.openSellerMessageModal = (order) => {
      this.setState({
        selectedOrder: order,
        showSellerMessageModal: true
      });
    }

    this.openOpenTicketModal = (order) => {
      this.setState({
        selectedOrder: order,
        showOpenTicketModal: true
      });
    }

    this.closeSellerMessageModal = () => {
      this.setState({
        selectedOrder: {},
        showSellerMessageModal: false
      });
    }

    this.closeOpenTicketModal = () => {
      this.setState({
        selectedOrder: {},
        showOpenTicketModal: false
      });
    }

    this.userCancelOrder = () => {
      const { selectedOrderID } = this.state;
      this.props.cancelOrder(selectedOrderID);
      this.setState({
        showModal: false
      });
    };

    this.renderOrderList = this.renderOrderList.bind(this);
  }

  renderOrderList(orders) {
    return (
      <table className="table table-responsive table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th className="col-lg-2"><FormattedMessage {...messages.myOrder.tableHead.item}/></th>
            <th className="col-lg-2"><FormattedMessage {...messages.myOrder.tableHead.shop}/></th>
            <th className="col-lg-1"><FormattedMessage {...messages.myOrder.tableHead.total} /></th>
            <th className="col-lg-2"><FormattedMessage {...messages.myOrder.tableHead.time} /></th>
            <th className="col-lg-2"><FormattedMessage {...messages.myOrder.tableHead.status}/></th>
            <th className="col-lg-2"><FormattedMessage {...messages.myOrder.tableHead.action}/></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order =>
            <BlockMyOrderRow
              order={order}
              openModal={this.openModal}
              openSellerMessageModal={this.openSellerMessageModal}
              openOpenTicketModal={this.openOpenTicketModal}
              rateOrder={this.props.rateOrder}
              key={order.id} />
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
    let output;
    if (!orders || orders.length == 0) {
      output = this.renderEmptyOrderList();
    } else {
      output = this.renderOrderList(orders);
    }
    return output;
  }

  render() {
    const { orders, page, changePageSize, size, prevPage, nextPage } = this.props;
    return (
      <div>
        {this.renderMyOrder(orders)}
        <ModalCancelOrder
          showModal={this.state.showModal}
          closeModal={this.closeModal}
          cancelOrder={this.userCancelOrder}
        />
        <ModalSellerMessage
          showModal={this.state.showSellerMessageModal}
          closeModal={this.closeSellerMessageModal}
          order={this.state.selectedOrder}
        />
        <ModalOpenTicket
          showModal={this.state.showOpenTicketModal}
          closeModal={this.closeOpenTicketModal}
          order={this.state.selectedOrder}
          openTicket={this.props.openTicket}
          ticket={this.props.ticket}
        />
        <BlockMyOrderFooter
          page={page}
          orders={orders}
          size={size}
          prevPage={prevPage}
          nextPage={nextPage}
          changePageSize={changePageSize} />
      </div>
    );
  }
}

export default injectIntl(BlockMyOrder);
