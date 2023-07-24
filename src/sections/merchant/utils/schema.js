// Named
import { requiredMsg, minPass, confirmPasswordMsg } from 'src/utils/regex';
// default
import * as Yup from 'yup';

export function MerchantCreateSchema() {
   const MerchantCreateSchema = Yup.object().shape({
      username: Yup.string().required(requiredMsg),
      roleId: Yup.number(requiredMsg).required(requiredMsg).typeError(requiredMsg),
      password: Yup.string().required(requiredMsg).min(8, minPass).max(50, minPass),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('password')], confirmPasswordMsg)
         .required(requiredMsg),
   });
   return MerchantCreateSchema;
}

export function MerchantUpdateSchema() {
   const MerchantUpdateSchema = Yup.object().shape({
      username: Yup.string().required(requiredMsg),
      roleId: Yup.number(requiredMsg).required(requiredMsg).typeError(requiredMsg),
   });
   return MerchantUpdateSchema;
}

export const defaultValues = {
   username: '',
   password: '',
   roleId: '',
};

export const TABLE_HEAD = [
   { id: 'index', label: '№', align: 'left' },
   { id: 'username', label: 'Нэвтрэх нэр', align: 'left' },
   { id: 'Role', label: 'Хэрэглэгчийн эрх', align: 'left' },
   { id: 'status', label: 'Статус', align: 'left' },
   { id: 'action', label: 'Үйлдэл', align: 'center' },
];
