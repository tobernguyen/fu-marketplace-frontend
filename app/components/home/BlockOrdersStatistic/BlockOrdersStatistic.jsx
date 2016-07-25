import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';
import { FormattedDate } from 'react-intl';
import './BlockOrdersStatistic.scss';
import classNames from 'classnames';

export default class BlockOrdersStatistic extends Component {
  constructor(props) {
    super(props);

    this.reloadData = (e) => {
      e.preventDefault();
      this.props.reloadData();
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.ordersStatistic.updatedAt !== nextProps.ordersStatistic.updatedAt  || this.props.fetchingData !== nextProps.fetchingData;
  }

  render() {
    const { ordersStatistic, fetchingData } = this.props;

    const chartData = {
      labels: ordersStatistic.labels,
      datasets: ordersStatistic.datasets
    };

    const chartOptions = {
      responsive: true
    };

    return (
      <div className="block-orders-statistic statistic">
        <Chart.Line data={chartData} options={chartOptions} width="600" height="250"/>
        {ordersStatistic.updatedAt && <p className="last-updated-at">
          Last updated at: <FormattedDate
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
