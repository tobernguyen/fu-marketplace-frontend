import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';

export default class BlockItemSoldStatistic extends Component {
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
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };
    return (
      <div className="block-item-sold-statistic">
        <Chart.Bar data={chartData} options={chartOptions} width="600" height="250"/>
      </div>
    )
  }
}


BlockItemSoldStatistic.propTypes = {
  itemSoldStatistic: PropTypes.object.isRequired
};
