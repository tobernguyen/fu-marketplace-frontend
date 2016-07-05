import { reduxForm } from 'redux-form';
import FormUpdateShop from 'app/components/home/FormUpdateShop';

export const fields = [ 'description', 'status' ];

const validate = values => {
  const errors = {};

  if (!values.description) {
    errors.description = 'shop.form.validation.description.required';
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { shop } = state;
  console.log(shop.sellerShop.status);
  return {
    initialValues: {
      description:  shop.sellerShop ? shop.sellerShop.description : '',
      status: shop.sellerShop ? Boolean(shop.sellerShop.status) : false
    }
  }
};

export default reduxForm({
    form: 'UpdateShopForm',
    fields,
    validate
  }, mapStateToProps)(FormUpdateShop)
