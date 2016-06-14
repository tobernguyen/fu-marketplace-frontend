import React, { Component } from 'react';
import {
  Col,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

class FormEditShopAvatarAndCover extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      img: null
    };
    
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }
  
  handleUploadImage(e) {
    const reader = new FileReader();
    var file = e.target.files[0];
    
    if(!file) {
      return;
    }
    
    reader.onload = (image) => {
      this.setState({
        img: image.target.result
      });
    }
    
    reader.readAsDataURL(file);
  }
  
  render() {
    return (
      <div className="row">
        <div className="container">
          <Col lg={3}>
            <h4><strong>Avatar & Cover</strong></h4>
            <p>Change shop's avatar and cover</p>
          </Col>
          <Col lg={9}>
            <h5>Shop Avatar</h5>
            <FormGroup>
              <img
              src={"https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/c0.34.160.160/p160x160/10313801_726388804071505_8464239395516680765_n.jpg?oh=71370b6e6fc8f0581423f6f04ca02ba3&oe=57D21BE3"}
              alt={`Avatar of Shop name`}
              title={`Avatar of shop name`} />
              <input type="file" ref="in" accept="image/*" onChange={this.handleUploadImage} />
            </FormGroup>
          </Col>
        </div>
    </div>
    );
  }
}

export default FormEditShopAvatarAndCover;