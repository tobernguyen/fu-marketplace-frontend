import React, { Component } from 'react';
import PromotionListRow from './PromotionListRow.jsx';

class PromotionList extends Component {
  render() {
    const { promotions } = this.props;
    return(
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Shop</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promotions.length !== 0 && promotions.map(promotion =>
              <PromotionListRow key={promotion.id} promotion={promotion} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PromotionList;
