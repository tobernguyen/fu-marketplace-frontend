import React, { Component, PropTypes } from 'react';
import './BlockDormList.scss';

export default class BlockDormList extends Component {
  render() {
    const { shipPlaces, shipPlaceCounter, totalShipPlace } = this.props;
    return (
      <div className="block-dorm-list block">
        <h3 className="title">
          <span>Ship places</span>
        </h3>
        <div className="clearfix body">
          <div className="tag-list">
            <a href="#" className="btn btn-default">
              Tất cả <span className="badge">{totalShipPlace}</span>
            </a>
            {shipPlaces.map(shipPlace =>
              <a key={shipPlace.id} href="#" className="btn btn-default">
                {shipPlace.name} <span className="badge">{shipPlaceCounter[shipPlace.id]}</span>
              </a>
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
