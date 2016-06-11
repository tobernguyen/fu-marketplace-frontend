import React, { Component, PropTypes } from 'react';
import ShopListRow from 'app/components/admin/ShopListRow';
import './ShopList.scss';

const mockData = [
  {
    id: 1,
    name: "Tadaaaa",
    shopOwner: "tobernguyen",
    description: "SOmething long as fuckkkkkkkkkkkkk",
    dorms: ["A", "B"],
    type: ["Food"],
    avatar: 'https://www.vidbooster.com/wp-content/uploads/2016/04/avatar.jpg',
    cover: 'http://covermaker.net/thumbnail/10/1058.jpg',
    banStatus: true
  },
  {
    id: 2,
    name: "Tedeeeee",
    shopOwner: "Dong",
    description: "SOmething long as Hellllllllllllll",
    dorms: ["D", "C"],
    type: ["Drink", "Food", "Toy"],
    avatar: 'http://goodfilmguide.co.uk/wp-content/uploads/2010/04/avatar12.jpg',
    cover: null,
    banStatus: false
  }
]


export default class ShopList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>ShopOwner</th>
              <th>Ban Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mockData.map(shop =>
              <ShopListRow key={shop.id} shop={shop} />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
