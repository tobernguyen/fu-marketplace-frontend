import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';
import Chart from 'react-chartjs';
import classNames from 'classnames';

export default class BlockItemSoldStatistic extends Component {
  constructor(props) {
    super(props);

    this.reloadData = (e) => {
      e.preventDefault();
      this.props.reloadData();
    }
  }
  shouldComponentUpdate(nextProps) {
    return this.props.itemSoldStatistic.updatedAt !== nextProps.itemSoldStatistic.updatedAt || this.props.fetchingData !== nextProps.fetchingData;
  }

  render() {
    const { itemSoldStatistic, fetchingData } = this.props;

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
          stacked: true,
          ticks: {
            stepSize: 1
          }
        }]
      }
    };
    return (
      <div className="block-item-sold-statistic statistic">
        <Chart.Bar data={chartData} options={chartOptions} width="600" height="250"/>
        {itemSoldStatistic.updatedAt && <p className="last-updated-at">
          Last updated at: <FormattedDate
          value={new Date(itemSoldStatistic.updatedAt)}
          hour='numeric'
          minute='numeric'
          second='numeric'
          year='numeric'
          month='numeric'
          day='numeric'/>
          <button className={classNames('refresh-btn btn', { 'btn-info': !fetchingData })} disabled={fetchingData} onClick={this.reloadData}>
            <i className={classNames('fa fa-refresh', { 'fa-spin': fetchingData })}/>
          </button>
        </p>}
      </div>
    )
  }
}


BlockItemSoldStatistic.propTypes = {
  itemSoldStatistic: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired
};
