import React, { Component } from 'react';
import './BlockDormList.scss';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class BlockDormList extends Component {
  render() {
    const { shipPlaces } = this.props;
    return (
      <div className="block-dorm-list block">
        <h3 className="title">
          <span>Ship places</span>
        </h3>
        <div className="clearfix body">
          <div className="tag-list">
            <a href="#" className="btn btn-default">
              All <span className="badge">345</span>
            </a>
            {shipPlaces.map(shipPlace => {
              const tooltip = (
                <Tooltip id="tooltip">{shipPlace.id} shops, {shipPlace.id * 20} items</Tooltip>
              );
              return (
                <OverlayTrigger key={`${shipPlace.id}`} placement="bottom" overlay={tooltip}>
                  <a href="#" className="btn btn-default">
                    {shipPlace.name} <span className="badge">{shipPlace.id * 6}</span>
                  </a>
                </OverlayTrigger>
              )
            })}
            <a href="#" className="btn btn-default">
              Dining hall <span className="badge">21</span>
            </a>
            <a href="#" className="btn btn-default">
              Alpha <span className="badge">21</span>
            </a>
            <a href="#" className="btn btn-default">
              Beta <span className="badge">34</span>
            </a>
            <a href="#" className="btn btn-default">
              Hang Coc <span className="badge">34</span>
            </a>
            <a href="#" className="btn btn-default">
              Ally <span className="badge">34</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
