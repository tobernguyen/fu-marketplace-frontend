import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ModalHeader from 'app/components/home/ModalHeader';
import BlockShopOpeningPendingRequests from 'app/components/home/BlockShopOpeningPendingRequests';
import RequestCreateShopForm from './RequestCreateShopForm';
import { requestCreateShop } from 'app/actions/shop';
import { updateModalMode, updateModalSize } from 'app/actions/common';
import { getPendingRequests } from 'app/actions/shop';
import { titles } from 'app/shared/titles';

class RequestCreateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingRequestsChecked: false
    }
  }

  componentWillMount() {
    this.props.updateModalSize(null);
    this.props.updateModalMode(true);
    this.props.getPendingRequests();
  }

  componentWillUnmount() {
    this.props.updateModalMode(false);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { shopOpeningRequests } = this.props;

    let content;
    if (shopOpeningRequests.length == 0) {
      content = <RequestCreateShopForm onSubmit={this.props.requestCreateShop} />
    } else {
      content = <BlockShopOpeningPendingRequests shopOpeningRequests={this.props.shopOpeningRequests} />
    }

    return (
      <div className="request-create-shop">
        <ModalHeader title={formatMessage(titles.openShop.title)}/>
        <div className="modal-body">
          {content}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    shopOpeningRequests: shop.shopOpeningRequests
  }
};

export default injectIntl(connect(mapStateToProps, {
  updateModalSize,
  requestCreateShop,
  updateModalMode,
  getPendingRequests
})(RequestCreateShop))
