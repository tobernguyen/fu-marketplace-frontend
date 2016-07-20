import React, { PropTypes, Component } from 'react';
import './CarouselPinnedItems.scss';
import { Carousel } from 'react-bootstrap';

class CarouselPinnedItems extends Component {
  render() {
    const { pinnedShops } = this.props;
    return (
      <div>
        {pinnedShops.length > 0 && <div className="carousel-pinned-items">
          <Carousel controls={false}>
            {pinnedShops.map((shop, index) =>
              <Carousel.Item key={index}>
                <img width={900} height={360} alt={shop.name} src={shop.cover}/>
                <Carousel.Caption>
                  <h3>{shop.name}</h3>
                  <p>{shop.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )}
          </Carousel>
        </div>}
      </div>
    );
  }
}

CarouselPinnedItems.propTypes = {
  pinnedShops: PropTypes.array.isRequired
};

export default CarouselPinnedItems;
