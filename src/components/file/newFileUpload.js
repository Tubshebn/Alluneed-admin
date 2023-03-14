// mui
import { Button, Stack, MenuItem, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// named import
import { useSnackbar } from 'notistack';
// default import
import PropTypes from 'prop-types';
import useSWRMutation from 'swr/mutation';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
// components
import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import { RHFTextField, RHFSelect } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
// section
import { fileFormat } from './utils/func';
import useAction from './utils/useAction';
import { ACCEPT_FILE_TYPES } from './utils/schema';

NewFileUpload.propTypes = {
    categoryList: PropTypes.array,
    categoryLoading: PropTypes.bool,
    onFiles: PropTypes.func,
    onRefresh: PropTypes.func,
    removeButton: PropTypes.string,
    uploadButton: PropTypes.string,
};

export default function NewFileUpload({ categoryList = [], categoryLoading = false, onFiles, onRefresh, removeButton, uploadButton }) {
    const { formFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const { form, actionState, actionFunction } = useAction();

    // swr
    const { trigger: singleTrigger, isMutating } = useSWRMutation('/web-admin/api/v1/attachment/create', formFetcher, {
        onSuccess: (newData) => {
            if (newData?.response_code) {
                enqueueSnackbar(newData?.response_msg);
                handleFiles([newData?.data]);
            } else {
                enqueueSnackbar(newData?.response_msg, {
                    variant: 'error',
                });
            }
            actionFunction.handleClose();
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
            actionFunction.handleClose();
        },
    });

    const { trigger: multiTrigger } = useSWRMutation('/web-admin/api/v1/attachment/bulk/create', formFetcher, {
        onSuccess: (newData) => {
            if (newData?.response_code) {
                enqueueSnackbar(newData?.response_msg);
                handleFiles(newData?.data);
            } else {
                enqueueSnackbar(newData?.response_msg, {
                    variant: 'error',
                });
            }
            actionFunction.handleClose();
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
            actionFunction.handleClose();
        },
    });

    // functions
    const onSubmit = async () => {
        try {
            let body = new FormData();
            if (form.values.file_url.length === 1) {
                body.append('title', form.values.title);
                body.append('description', form.values.description);
                body.append('file_url', form.values.file_url[0]);
                body.append('file_type_id', fileFormat(form.values.file_url[0].path));
                body.append('category_id', form.values.category_id);
                body.append('caption', form.values.caption);
                singleTrigger({ body, type: 'multipart/form-data' });
            } else {
                form.values.file_url.map((file) => body.append('file_urls', file));
                multiTrigger({ body, type: 'multipart/form-data' });
            }
        } catch (e) {
            return;
        }
    };

    const handleFiles = (array) => {
        try {
            let urls = [];
            urls = array.map((file) => file.file_url);
            onFiles(urls);
            onRefresh();
        } catch (e) {
            return;
        }
    };

    return (
        <>
            <FormProvider methods={form.methods}>
                <Stack spacing={3} sx={{ mt: 3 }}>
                    <form.Controller
                        name='file_url'
                        control={form.control}
                        render={() => (
                            <Upload
                                multiple
                                files={actionState.files}
                                onDrop={actionFunction.handleDrop}
                                onRemove={actionFunction.handleRemoveFile}
                                acceptedFiles={ACCEPT_FILE_TYPES}
                            />
                        )}
                    />
                    {actionState.files?.length === 1 && (
                        <>
                            <RHFTextField name='title' label='Файлын гарчиг' multiline />
                            <RHFTextField name='description' label='Файлын тайлбар' multiline />

                            {!categoryLoading && (
                                <RHFSelect
                                    fullWidth
                                    name='category_id'
                                    label='Категори сонгох'
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                    }}
                                >
                                    <MenuItem
                                        sx={{
                                            mx: 1,
                                            my: 0.5,
                                            borderRadius: 0.75,
                                            typography: 'body2',
                                            textTransform: 'capitalize',
                                        }}
                                        value={0}
                                    >
                                        Сонгох
                                    </MenuItem>
                                    {categoryList?.map((option, index) => (
                                        <MenuItem
                                            key={index}
                                            value={option.id}
                                            sx={{
                                                mx: 1,
                                                my: 0.5,
                                                borderRadius: 0.75,
                                                typography: 'body2',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </RHFSelect>
                            )}
                            <RHFTextField name='caption' label='Caption бичих' multiline />
                        </>
                    )}
                </Stack>
            </FormProvider>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
                {!!actionState.files.length && (
                    <>
                        <Button
                            variant='outlined'
                            color='inherit'
                            size='small'
                            onClick={actionFunction.handleRemoveAllFiles}
                            startIcon={<Iconify icon={'eva:trash-2-outline'} />}
                        >
                            {removeButton}
                        </Button>
                        <LoadingButton
                            type='submit'
                            variant='contained'
                            loading={isMutating}
                            onClick={form.handleSubmit(onSubmit)}
                            startIcon={<Iconify icon={'akar-icons:send'} />}
                            size='small'
                            disabled={actionState.files === null}
                        >
                            {uploadButton}
                        </LoadingButton>
                    </>
                )}
            </Box>
        </>
    );
}
