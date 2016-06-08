import React, { Component, PropTypes } from 'react'
import RequestCreateShopInfoForm from './RequestCreateShopInfoForm';
import RequestCreateShopOwnerForm from './RequestCreateShopOwnerForm';

export default class RequestCreateShopForm extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (<div>
        {page === 1 && <RequestCreateShopOwnerForm onSubmit={this.nextPage}/>}
        {page === 2 && <RequestCreateShopInfoForm previousPage={this.previousPage} onSubmit={onSubmit}/>}
      </div>
    )
  }
}

RequestCreateShopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
