import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockSellerDashboardSideBar from 'app/components/home/BlockSellerDashboardSideBar';
import BlockOrdersStatistic from 'app/components/home/BlockOrdersStatistic';
import BlockStatisticsHeader from 'app/components/home/BlockStatisticsHeader';
import Sticky from 'react-stickynode';
import { getShopStatistics, STATISTIC_TYPE } from '../../../../actions/statistic';
import _ from 'lodash';

const STATISTIC_MODE = _.toArray(STATISTIC_TYPE);

class Statistics extends Component {
  constructor(props) {
    super(props);

    const { shopID } = this.props.params;

    this.state = {
      statisticModes: _.values(STATISTIC_TYPE),
      activeMode: 0
    };

    this.handleSwitchMode = (mode) => {
      this.setState({
        activeMode: mode
      });
    }
  }

  componentWillMount() {
    this.props.getShopStatistics(this.props.params.shopID, STATISTIC_MODE[this.state.activeMode]);
  }

  render() {
    const { activeMode } = this.state;
    const { ordersStatistic, salesStatistic, itemSoldStatistic } = this.props;
    return (
      <div className="container home-body">
        <div className="seller-dashboard">
          <div className="col-md-9">
            <div className="row">
              <BlockStatisticsHeader
                activeMode={this.state.activeMode}
                statisticModes={this.state.statisticModes}
                switchMode={this.handleSwitchMode} />
            </div>
            <div className="row">
              {activeMode === 0 && <BlockOrdersStatistic ordersStatistic={ordersStatistic} />}
            </div>
          </div>
          <div className="col-md-3">
            <Sticky enabled={true} top={60}>
              <BlockSellerDashboardSideBar
                sellerShop={this.props.sellerShop} />
            </Sticky>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { shop, statistic } = state;
  return {
    sellerShop: shop.sellerShop,
    ordersStatistic: statistic.ordersStatistic,
    salesStatistic: statistic.salesStatistic,
    itemSoldStatistic: statistic.itemSoldStatistic
  }
};

export default connect(mapStateToProps, {
  getShopStatistics
})(Statistics)
