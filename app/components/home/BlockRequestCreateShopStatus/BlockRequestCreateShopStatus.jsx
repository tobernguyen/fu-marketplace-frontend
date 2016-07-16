import React, { Component, PropTypes } from 'react';
import { DotLoader } from 'halogen';
import BlockRequestCreateShopSummary from '../BlockRequestCreateShopSummary';
import './BlockRequestCreateShopStatus.scss';


export default class BlockRequestCreateShopStatus extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      request: null,
      error: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.request) {
      this.setState({
        loading: false,
        request: nextProps.request
      })
    }

    if (nextProps.error) {
      this.setState({
        loading: false,
        error: nextProps.error
      })
    }
  }

  render() {
    return (
      <div className="block-request-create-shop-status">
        {this.state.loading && <DotLoader className="loader" color="#C0392B" size="120px" margin="4px"/>}
        {this.state.error && <div className="error">
          <div className="row">
            <i className="fa fa-exclamation-circle error-icon"/>
          </div>
          <div className="row">
            <strong className="error-text">
              {this.state.error.message_code}
            </strong>
          </div>
        </div>}
        {this.state.request && <BlockRequestCreateShopSummary requestSummary={this.state.request} />}
      </div>
    )
  }
}
