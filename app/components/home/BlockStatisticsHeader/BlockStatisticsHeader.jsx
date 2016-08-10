import React, { Component, PropTypes } from 'react';
import './BlockStatisticsHeader.scss';
import { FormattedMessage } from 'react-intl';
import { messages } from './BlockStatisticsHeader.i18n';
import classNames from 'classnames';

class BlockStatisticsHeader extends Component {
  render() {

    return (
      <div className="block-statistics-header clearfix">
        <h4 className="title">
          <FormattedMessage {...messages.title}/>
          <p className="shop-name">
            {this.props.sellerShop.name}
          </p>
        </h4>
        <div className="btn-group switch-mode pull-right">
          {this.props.statisticModes.map((mode, index) =>
            <button key={index}
                    className={classNames('btn', { 'active': index === this.props.activeMode })}
                    onClick={() => this.props.switchMode(index)}>
              <FormattedMessage {...messages[mode]}/>
            </button>
          )}
        </div>
      </div>
    )
  }
}

BlockStatisticsHeader.propTypes = {
  statisticModes: PropTypes.array.isRequired,
  activeMode: PropTypes.number.isRequired,
  switchMode: PropTypes.func.isRequired
};

export default BlockStatisticsHeader;
