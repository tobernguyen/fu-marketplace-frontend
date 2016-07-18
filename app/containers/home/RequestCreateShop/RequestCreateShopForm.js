import React, { Component, PropTypes } from 'react'
import RequestCreateShopInfoForm from './RequestCreateShopInfoForm';
import RequestCreateShopOwnerForm from './RequestCreateShopOwnerForm';
import FormRequestCreateShopIntro from 'app/components/home/FormRequestCreateShopIntro';
import RequestCreateShopStatus from './RequestCreateShopStatus';
import _ from 'lodash';

export default class RequestCreateShopForm extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      page: 1,
      loaded: false,
      hasShop: false
    }
  }


  nextPage() {
    const { page, hasShop } = this.state;

    if (page === 1 && hasShop) {
      this.setState({
        page: 3
      })
    } else {
      this.setState({ page: page + 1 })
    }
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  handleSubmit(formValue) {
    this.props.onSubmit(formValue, this.state.hasShop);

    this.setState({ page: this.state.page + 1 })
  }

  componentDidMount() {
    this.updateShopRequestMode(this.props.currentUser);
  }

  componentWillReceiveProps(nextProps) {
    this.updateShopRequestMode(nextProps.currentUser);
  }

  updateShopRequestMode(currentUser) {
    if (!_.isEmpty(currentUser)) {
      let newState = {
        loaded: true
      };
      if (currentUser.shops instanceof Array) {
        newState.hasShop = (currentUser.shops.length > 0);
      }
      this.setState(newState)
    }
  }

  render() {
    const { page, loaded, hasShop } = this.state;
    return (<div>
        {page === 1 && <FormRequestCreateShopIntro loaded={loaded} nextPage={this.nextPage} />}
        {page === 2 &&
        <RequestCreateShopOwnerForm
          onSubmit={this.nextPage}
          previousPage={this.previousPage}
        />}
        {page === 3 && <RequestCreateShopInfoForm hasShop={hasShop} previousPage={this.previousPage} onSubmit={this.handleSubmit} />}
        {page === 4 && <RequestCreateShopStatus />}
      </div>
    )
  }
}

RequestCreateShopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
