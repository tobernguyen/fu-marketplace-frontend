import React, { Component, PropTypes } from 'react';
import { Button, Modal, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import TagInput from 'app/components/common/TagInput';

class EditShopModal extends Component {
  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.closeEditModal} >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.shop.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <FormGroup controlId="editShopName">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Shop Name"
                defaultValue={this.props.shop.name}
                onChange={this.props.onChange}
                name="name" />
            </FormGroup>
            <FormGroup controlId="editShopOwner">
              <ControlLabel>Shop Owner</ControlLabel>
              <FormControl
                type="text"
                placeholder="Shop Owner"
                defaultValue={this.props.shop.shopOwner}
                onChange={this.props.onChange}
                name="shopOwner" />
            </FormGroup>
            <FormGroup controlId="editShopDescription">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Shop Description"
                defaultValue={this.props.shop.description}
                onChange={this.props.onChange}
                name="description" />
            </FormGroup>
            <FormGroup controlId="editShopDorms">
              <ControlLabel>Dorms</ControlLabel>
              <TagInput
                tags={this.props.shop.dorms}
                updateTag={this.props.updateDormsTag} />
            </FormGroup>
            <FormGroup controlId="editShopType">
              <ControlLabel>Types</ControlLabel>
              <TagInput
                tags={this.props.shop.type}
                updateTag={this.props.updateTypeTag} />
            </FormGroup>
            <FormGroup controlId="editShopAvatar">
              <ControlLabel>Avatar</ControlLabel>
              {this.props.shop.avatar !== null &&
              <div>
                <img src={this.props.shop.avatar} height='200' width='200'/>
              </div>
              }
              <FormControl type="file" />
            </FormGroup>
            <FormGroup controlId="editShopCover">
              <ControlLabel>Cover</ControlLabel>
              {this.props.shop.cover !== null &&
              <div>
                <img src={this.props.shop.cover} height='200' width='500'/>
              </div>
              }
              <FormControl type="file" />
            </FormGroup>
            <FormGroup controlId="editShopBan">
              <ControlLabel>Ban</ControlLabel><br />
              {(() => {
                if(this.props.shop.banStatus == false) {
                  return (
                    <Button bsStyle="danger" onClick={this.props.toggleBan}>Ban</Button>
                  );
                } else {
                  return (
                    <Button bsStyle="success" onClick={this.props.toggleBan}>UnBan</Button>
                  );
                }
              })()}
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.saveChanges} bsStyle="primary">Save & Close</Button>
          <Button onClick={this.props.closeEditModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditShopModal.propTypes = {
  shop: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeEditModal: PropTypes.func.isRequired,
  updateDormsTag: PropTypes.func,
};

export default EditShopModal;
