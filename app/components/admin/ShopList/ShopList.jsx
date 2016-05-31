import React, { Component, PropTypes } from 'react';
import ShopListRow from 'app/components/admin/ShopListRow';
import EditShopModal from 'app/components/admin/EditShopModal';
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

    this.state = {
      showModal: false,
      selectedShop: {},
      updatedShop: {}
    };

    this.openEditModal = this.openEditModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.renderEditModal = this.renderEditModal.bind(this);
    this.updateDormsTag = this.updateDormsTag.bind(this);
    this.updateTypeTag = this.updateTypeTag.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.toggleBan = this.toggleBan.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  openEditModal(shop) {
    this.setState({
      showModal: true,
      selectedShop: shop
    });
  }

  closeEditModal() {
    this.setState({
      showModal: false,
      selectedShop: {}
    });
  }

  updateDormsTag(tags) {
    const newSelectedShop = this.state.selectedShop;
    newSelectedShop['dorms'] = tags;
    this.setState({ selectedShop: newSelectedShop });
  }

  updateTypeTag(tags) {
    const newSelectedShop = this.state.selectedShop;
    newSelectedShop['type'] = tags;
    this.setState({ selectedShop: newSelectedShop });
  }

  handleOnChange(e) {
    const newSelectedShop = this.state.selectedShop;
    newSelectedShop[e.target.name] = e.target.value;
    this.setState({ selectedShop: newSelectedShop });
  }

  toggleBan(e) {
    const newSelectedShop = this.state.selectedShop;
    newSelectedShop['banStatus'] = !newSelectedShop['banStatus']
    this.setState({
      selectedShop: newSelectedShop
    });
  }

  saveChanges(e) {
    console.log(this.state.selectedShop);
  }

  renderEditModal() {
    if(this.state.selectedShop !== {}) {
      return (
        <EditShopModal
          shop={this.state.selectedShop}
          showModal={this.state.showModal}
          closeEditModal={this.closeEditModal}
          onChange={this.handleOnChange}
          updateDormsTag={this.updateDormsTag}
          updateTypeTag={this.updateTypeTag}
          toggleBan={this.toggleBan}
          saveChanges={this.saveChanges}/>
      );
    }
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
              <ShopListRow key={shop.id} shop={shop} openEditModal={this.openEditModal} />
            )}
          </tbody>
        </table>
        {this.renderEditModal()}
      </div>
    );
  }
}
