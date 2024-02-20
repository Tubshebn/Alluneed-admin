// Named
import {
  confirmPasswordMsg,
  emailRegexMsg,
  max100Msg,
  max150Msg,
  max50Msg,
  min2Msg,
  minPass,
  phoneRegex,
  phoneRegexMsg,
  requiredMsg,
  min1Msg,
} from 'src/utils/regex';
// default
import * as Yup from 'yup';

export function UserCreateSchema(dilaog, form) {
  console.log('🚀 ~ UserCreateSchema ~ form:', form);
  let UserCreateSchema = {};
  if (form ? form === 1 : true) {
    UserCreateSchema = Yup.object().shape({
      name: Yup.string()
        .required(requiredMsg)
        .min(1, min1Msg)
        .max(50, max50Msg),
      // image: Yup.string().required(requiredMsg).min(1, min1Msg),
      email: Yup.string()
        .email(emailRegexMsg)
        .required(requiredMsg)
        .max(100, max100Msg),
      password: Yup.string()
        .required(requiredMsg)
        .min(8, minPass)
        .max(50, minPass),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], confirmPasswordMsg)
        .required(requiredMsg),
    });
  }
  // if (dilaog === 'create') {
  //   UserCreateSchema = Yup.object().shape({
  //     lastname: Yup.string()
  //       .required(requiredMsg)
  //       .min(1, min1Msg)
  //       .max(50, max50Msg),
  //     firstname: Yup.string()
  //       .required(requiredMsg)
  //       .min(1, min1Msg)
  //       .max(50, max50Msg),
  //     phoneNumber: Yup.string()
  //       .required(requiredMsg)
  //       .matches(phoneRegex, phoneRegexMsg),
  //     email: Yup.string()
  //       .email(emailRegexMsg)
  //       .required(requiredMsg)
  //       .max(100, max100Msg),
  //     orgId: Yup.string().required(requiredMsg),
  //     position: Yup.string()
  //       .required(requiredMsg)
  //       .min(2, min2Msg)
  //       .max(50, max50Msg),
  //     username: Yup.string().required(requiredMsg),
  //     password: Yup.string()
  //       .required(requiredMsg)
  //       .min(8, minPass)
  //       .max(50, minPass),
  //     confirmPassword: Yup.string()
  //       .oneOf([Yup.ref('password')], confirmPasswordMsg)
  //       .required(requiredMsg),
  //     roleId: Yup.string().required(requiredMsg),
  //   });
  // } else {
  //   UserCreateSchema = Yup.object().shape({
  //     lastname: Yup.string()
  //       .required(requiredMsg)
  //       .min(1, min1Msg)
  //       .max(50, max50Msg),
  //     firstname: Yup.string()
  //       .required(requiredMsg)
  //       .min(1, min1Msg)
  //       .max(50, max50Msg),
  //     phoneNumber: Yup.string()
  //       .required(requiredMsg)
  //       .matches(phoneRegex, phoneRegexMsg),
  //     email: Yup.string()
  //       .email(emailRegexMsg)
  //       .required(requiredMsg)
  //       .max(100, max100Msg),
  //     orgId: Yup.string().required(requiredMsg),
  //     position: Yup.string()
  //       .required(requiredMsg)
  //       .min(2, min2Msg)
  //       .max(100, max100Msg),
  //     username: Yup.string().required(requiredMsg),
  //     roleId: Yup.string().required(requiredMsg),
  //   });
  // }
  return form && UserCreateSchema;
}

export function UserUpdateSchema() {
  const UserUpdateSchema = Yup.object().shape({
    lastname: Yup.string()
      .required(requiredMsg)
      .min(1, min1Msg)
      .max(50, max50Msg),
    firstname: Yup.string()
      .required(requiredMsg)
      .min(1, min1Msg)
      .max(50, max50Msg),
    phoneNumber: Yup.string()
      .required(requiredMsg)
      .matches(phoneRegex, phoneRegexMsg),
    email: Yup.string()
      .email(emailRegexMsg)
      .required(requiredMsg)
      .max(50, max50Msg),
    orgId: Yup.string().required(requiredMsg),

    position: Yup.string()
      .required(requiredMsg)
      .min(2, min2Msg)
      .max(100, max100Msg),
    username: Yup.string().required(requiredMsg),

    roleId: Yup.string().required(requiredMsg),
  });
  return UserUpdateSchema;
}

export const defaultValues = {
  id: '',
  name: '',
  email: '',
  roleId: '',
  image: '',
};

export const TABLE_HEAD = [
  { id: 'index', label: '№', align: 'left' },
  { id: 'photo', label: 'Зураг', align: 'left' },
  { id: 'name', label: 'Нэр', align: 'left' },
  { id: 'phoneNumber', label: 'Утасны дугаар', align: 'left' },
  { id: 'email', label: 'И-Мэйл', align: 'left' },
  { id: 'role', label: 'Хэрэглэгчийн эрх', align: 'left' },
  { id: 'location', label: 'Хаяг', align: 'center' },
  { id: 'action', label: 'Үйлдэл', align: 'center' },
];
