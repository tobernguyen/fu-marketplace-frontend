import React, { Component, PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import './BlockOrdersStatistic.scss';
import classNames from 'classnames';
import ChartOrders from './ChartOrders';

export default class BlockOrdersStatistic extends Component {
  constructor(props) {
    super(props);

    this.reloadData = (e) => {
      e.preventDefault();
      this.props.reloadData();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.ordersStatistic.updatedAt !== nextProps.ordersStatistic.updatedAt || this.props.fetchingData !== nextProps.fetchingData;
  }

  render() {
    const { ordersStatistic, fetchingData } = this.props;
    return (
      <div className="block-orders-statistic statistic">
        <ChartOrders ordersStatistic={ordersStatistic} />
        {ordersStatistic.updatedAt && <p className="last-updated-at">
          <FormattedMessage {...{ id: 'lastUpdatedAt', defaultMessage: 'Last Updated At:' }} /> <FormattedDate
          value={new Date(ordersStatistic.updatedAt)}
          hour='numeric'
          minute='numeric'
          second='numeric'
          year='numeric'
          month='numeric'
          day='numeric'/>
          <button className={classNames('refresh-btn btn', { 'btn-info': !fetchingData  })} disabled={fetchingData} onClick={this.reloadData}>
            <i className={classNames('fa fa-refresh', { 'fa-spin': fetchingData })}/>
          </button>
        </p>}
      </div>
    )
  }
}

BlockOrdersStatistic.propTypes = {
  ordersStatistic: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired
};
