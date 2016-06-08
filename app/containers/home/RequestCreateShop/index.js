import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalHeader from 'app/components/home/ModalHeader';
import RequestCreateShopForm from './RequestCreateShopForm';
import { updateModalSize } from 'app/actions';
import { requestCreateShop } from 'app/actions/shop';

class RequestCreateShop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateModalSize(null);
  }

  render() {
    return (
      <div>
        <ModalHeader title="Đăng ký mở shop"/>
        <div className="modal-body">
          <RequestCreateShopForm onSubmit={this.props.requestCreateShop} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {

  }
};

export default connect(mapStateToProps, {
  updateModalSize,
  requestCreateShop
})(RequestCreateShop)
