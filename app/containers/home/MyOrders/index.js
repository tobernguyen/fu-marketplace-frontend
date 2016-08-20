import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import BlockMyOrder from 'app/components/home/BlockMyOrder';
import NoActiveOrder from 'app/components/home/NoActiveOrder';
import { userGetOrderOfNextPage, userGetOrder, userCancelOrder, userRateOrder, changeOrderStatus,  userNextPageOrder } from 'app/actions/order';
import { userOpenTicket, userCloseNewTicketModal } from 'app/actions/ticket';
import { connect } from 'react-redux';
import { updateModalSize } from 'app/actions/common';
import { withRouter } from 'react-router'
import { injectIntl, intlShape } from 'react-intl';
import { PulseLoader } from 'halogen';

const FIRST_PAGE = 1;
const DEFAULT_SIZE = 5;

class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: FIRST_PAGE,
      size: DEFAULT_SIZE
    };

    this.changePageSize = (e) => {
      const size = e.target.value;
      if (!isNaN(size)) {
        this.setState({
          size: size,
          page: FIRST_PAGE
        });
        this.props.userGetOrder(FIRST_PAGE, size);
        this.props.userGetOrderOfNextPage(FIRST_PAGE, size);
      }
    };

    this.prevPage = (e) => {
      e.preventDefault();
      if (this.state.page > FIRST_PAGE) {
        this.setState({
          page: this.state.page - 1
        }, () => {
          this.props.userGetOrder(this.state.page, this.state.size);
          this.props.userGetOrderOfNextPage(this.state.page, this.state.size);
        })
      }
    };

    this.nextPage = (e) => {
      e.preventDefault();
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.props.userGetOrderOfNextPage(this.state.page, this.state.size);
      });
      
      this.props.userNextPageOrder();
    };

    this.renderBody = () => {
      const { page, size } = this.state;
      const { orders, isFetching, hasNextPage, isFetchingNextPage } = this.props;
      if(isFetching || isFetchingNextPage) {
        return (
          <div className="text-center" style={{
            'height': '50px',
            'width': '100%',
            'padding': '20px'
          }}>
            <PulseLoader className="feed-loader" color="#b1211e" size="12px" />
          </div>
        );
      }
      if( orders.length === 0 )  {
        return <NoActiveOrder />
      }
      return <BlockMyOrder
          changeOrderStatus={this.props.changeOrderStatus}
          socket={this.props.socket}
          orders={orders}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          page={page}
          size={size}
          prevPage={this.prevPage}
          nextPage={this.nextPage}
          changePageSize={this.changePageSize}
          cancelOrder={this.props.userCancelOrder}
          rateOrder={this.props.userRateOrder}
          openTicket={this.props.userOpenTicket}
          userCloseNewTicketModal={this.props.userCloseNewTicketModal}
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
    this.props.userGetOrderOfNextPage(FIRST_PAGE, DEFAULT_SIZE);
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <ModalHeader query={this.props.query}
                     title={formatMessage({ id: 'page.title.myOrders', defaultMessage: 'My Orders' })}
                     subHeader={formatMessage({ id: 'page.subHeader.myOrders', defaultMessage: 'All orders' })} />
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
    isFetching: state.order.isFetching,
    isFetchingNextPage: state.order.isFetchingNextPage,
    hasNextPage: state.order.hasNextPage,
    ticket: state.ticket,
    shouldUpdateOrderList: state.order.shouldUpdateOrderList,
    query: state.common.query,
    socket: state.common.socket
  }
};

MyOrders.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(connect(mapStateToProps, {
  updateModalSize,
  userGetOrder,
  userCancelOrder,
  userRateOrder,
  userOpenTicket,
  changeOrderStatus,
  userCloseNewTicketModal,
  userGetOrderOfNextPage,
  userNextPageOrder
})(withRouter(MyOrders)))
