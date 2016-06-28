import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './BlockSellingItemForUser.scss';

export default class BlockSellingItemForUser extends Component {
  constructor(props) {
    super(props);

    const { buyNow, item, addToCard } = this.props;

    this.handleAddToCard = () => {
      addToCard(item);
    };

    this.handleBuyNow = () => {
      buyNow(item);
    };
  }

  render() {
    const { item, shopID } = this.props;
    const tooltip = (
      item.description ? <Tooltip id="tooltip">{item.description}</Tooltip> : <span/>
    );
    return (
      <div className="block-selling-item for-user col-md-3 col-xs-4">
        <OverlayTrigger placement="top" overlay={tooltip}>
          <div className="row item">
            <a className="item-image">
              <img src={item.image} />
              <div className="actions">
                <p>
                  <span onClick={this.handleBuyNow}>
                    Mua ngay
                  </span>
                </p>
              </div>
            </a>
            <div className="info clearfix">
              <table>
                <tbody>
                <tr>
                  <td>
                    <div>
                        <span className="name">
                          {item.name}
                        </span>
                      <span className="price">{item.price} ₫</span>
                    </div>
                  </td>
                  <td>
                    <div className="add-to-cart">
                      <span onClick={this.handleAddToCard}>
                        <i className="fa fa-shopping-bag" />
                      </span>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </OverlayTrigger>
      </div>
    )
  }
}


BlockSellingItemForUser.propTypes = {
  item: PropTypes.object.isRequired,
  addToCard: PropTypes.func.isRequired,
  buyNow: PropTypes.func.isRequired
};
