///Named
import { LoadingButton } from '@mui/lab';
import {
    Autocomplete,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
///Default
import PropTypes from 'prop-types';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
//Components
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
///Sections
import { styled } from '@mui/system';
import { useState } from 'react';
import useAction from 'src/sections/organization/hooks/useAction';

//Props
OrganizationActionDialog.propTypes = {
    row: PropTypes.object.isRequired,
    dialogActionType: PropTypes.string,
    refreshTable: PropTypes.func,
    changeDialogStatus: PropTypes.func,
};

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function OrganizationActionDialog({ row, dialogActionType, refreshTable, changeDialogStatus }) {
    const [showPassword, setShowPassword] = useState(false);
    const { formFetcher, postFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const [soum, setSoum] = useState('');
    const { form, actionState, actionFunction } = useAction(dialogActionType, row, changeDialogStatus);

    const { trigger, isMutating } = useSWRMutation(`/company`, formFetcher, {
        onSuccess: (newData) => {
            newData?.success
                ? (enqueueSnackbar(dialogActionType === 'update' ? 'Амжилттай шинэчлэгдсэн' : 'Амжилттай бүртгэгдсэн'),
                  form.reset(),
                  actionFunction.handleClose(),
                  refreshTable())
                : enqueueSnackbar(newData?.message || 'Алдаа гарлаа, дахин оролдоно уу', {
                      variant: 'warning',
                  });
        },
        onError: (err) => {
            err &&
                enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
                    variant: 'warning',
                });
        },
    });

    // soum
    let soumPagination = {
        filter: {
            refCode: 'SOUM',
        },
        order: 'DESC',
        sort: 'createdDate',
        pageNo: 0,
        perPage: 999,
    };

    const {
        data: soumList,
        isLoading,
        error,
        mutate: tableMutate,
        isValidating,
    } = useSWR(['/api/v2/get_reference', true, soumPagination], (args) => postFetcher(args), {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    });
    error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

    // bag khoroo
    let bagPagination = {
        filter: {
            parentId: form.values.soumDuuregCode,
        },
        order: 'DESC',
        sort: 'createdDate',
        pageNo: 0,
        perPage: 25,
    };

    // const {
    //     data: bagList,
    //     bagIsLoading,
    //     bagError,
    //     mutate: bagTableMutate,
    //     bagIsValidating,
    // } = useSWR(['/api/v2/get_reference', true, bagPagination], (args) => postFetcher(args), {
    //     revalidateOnFocus: false,
    //     shouldRetryOnError: false,
    // });
    // error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

    //Function
    const onSubmit = async () => {
        let body = {
            id: row?.id,
            name: form?.values?.name,
            email: form?.values?.email,
            phone: form?.values?.phone,
            city: form?.values?.city,
            address: form?.values?.address,
            areas_of_activity: form?.values?.areas_of_activity,
            image: form?.values?.image,
            website: form?.values?.website,
            description: form?.values?.description,
        };
        trigger({ body, ...(dialogActionType === 'update' && { method: 'put' }) });
    };

    return (
        <Dialog open={actionState.dialogFormVisible} onClose={actionFunction.handleClose} sx={{ p: 5 }} maxWidth="sm" fullWidth>
            <DialogTitle>{dialogActionType === 'update' ? 'Байгууллага засах' : 'Байгууллага бүртгэх'}</DialogTitle>
            <DialogContent>
                <FormProvider methods={form.methods}>
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        {actionState.dialogLoader ? (
                            <Stack justifyContent="center" alignItems="center" sx={{ height: 400 }}>
                                <CircularProgress size={100} thickness={0.6} sx={{ padding: '5px' }} />
                            </Stack>
                        ) : (
                            <>
                                <RHFTextField name="aimagNiislelCode" label="Аймаг/Нийслэл" fullWidth disabled />
                                {/* <RHFSelect
                                    fullWidth
                                    name="soumDuuregCode"
                                    label="Сум/Дүүрэг"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                >
                                    {!isLoading &&
                                        soumList?.data?.map((option, index) => (
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
                                </RHFSelect> */}
                                <Autocomplete
                                    sx={{ width: 1 }}
                                    id="tags-outlined"
                                    options={soumList?.data}
                                    getOptionLabel={(option) => option?.name}
                                    defaultValue={soumList || []}
                                    value={soumList?.data?.find((option) => option?.id === soum) || null}
                                    filterSelectedOptions
                                    onChange={(event, value) => soumHandler(value)}
                                    renderInput={(params) => <TextField {...params} label="Сум" placeholder="Хайх" />}
                                />
                                <RHFTextField name="name" label="Байгууллагын нэр" fullWidth />
                                <RHFTextField type="number" name="registrationNumber" label="Байгууллагын регистрийн дугаар" fullWidth />

                                <RHFTextField name="email" label="И-Мэйл" fullWidth />

                                <RHFTextField type="number" name="phoneNumber" label="Утасны дугаар" fullWidth />

                                {/* <RHFSelect
                                    fullWidth
                                    name="bagKhorooCode"
                                    label="Баг/Хороо"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                >
                                    {!isLoading &&
                                        bagList?.data?.map((option, index) => (
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
                                </RHFSelect> */}
                            </>
                        )}
                    </Stack>
                </FormProvider>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => actionFunction.handleClose()}
                    color="inherit"
                    size="medium"
                    startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
                >
                    {'Хаах'}
                </Button>
                <LoadingButton
                    disabled={dialogActionType === 'create' && !form.formState.isValid}
                    type="submit"
                    variant="contained"
                    loading={isMutating}
                    onClick={form.handleSubmit(onSubmit)}
                    startIcon={<Iconify icon={dialogActionType === 'update' ? 'akar-icons:edit' : 'akar-icons:send'} />}
                    size="small"
                >
                    {dialogActionType === 'update' ? 'Засах' : 'Нэмэх'}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
