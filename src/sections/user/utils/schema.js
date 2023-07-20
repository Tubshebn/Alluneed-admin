// Named
import {
   requiredMsg,
   min2Msg,
   max150Msg,
   numberRegex,
   numberRegexMsg,
   emailRegexMsg,
   minPass,
   confirmPasswordMsg,
   max100Msg,
   max50Msg,
} from 'src/utils/regex';
// default
import * as Yup from 'yup';

export function UserCreateSchema() {
   const UserCreateSchema = Yup.object().shape({
      lastname: Yup.string().required(requiredMsg).min(2, min2Msg).max(50, max50Msg),
      firstname: Yup.string().required(requiredMsg).min(2, min2Msg).max(50, max50Msg),
      phoneNumber: Yup.string().matches(numberRegex, numberRegexMsg).required(requiredMsg),
      email: Yup.string().email(emailRegexMsg).required(requiredMsg),
      organizationName: Yup.string().required(requiredMsg).min(3, min2Msg).max(150, max150Msg),
      position: Yup.string().required(requiredMsg).min(3, min2Msg).max(100, max100Msg),
      username: Yup.string().required(requiredMsg),
      password: Yup.string().required(requiredMsg).min(8, minPass).max(50, minPass),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('password')], confirmPasswordMsg)
         .required(requiredMsg),
      roleId: Yup.number(requiredMsg).required(requiredMsg),
   });
   return UserCreateSchema;
}

export function UserUpdateSchema() {
   const UserUpdateSchema = Yup.object().shape({
      lastname: Yup.string().required(requiredMsg).min(2, min2Msg).max(50, max50Msg),
      firstname: Yup.string().required(requiredMsg).min(2, min2Msg).max(50, max50Msg),
      phoneNumber: Yup.string().matches(numberRegex, numberRegexMsg).required(requiredMsg),
      email: Yup.string().email(emailRegexMsg).required(requiredMsg).max(50, max50Msg),
      organizationName: Yup.string().required(requiredMsg).min(3, min2Msg).max(150, max150Msg),
      position: Yup.string().required(requiredMsg).min(3, min2Msg).max(100, max100Msg),
      username: Yup.string().required(requiredMsg),
      password: Yup.string().notRequired().min(8, minPass).max(50, minPass),
      confirmPassword: Yup.string()
         .oneOf([Yup.ref('password')], confirmPasswordMsg)
         .notRequired(),
      roleId: Yup.number().required(requiredMsg),
   });
   return UserUpdateSchema;
}

export const defaultValues = {
   id: '',
   lastname: '',
   firstname: '',
   mobileNumber: '',
   email: '',
   organizationName: '',
   position: '',
   username: '',
   password: '',
   confirmPassword: '',
   roleId: null,
};

export const TABLE_HEAD = [
   { id: 'index', label: '№', align: 'left' },
   { id: 'organizationName', label: 'Байгууллагын нэр', align: 'left' },
   { id: 'username', label: 'Нэвтрэх нэр', align: 'left' },
   { id: 'worker', label: 'Ажилтан', align: 'left' },
   { id: 'authType', label: 'Хэрэглэгчийн эрх', align: 'left' },
   { id: 'position', label: 'Албан тушаал', align: 'left' },
   { id: 'email', label: 'И-Мэйл', align: 'left' },
   { id: 'phoneNumber', label: 'Утасны дугаар', align: 'left' },
   { id: 'action', label: 'Үйлдэл', align: 'center' },
];

export const roleArray = [
   {
      id: 0,
      name: 'Бүгд',
   },
   {
      id: 2,
      name: 'Админ',
   },
   {
      id: 3,
      name: 'Супер админ',
   },
];
