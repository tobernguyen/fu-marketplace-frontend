import React, { Component, PropTypes } from 'react';
import './BlockDormList.scss';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { messages } from './BlockDormList.i18n';

export default class BlockDormList extends Component {
  render() {
    const { shipPlaces, query } = this.props;
    let placeID;
    if (query && query.hasOwnProperty('ship_to')) {
      placeID = parseInt(query.ship_to);
    }
    return (
      <div className="block-dorm-list block">
        <h3 className="title">
          <FormattedMessage {...messages.shipPlace} />
        </h3>
        <div className="clearfix body">
          <div className="tag-list">
            <Link
              to={{
                    pathname: '/',
                    query: _.assign({}, query, {
                      ship_to: undefined
                    })
                  }}
              className={classNames('btn', 'btn-default', { active: placeID === undefined })}>
              <FormattedMessage {...messages.all} />
            </Link>
            {shipPlaces.map(shipPlace =>
              <Link
                key={shipPlace.id}
                to={{
                  pathname: '/',
                  query: _.assign({}, query, {
                    ship_to: shipPlace.id
                  })
                }}
                className={classNames('btn', 'btn-default', { active: placeID && placeID === shipPlace.id })}>
                {shipPlace.name}
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

BlockDormList.propTypes = {
  shipPlaces: PropTypes.array.isRequired
};
