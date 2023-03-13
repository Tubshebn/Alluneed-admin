import { format } from 'date-fns';

const FORMAT_PDF = ['pdf'];
const FORMAT_TEXT = ['txt'];
const FORMAT_PHOTOSHOP = ['psd'];
const FORMAT_WORD = ['doc', 'docx'];
const FORMAT_EXCEL = ['xls', 'xlsx'];
const FORMAT_ZIP = ['zip', 'rar', 'iso'];
const FORMAT_ILLUSTRATOR = ['ai', 'esp'];
const FORMAT_POWERPOINT = ['ppt', 'pptx'];
const FORMAT_AUDIO = ['wav', 'aif', 'mp3', 'aac'];
const FORMAT_IMG = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'svg', 'webp', 'apng', 'avif', 'x-icon', 'vnd.microsoft.icon', 'tiff', 'xbm'];
const FORMAT_VIDEO = ['m4v', 'avi', 'mpg', 'mp4', 'webm'];

export function fDateReq(date) {
    return format(new Date(date), 'yyyy-MM-dd HH:mm:ss.SSS');
}

export function handleFileType(data, list = []) {
    let fileType = '';
    if (list?.length > 0) {
        fileType = list?.filter((file) => file?.id === data)[0]?.name;
    }
    return fileType;
}

export function handleCategory(data, list = []) {
    let category = '';
    if (list?.length > 0) {
        category = list?.filter((file) => file?.id === data)[0]?.name;
    }
    return category;
}

export function fileTypeByUrl(fileUrl = '') {
    return (fileUrl && fileUrl.split('.').pop()) || '';
}

export function fileTypeName(type) {
    let file;
    if (type) {
        switch (type) {
            case 'image':
                file = 1920;
                break;
            case 'pdf':
                file = 1923;
                break;
            case 'doc':
                file = 1924;
                break;
            case 'excel':
                file = 1925;
                break;
            default:
                file = 0;
        }
    }
    return file;
}

export function fileFormat(fileUrl) {
    let format;

    switch (fileUrl?.includes(fileTypeByUrl(fileUrl))) {
        case FORMAT_TEXT.includes(fileTypeByUrl(fileUrl)):
            format = 'txt';
            break;
        case FORMAT_ZIP.includes(fileTypeByUrl(fileUrl)):
            format = 'zip';
            break;
        case FORMAT_AUDIO.includes(fileTypeByUrl(fileUrl)):
            format = 1922;
            break;
        case FORMAT_IMG.includes(fileTypeByUrl(fileUrl)):
            format = 1920;
            break;
        case FORMAT_VIDEO.includes(fileTypeByUrl(fileUrl)):
            format = 1921;
            break;
        case FORMAT_WORD.includes(fileTypeByUrl(fileUrl)):
            format = 1924;
            break;
        case FORMAT_EXCEL.includes(fileTypeByUrl(fileUrl)):
            format = 1925;
            break;
        case FORMAT_POWERPOINT.includes(fileTypeByUrl(fileUrl)):
            format = 'powerpoint';
            break;
        case FORMAT_PDF.includes(fileTypeByUrl(fileUrl)):
            format = 1923;
            break;
        case FORMAT_PHOTOSHOP.includes(fileTypeByUrl(fileUrl)):
            format = 'photoshop';
            break;
        case FORMAT_ILLUSTRATOR.includes(fileTypeByUrl(fileUrl)):
            format = 'illustrator';
            break;
        default:
            format = fileTypeByUrl(fileUrl);
    }

    return format;
}

export function NumberToString(array) {
    let test = [];
    if (array) {
        test = array.join();
    }
    return test;
}

export function handleSort(name) {
    let sortName = '';

    switch (name) {
        case 'Үүссэн огноо':
            sortName = 'created_at';
            break;
        case 'Гарчиг':
            sortName = 'title';
            break;
        case 'ID':
            sortName = 'id';
            break;
        default:
            sortName = '';
    }

    return sortName;
}
