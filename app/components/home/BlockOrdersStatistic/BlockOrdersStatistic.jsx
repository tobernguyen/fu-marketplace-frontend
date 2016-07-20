import React, { Component, PropTypes } from 'react';

export default class BlockOrdersStatistic extends Component {
  render() {
    const { ordersStatistic } = this.props;
    console.log(ordersStatistic);
    return (
      <div className="block-orders-statistic">
        BlockOrdersStatistic
      </div>
    )
  }
}

BlockOrdersStatistic.propTypes = {
  ordersStatistic: PropTypes.object.isRequired
};
