import React, { PropTypes, Component } from 'react';
import './CarouselPinnedItems.scss';
import { Carousel, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

class CarouselPinnedItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDescription: false
    };

    this.handleOnMouseEnter = () => {
      this.setState({
        displayDescription: true
      })
    };

    this.handleOnMouseLeave = () => {
      this.setState({
        displayDescription: false
      })
    }
  }
  render() {
    const { pinnedShops, query } = this.props;
    return (
      <div>
        {pinnedShops.length > 0 && <div className="carousel-pinned-items">
          <Carousel
            onMouseEnter={this.handleOnMouseEnter}
            onMouseLeave={this.handleOnMouseLeave}
            indicators={false}
            controls={pinnedShops.length > 1}
            nextIcon={<Glyphicon glyph="menu-right" />}
            prevIcon={<Glyphicon glyph="menu-left" />}>

            {pinnedShops.map((shop, index) =>
              <Carousel.Item key={index}>
                <Link to={{ pathname: `shops/${shop.id}`, query: query }}>
                  <img width={900} height={360} alt={shop.name} src={shop.cover}/>
                  <Carousel.Caption>
                    <h3>{shop.name}</h3>
                    {this.state.displayDescription &&
                      <p>{shop.description}</p>
                    }
                  </Carousel.Caption>
                </Link>
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
