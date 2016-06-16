import { reduxForm } from 'redux-form'
import FormRequestCreateShopOwner from 'app/components/home/FormRequestCreateShopOwner';
import { uploadIdentityPhoto } from 'app/actions/user';

export const fields = [ 'phone', 'identityNumber', 'identityPhoto' ];

const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.phone = 'shop.form.validation.phone.required';
  } else if (isNaN(Number(values.phone))) {
    errors.phone = 'common.form.validation.phone.number';
  }

  if (!values.identityNumber) {
    errors.identityNumber = 'shop.form.validation.identityNumber.required';
  } else if (!(values.identityNumber.length === 9 || values.identityNumber.length === 12)) {
    errors.identityNumber = 'shop.form.validation.identityNumber.valid';
  }

  if (!values.identityPhoto) {
    errors.identityPhoto = 'shop.form.validation.identityPhoto.required';
  }

  return errors;
};

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    identityPhoto: user.identityPhoto
  }
};

export default reduxForm({
  form: 'wizard',
  fields,
  destroyOnUnmount: false,
  validate
}, mapStateToProps, {
  uploadIdentityPhoto
})(FormRequestCreateShopOwner)
