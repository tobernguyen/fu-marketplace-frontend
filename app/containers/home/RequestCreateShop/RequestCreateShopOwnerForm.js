import { reduxForm } from 'redux-form'
import FormRequestCreateShopOwner from 'app/components/home/FormRequestCreateShopOwner';
import { uploadIdentityPhoto } from 'app/actions/user';

export const fields = [ 'phone', 'identityNumber', 'identityPhoto' ];

const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.phone = {
      id: 'shop.form.validation.phone.required',
      defaultMessage: 'phone number is required'
    };
  } else if (isNaN(Number(values.phone))) {
    errors.phone = {
      id: 'common.form.validation.phone.number',
      defaultMessage: 'phone number is not valid'
    };
  }

  if (!values.identityNumber) {
    errors.identityNumber = {
      id: 'shop.form.validation.identityNumber.required',
      defaultMessage: 'identity number is required'
    };
  } else if (!(values.identityNumber.length === 9 || values.identityNumber.length === 12)) {
    errors.identityNumber = {
      id: 'shop.form.validation.identityNumber.valid',
      defaultMessage: 'identity number is not valid'
    };
  }

  if (!values.identityPhoto) {
    errors.identityPhoto = {
      id: 'shop.form.validation.identityPhoto.required',
      defaultMessage: 'identity photo is required'
    };
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
