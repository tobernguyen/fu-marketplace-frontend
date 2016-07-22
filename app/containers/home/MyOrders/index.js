import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import BlockMyOrder from 'app/components/home/BlockMyOrder';
import NoActiveOrder from 'app/components/home/NoActiveOrder';
import { userGetOrder, userCancelOrder, userRateOrder } from 'app/actions/order';
import { userOpenTicket } from 'app/actions/ticket';
import { connect } from 'react-redux';
import { updateModalSize } from 'app/actions/common';
import { withRouter } from 'react-router'

const FIRST_PAGE = 1;
const DEFAULT_SIZE = 5;

class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      size: 5
    };

    this.changePageSize = (e) => {
      const size = e.target.value;
      if (!isNaN(size)) {
        this.setState({
          size: size,
          page: FIRST_PAGE
        });
        this.props.userGetOrder(FIRST_PAGE, size);
      }
    };

    this.prevPage = (e) => {
      e.preventDefault();
      if (this.state.page > FIRST_PAGE) {
        this.setState({
          page: this.state.page - 1
        }, () => {
          this.props.userGetOrder(this.state.page, this.state.size);
        })
      }
    };

    this.nextPage = (e) => {
      e.preventDefault();
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.props.userGetOrder(this.state.page, this.state.size);
      })
    }

    this.renderBody = () => {
      const { page, size } = this.state;
      const { orders } = this.props;
      if( orders.length === 0 )  {
        return <NoActiveOrder />
      }
      return <BlockMyOrder
          orders={orders}
          page={page}
          size={size}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          changePageSize={this.changePageSize}
          cancelOrder={this.props.userCancelOrder}
          rateOrder={this.props.userRateOrder}
          openTicket={this.props.userOpenTicket}
          ticket={this.props.ticket}
        />;
    }

  }

  componentWillReceiveProps(nextProps) {
    const { shouldUpdateOrderList } = nextProps;
    const { page, size } = this.state;
    if ( shouldUpdateOrderList ) {
      this.props.userGetOrder(page,size);
    }
  }

  componentWillMount() {
    this.props.updateModalSize('lg');
    this.props.userGetOrder(FIRST_PAGE, DEFAULT_SIZE);
  }

  render() {
    return (
      <div>
        <ModalHeader title="Đơn hàng" subHeader="Danh sách tất cả đơn hàng"/>
        <div className="modal-body my-order">
        {this.renderBody()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    ticket: state.ticket,
    shouldUpdateOrderList: state.order.shouldUpdateOrderList
  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  userGetOrder,
  userCancelOrder,
  userRateOrder,
  userOpenTicket
})(withRouter(MyOrders))
