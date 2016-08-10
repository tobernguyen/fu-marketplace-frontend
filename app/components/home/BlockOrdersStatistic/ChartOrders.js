import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';
import { messages } from './ChartOrders.i18n';
import assign from 'lodash.assign';
import { injectIntl } from 'react-intl';

class ChartOrders extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.ordersStatistic.updatedAt !== nextProps.ordersStatistic.updatedAt
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { ordersStatistic } = this.props;
    const translatedDataSets = ordersStatistic.datasets.map(dataSet => {
      return assign({}, dataSet, {
        label: formatMessage(messages[dataSet.label])
      })
    });

    const chartData = {
      labels: ordersStatistic.labels,
      datasets: translatedDataSets
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

ChartOrders.propTypes = {
  ordersStatistic: PropTypes.object
};

export default injectIntl(ChartOrders);
