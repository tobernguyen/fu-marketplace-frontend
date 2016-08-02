import React, { Component } from 'react';
import './BlockNotFound.scss';

export default class BlockNotFound extends Component {
  render() {
    return (
      <div className="block-not-found">
        <h1 className="title">
          Oops, 404!
        </h1>
        <div className="message">
          Page not found.
        </div>
      </div>
    )
  }
}
