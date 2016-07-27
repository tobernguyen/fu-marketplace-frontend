import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';

export default class ChartOrders extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.ordersStatistic.updatedAt !== nextProps.ordersStatistic.updatedAt
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
      <Chart.Line data={chartData} options={chartOptions} width="600" height="250"/>
    )
  }
}

ChartOrders.propTypes = {
  ordersStatistic: PropTypes.object
};
