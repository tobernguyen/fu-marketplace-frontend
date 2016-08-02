import React, { Component } from 'react';
import BlockNotFound from 'app/components/common/BlockNotFound';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="container home-body">
        <BlockNotFound />
      </div>
    )
  }
}
