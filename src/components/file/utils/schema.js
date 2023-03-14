// named import
import { imageUploadMsg } from 'src/utils/regex';
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

export const FILE_TYPE_OPTIONS = ['doc', 'excel', 'pdf', 'image'];
export const FILE_SORT_OPTIONS = ['Үүссэн огноо', 'Гарчиг', 'ID'];
export const ACCEPT_FILE_TYPES = {
    'image/*': [],
    'application/pdf': [],
    'application/doc': ['.doc', '.docx', '.xlsx', '.xls'],
};
export const FORMAT_PDF = ['pdf'];
export const FORMAT_WORD = ['doc', 'docx'];
export const FORMAT_EXCEL = ['xls', 'xlsx'];
export const FORMAT_IMG = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'svg', 'webp', 'apng', 'avif', 'x-icon', 'vnd.microsoft.icon', 'tiff', 'xbm'];
export const FORMAT_OTHER = [
    'txt',
    'psd',
    'zip',
    'rar',
    'iso',
    'ai',
    'esp',
    'ppt',
    'pptx',
    'wav',
    'aif',
    'mp3',
    'aac',
    'm4v',
    'avi',
    'mpg',
    'mp4',
    'webm',
];
