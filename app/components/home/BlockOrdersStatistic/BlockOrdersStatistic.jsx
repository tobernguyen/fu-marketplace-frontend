import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';
import './BlockOrdersStatistic.scss';

export default class BlockOrdersStatistic extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.ordersStatistic.updatedAt !== nextProps.ordersStatistic.updatedAt;
  }

  render() {
    const { ordersStatistic } = this.props;

    const chartData = {
      labels: ordersStatistic.labels,
      datasets: ordersStatistic.datasets
    };

    const chartOptions = {
      responsive: true
    };

    return (
      <div className="block-orders-statistic">
        <Chart.Line data={chartData} options={chartOptions} width="600" height="250"/>
      </div>
    )
  }
}

BlockOrdersStatistic.propTypes = {
  ordersStatistic: PropTypes.object.isRequired
};
