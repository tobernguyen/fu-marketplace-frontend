import React, { Component } from 'react';
import './BlockDormList.scss';

export default class BlockDormList extends Component {
  render() {
    const { shipPlaces } = this.props;
    return (
      <div className="block-dorm-list block">
        <h3 className="title">
          <span>Ship dorm</span>
        </h3>
        <div className="clearfix body">
          <ul className="nav dorm-list">
            {shipPlaces.map(shipPlace =>
            <li key={shipPlace.id}><a href="#">{shipPlace.name.replace('Dom ', '')}</a></li>
            )}
            <li><a href="#">ALL</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
