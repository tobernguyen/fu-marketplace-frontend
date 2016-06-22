import { reduxForm } from 'redux-form';
import FormUpdateShop from 'app/components/home/FormUpdateShop';

export const fields = [ 'description' ];

const validate = values => {
  const errors = {};

  if (!values.description) {
    errors.description = 'shop.form.validation.description.required';
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { shop } = state;
  return {
    initialValues: {
      description:  shop.sellerShop ? shop.sellerShop.description : ''
    }
  }
};

export default reduxForm({
    form: 'UpdateShopForm',
    fields,
    validate
  }, mapStateToProps)(FormUpdateShop)
