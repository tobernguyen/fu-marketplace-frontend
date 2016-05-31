import React, { Component } from 'react';
import './BlockDormList.scss';

export default class BlockDormList extends Component {
  render() {
    return (
      <div className="block-dorm-list block">
        <h3 className="title">
          <span>Ship dorm</span>
        </h3>
        <div className="clearfix body">
          <ul className="nav dorm-list">
            <li><a href="#">A</a></li>
            <li><a href="#">B</a></li>
            <li><a href="#">C</a></li>
            <li><a href="#">D</a></li>
            <li><a href="#">E</a></li>
            <li><a href="#">F</a></li>
            <li><a href="#">ALL</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
