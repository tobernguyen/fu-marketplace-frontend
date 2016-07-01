import React, { Component } from 'react';
import ModalHeader from 'app/components/home/ModalHeader';
import { connect } from 'react-redux';
import { updateModalMode, updateModalSize } from 'app/actions/common';

class MyOrders extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.updateModalSize('lg');
    this.props.updateModalMode(true);
  }

  componentWillUnmount() {
    this.props.updateModalMode(false);
  }

  render() {
    return (
      <div>
        <ModalHeader title="Orders" subHeader="Danh sách tất cả orders"/>
        <div className="modal-body">
          My orders
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {

  }
};

export default connect(mapStateToProps, {
  updateModalMode,
  updateModalSize
})(MyOrders)
