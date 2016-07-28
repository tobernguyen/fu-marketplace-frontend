import React, { Component, PropTypes } from 'react';
import './BlockDormList.scss';
import { Link } from 'react-router';
import classNames from 'classnames';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { messages } from './BlockDormList.i18n';

export default class BlockDormList extends Component {
  render() {
    const { shipPlaces, shipPlaceCounter, totalShipPlace, query } = this.props;
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
              <FormattedMessage {...messages.all} /> <span className="badge">{totalShipPlace}</span>
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
                {shipPlace.name} <span className="badge">{shipPlaceCounter[shipPlace.id]}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

BlockDormList.propTypes = {
  shipPlaces: PropTypes.array.isRequired,
  shipPlaceCounter: PropTypes.object.isRequired,
  totalShipPlace: PropTypes.number.isRequired
};
