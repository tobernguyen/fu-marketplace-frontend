import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';

export default class ChartItemSold extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.itemSoldStatistic.updatedAt !== nextProps.itemSoldStatistic.updatedAt
  }

  render() {
    const { itemSoldStatistic } = this.props;
    const chartData = {
      labels: itemSoldStatistic.labels,
      datasets: itemSoldStatistic.datasets
    };

    const chartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            stepSize: 1
          }
        }]
      }
    };

    return (
      <Chart.Bar data={chartData} options={chartOptions} width="600" height="250"/>
    )
  }
}

ChartItemSold.propTypes = {
  itemSoldStatistic: PropTypes.object
};
