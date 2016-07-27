import React, { Component, PropTypes } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import ChartItemSold from './ChartItemSold';

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

    return (
      <div className="block-item-sold-statistic statistic">
        <ChartItemSold itemSoldStatistic={itemSoldStatistic} />
        {itemSoldStatistic.updatedAt && <p className="last-updated-at">
          <FormattedMessage {...{ id: 'lastUpdatedAt', defaultMessage: 'Last Updated At:' }} /> <FormattedDate
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
