import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';
import { FormattedDate } from 'react-intl';
import './BlockSalesStatistic.scss';
import classNames from 'classnames';


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
    const chartData = {
      labels: salesStatistic.labels,
      datasets: salesStatistic.datasets
    };

    const chartOptions = {
      responsive: true
    };
    return (
      <div className="block-sales-statistic statistic">
        <Chart.Line data={chartData} options={chartOptions} width="600" height="250"/>
        {salesStatistic.updatedAt && <p className="last-updated-at">
          Last updated at: <FormattedDate
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
