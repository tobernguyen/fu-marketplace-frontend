import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ModalHeader from 'app/components/home/ModalHeader';
import BlockShopOpeningPendingRequests from 'app/components/home/BlockShopOpeningPendingRequests';
import RequestCreateShopForm from './RequestCreateShopForm';
import { requestCreateShop } from 'app/actions/shop';
import { updateModalSize } from 'app/actions/common';
import { getPendingRequests } from 'app/actions/shop';
import { titles } from 'app/shared/titles';
import { getUser } from 'app/selectors';


class RequestCreateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingRequestsChecked: false
    }
  }

  componentWillMount() {
    this.props.updateModalSize(null);
    this.props.getPendingRequests();
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { shopOpeningRequests, currentUser } = this.props;

    let content;
    if (shopOpeningRequests.length == 0) {
      content = <RequestCreateShopForm ownShops={currentUser.shops} onSubmit={this.props.requestCreateShop} />
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
  return {
    shopOpeningRequests: state.shop.shopOpeningRequests,
    currentUser: getUser(state)
  }
};

export default injectIntl(connect(mapStateToProps, {
  updateModalSize,
  requestCreateShop,
  getPendingRequests
})(RequestCreateShop))
