import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import BlockMyOrder from 'app/components/home/BlockMyOrder';
import { userGetOrder } from 'app/actions/order';
import { connect } from 'react-redux';
import { updateModalSize } from 'app/actions/common';

class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.props.userGetOrder();
  }

  componentWillMount() {
    this.props.updateModalSize('lg');
  }


  render() {
    return (
      <div>
        <ModalHeader title="Orders" subHeader="Danh sách tất cả orders"/>
        <div className="modal-body">
          <BlockMyOrder
            orders={this.props.orders}
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
})(MyOrders)
