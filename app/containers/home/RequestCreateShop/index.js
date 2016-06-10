import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ModalHeader from 'app/components/home/ModalHeader';
import RequestCreateShopForm from './RequestCreateShopForm';
import { requestCreateShop } from 'app/actions/shop';
import { updateModalMode, updateModalSize } from 'app/actions/common';
import { titles } from 'app/shared/titles';

class RequestCreateShop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateModalSize(null);
    this.props.updateModalMode(true);
  }

  componentWillUnmount() {
    this.props.updateModalMode(false);
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className="request-create-shop">
        <ModalHeader title={formatMessage(titles.openShop.title)}/>
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

export default injectIntl(connect(mapStateToProps, {
  updateModalSize,
  requestCreateShop,
  updateModalMode
})(RequestCreateShop))
