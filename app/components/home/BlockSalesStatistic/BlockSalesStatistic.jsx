import React, { Component, PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import './BlockSalesStatistic.scss';
import classNames from 'classnames';
import ChartSales from './ChartSales';

export default class BlockSalesStatistic extends Component {
  constructor(props) {
    super(props);

    this.reloadData = (e) => {
      e.preventDefault();
      this.props.reloadData();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.salesStatistic.updatedAt !== nextProps.salesStatistic.updatedAt || this.props.fetchingData !== nextProps.fetchingData;
  }

  render() {
    const { salesStatistic, fetchingData } = this.props;
    return (
      <div className="block-sales-statistic statistic">
        <ChartSales salesStatistic={salesStatistic} />
        {salesStatistic.updatedAt && <p className="last-updated-at">
          <FormattedMessage {...{ id: 'lastUpdatedAt', defaultMessage: 'Last Updated At:' }} /> <FormattedDate
          value={new Date(salesStatistic.updatedAt)}
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

BlockSalesStatistic.propTypes = {
  salesStatistic: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired
};
