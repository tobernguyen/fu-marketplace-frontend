import React, { Component, PropTypes } from 'react';
import Chart from 'react-chartjs';
import { messages } from './SalesChart.i18n';
import assign from 'lodash.assign';
import { injectIntl } from 'react-intl';


class SalesChart extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.salesStatistic.updatedAt !== nextProps.salesStatistic.updatedAt
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { salesStatistic } = this.props;
    const translatedDataSets = salesStatistic.datasets.map(dataSet => {
      return assign({}, dataSet, {
        label: formatMessage(messages[dataSet.label])
      })
    });
    const chartData = {
      labels: salesStatistic.labels,
      datasets: translatedDataSets
    };

    const chartOptions = {
      responsive: true
    };

    return (
      <Chart.Line data={chartData} options={chartOptions} width="600" height="250"/>
    )
  }
}


SalesChart.propTypes = {
  salesStatistic: PropTypes.object
};


export default injectIntl(SalesChart);
