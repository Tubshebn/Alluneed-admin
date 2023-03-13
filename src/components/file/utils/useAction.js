// react
import { useState, useCallback } from 'react';
// default import
import useForm from 'src/hooks/useForm';
// section
import { FileSchema, defaultValues } from './schema';

const useAction = () => {
    const { form } = useForm(FileSchema(), defaultValues());
    const [files, setFiles] = useState([]);

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
