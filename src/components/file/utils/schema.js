// named import
import { requiredMsg, imageUploadMsg } from 'src/utils/regex';
// default import
import * as Yup from 'yup';

export function FileSchema() {
    const FileSchemaValue = Yup.object().shape({
        file_url: Yup.mixed().required(imageUploadMsg),
    });
    return FileSchemaValue;
}

export function defaultValues() {
    const Values = {
        title: '',
        description: '',
        caption: '',
        category_id: 0,
        file_type_id: 0,
        file_url: null,
    };
    return Values;
}

export const SettingsSchema = Yup.object().shape({
    name: Yup.string().required(requiredMsg),
    field1: Yup.string(),
    field2: Yup.string(),
    field3: Yup.string(),
});

export function settingsDefaultValues() {
    const Values = {
        refCode: 'NEWS_CATEGORY',
        name: '',
        field1: '',
        field2: '',
        field3: '',
    };
    return Values;
}
export const SETTINGS_TABLE_HEAD = [
    { id: 'number', label: '№', align: 'left' },
    { id: 'name', label: 'Нэр', align: 'left' },
    { id: 'custom1', label: 'custom1', align: 'left' },
    { id: 'custom2', label: 'custom2', align: 'left' },
    { id: 'custom3', label: 'custom3', align: 'left' },
    { id: 'action', label: 'Үйлдэл', align: 'center' },
];
export const TABLE_HEAD = [
    { id: 'number', label: '№', align: 'center' },
    { id: 'title', label: 'Нэр', align: 'left' },
    { id: 'description', label: 'Тайлбар', align: 'left', minWidth: 120 },
    { id: 'type', label: 'Төрөл', align: 'center', minWidth: 120 },
    { id: 'category', label: 'Категори', align: 'left', minWidth: 160 },
    { id: 'action', label: 'Үйлдэл', align: 'center', minWidth: 120 },
];

export const FILE_TYPE_OPTIONS = ['doc', 'excel', 'pdf', 'image'];
export const FILE_SORT_OPTIONS = ['Үүссэн огноо', 'Гарчиг', 'ID'];
