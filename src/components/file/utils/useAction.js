// react
import { useEffect, useState, useCallback } from 'react';
// default import
import useForm from 'src/hooks/useForm';
// section
import { FileSchema, defaultValues } from './schema';

const useAction = (open = false, onClose = null, item = {}) => {
    const { form } = useForm(FileSchema(), defaultValues());
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (!open) {
            setFiles([]);
            form.reset({
                title: item?.title ? item?.title : '',
                description: item?.description ? item?.description : '',
                caption: item?.caption ? item?.caption : '',
                file_type_id: item?.file_type_id ? item?.file_type_id : 0,
                category_id: item?.category_id ? item?.category_id : 0,
                file_url: item?.file_url ? item?.file_url : null,
            });
        }
    }, [open]);

    const handleDrop = useCallback(
        (acceptedFiles) => {
            setFiles(form.values?.file_url || []);

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );
            setFiles([...files, ...newFiles]);
            form.setValue('file_url', [...files, ...newFiles]);
        },
        [files]
    );

    const handleRemoveFile = (inputFile) => {
        const filtered = files.filter((file) => file !== inputFile);
        setFiles(filtered);
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    const handleClose = () => {
        onClose !== null && onClose();
        form.reset(defaultValues);
        setFiles([]);
    };

    return {
        form,
        actionState: {
            files,
        },
        actionFunction: {
            handleDrop,
            handleRemoveFile,
            handleRemoveAllFiles,
            handleClose,
        },
    };
};
export default useAction;
