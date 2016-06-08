import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ModalHeader from 'app/components/home/ModalHeader';
import RequestCreateShopForm from './RequestCreateShopForm';
import { updateModalSize } from 'app/actions';
import { requestCreateShop } from 'app/actions/shop';
import { titles } from 'app/shared/titles';

class RequestCreateShop extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.updateModalSize(null);
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
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
  requestCreateShop
})(RequestCreateShop))
