import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import BlockMyOrder from 'app/components/home/BlockMyOrder';
import { userGetOrder } from 'app/actions/order';
import { connect } from 'react-redux';
import { updateModalSize } from 'app/actions/common';
import { withRouter } from 'react-router'

class MyOrders extends Component {
  constructor(props) {
    super(props);
    const { page, size } = this.props.location.query;
    this.state = {
      page: page,
      size: size
    };

    this.props.userGetOrder(page, size);
    this.changePageSize = (e) => {
      const size = e.target.value;
      const { query } = this.props.location;
      const page = query.page || 1;
      this.props.router.push(`/orders?size=${size}&page=${page}`);

    }
  }

  componentWillMount() {
    this.props.updateModalSize('lg');
  }

  componentWillReceiveProps(nextProps) {
    const { page, size } = nextProps.location.query;
    if( page != this.state.page || size != this.state.size) {
      this.props.userGetOrder(page, size);
      this.setState({
        page,
        size
      });
    }
  }


  render() {
    const { page, size } = this.props.location.query;
    return (
      <div>
        <ModalHeader title="Orders" subHeader="Danh sách tất cả orders"/>
        <div className="modal-body my-order">
          <BlockMyOrder
            orders={this.props.orders}
            page={page}
            size={size}
            changePageSize={this.changePageSize}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders
  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  userGetOrder
})(withRouter(MyOrders))
