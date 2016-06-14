import React, { Component, PropTypes } from 'react'
import RequestCreateShopInfoForm from './RequestCreateShopInfoForm';
import RequestCreateShopOwnerForm from './RequestCreateShopOwnerForm';
import FormRequestCreateShopIntro from 'app/components/home/FormRequestCreateShopIntro';
import RequestCreateShopStatus from './RequestCreateShopStatus';

export default class RequestCreateShopForm extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(formValue) {
    this.props.onSubmit(formValue);
    this.setState({ page: this.state.page + 1 })
  }
  

  render() {
    const { page } = this.state;
    return (<div>
        {page === 1 && <FormRequestCreateShopIntro nextPage={this.nextPage} />}
        {page === 2 &&
        <RequestCreateShopOwnerForm
          onSubmit={this.nextPage}
          previousPage={this.previousPage}
        />}
        {page === 3 && <RequestCreateShopInfoForm previousPage={this.previousPage} onSubmit={this.handleSubmit} />}
        {page === 4 && <RequestCreateShopStatus />}
      </div>
    )
  }
}

RequestCreateShopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
