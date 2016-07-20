import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';

export default class BlockSalesStatistic extends Component {
  render() {
    const { salesStatistic } = this.props;

    const chartData = {
      labels: salesStatistic.labels,
      datasets: salesStatistic.datasets
    };

    const chartOptions = {
      responsive: true
    };
    return (
      <div className="block-sales-statistic">
        <Chart.Bar data={chartData} options={chartOptions} width="600" height="250"/>
      </div>
    )
  }
}

BlockSalesStatistic.propTypes = {
  salesStatistic: PropTypes.object.isRequired
};
