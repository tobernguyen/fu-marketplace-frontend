import React, { PropTypes, Component } from 'react';
import './CarouselPinnedItems.scss';
import { Carousel } from 'react-bootstrap';

export default class CarouselPinnedItems extends Component {
  render() {
    return (
      <div className="carousel-pinned-items">
        <Carousel>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="//media.foody.vn/biz_banner/foody-bannerhome_1000x375_khaisilk-new-635949338423039610.png"/>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="//media.foody.vn/biz_banner/foody-meetfresh-636001962901146834.jpg"/>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={900} height={500} alt="900x500" src="//media.foody.vn/biz_banner/foody-foody%201000x375-635995993329178587.jpg"/>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
