// Named
import {
    emailRegexMsg,
    max100Msg,
    max150Msg,
    max50Msg,
    min2Msg,
    orgRegisterRegex,
    phoneRegex,
    phoneRegexMsg,
    registerRegexMsg,
    requiredMsg,
} from 'src/utils/regex';
// default
import * as Yup from 'yup';

export function OrganizationCreateSchema(dilaog) {
    let OrganizationCreateSchema = {};
    if (dilaog === 'create') {
        OrganizationCreateSchema = Yup.object().shape({
            name: Yup.string().required(requiredMsg).min(2, min2Msg).max(150, max150Msg),
            // phoneNumber: Yup.string().matches(phoneRegex, phoneRegexMsg).notRequired(),
            // email: Yup.string().email(emailRegexMsg).required(requiredMsg).max(100, max100Msg),

            registrationNumber: Yup.string().required(requiredMsg).matches(orgRegisterRegex, registerRegexMsg),
            soumDuuregCode: Yup.string().required(requiredMsg),
            // bagKhorooCode: Yup.string().required(requiredMsg),
        });
    } else {
        OrganizationCreateSchema = Yup.object().shape({
            name: Yup.string().required(requiredMsg).min(2, min2Msg).max(150, max150Msg),
            registrationNumber: Yup.string().required(requiredMsg).matches(orgRegisterRegex, registerRegexMsg),
            // phoneNumber: Yup.string().matches(phoneRegex, phoneRegexMsg).notRequired(),
            //   email: Yup.string()
            //     .email(emailRegexMsg)
            //     .required(requiredMsg)
            //     .max(100, max100Msg),
            soumDuuregCode: Yup.string().required(requiredMsg),
            // bagKhorooCode: Yup.string().required(requiredMsg),
        });
    }
    return OrganizationCreateSchema;
}

export function OrganizationUpdateSchema() {
    const OrganizationUpdateSchema = Yup.object().shape({
        name: Yup.string().required(requiredMsg).min(3, min2Msg).max(50, max50Msg),
        phoneNumber: Yup.string().required(requiredMsg).matches(phoneRegex, phoneRegexMsg),
        email: Yup.string().email(emailRegexMsg).required(requiredMsg).max(100, max100Msg),
        soumDuuregCode: Yup.string().required(requiredMsg),
        // bagKhorooCode: Yup.string().required(requiredMsg),
    });
    return OrganizationUpdateSchema;
}

export const defaultValues = {
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    areas_of_activity: '',
    image: '',
    website: '',
    description: '',
    // bagKhorooCode: '',
};

export const TABLE_HEAD = [
    { id: 'index', label: '№', align: 'left' },
    { id: 'name', label: 'Байгууллагын нэр', align: 'left' },
    { id: 'phone', label: 'Утасны дугаар', align: 'left' },
    { id: 'email', label: 'И-Мэйл', align: 'left' },
    { id: 'city', label: 'Хот', align: 'left' },
    { id: 'address', label: 'Хаяг', align: 'left' },
    { id: 'areas_of_activity', label: 'areas_of_activity', align: 'left' },
    { id: 'website', label: 'Веб', align: 'left' },
    { id: 'description', label: 'Тайлбар', align: 'left' },
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
