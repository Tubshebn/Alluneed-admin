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
    IconButton,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
///Default
import PropTypes from 'prop-types';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWRMutation from 'swr/mutation';
//Components
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
///Sections
import { styled } from '@mui/system';
import { useState } from 'react';
import useAction from 'src/sections/user/hooks/useAction';
import useSWR from 'swr';

//Props
UserActionDialog.propTypes = {
    row: PropTypes.object.isRequired,
    dialogActionType: PropTypes.string,
    refreshTable: PropTypes.func,
    changeDialogStatus: PropTypes.func,
    orgList: PropTypes.array,
    adminList: PropTypes.array,
};

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function UserActionDialog({ row, dialogActionType, refreshTable, changeDialogStatus, orgList, adminList, setSoum, soum, soumList }) {
    const [showPassword, setShowPassword] = useState(false);
    const { formFetcher, postFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const { form, actionState, actionFunction } = useAction(dialogActionType, row, changeDialogStatus);

    const { trigger, isMutating } = useSWRMutation(`/api/${dialogActionType === 'update' ? 'edit_admin_user' : 'create_admin_user'}`, formFetcher, {
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

    //Function
    const onSubmit = async () => {
        var body = new FormData();
        if (dialogActionType === 'update') {
            body.append('id', form.values.id);
        }
        body.append('lastname', form.values.lastname);
        body.append('profile', '');
        body.append('firstname', form.values.firstname);
        body.append('mobileNumber', form.values.phoneNumber);
        body.append('email', form.values.email);
        body.append('organizationName', '');
        body.append('position', form.values.position);
        body.append('username', form.values.username);
        body.append('roleId', form.values.roleId);
        body.append('organizationId', form.values.orgId);
        if (form.values.password) {
            body.append('password', form.values.password);
        }
        if (form.values.confirmPassword) {
            body.append('confirmPassword', form.values.confirmPassword);
        }
        trigger({ body, type: 'multipart/form-data' });
    };

    const soumHandler = (val) => {
        if (val) {
            setSoum(val?.id);
        } else {
            setSoum(null);
        }
    };

    return (
        <Dialog open={actionState.dialogFormVisible} onClose={actionFunction.handleClose} sx={{ p: 5 }} maxWidth="sm" fullWidth>
            <DialogTitle>{dialogActionType === 'update' ? 'Систем хэрэглэгч засах' : 'Систем хэрэглэгч нэмэх'}</DialogTitle>
            <DialogContent>
                <FormProvider methods={form.methods}>
                    <Stack spacing={3} sx={{ mt: 3 }}>
                        {actionState.dialogLoader ? (
                            <Stack justifyContent="center" alignItems="center" sx={{ height: 400 }}>
                                <CircularProgress size={100} thickness={0.6} sx={{ padding: '5px' }} />
                            </Stack>
                        ) : (
                            <>
                                <RHFSelect
                                    fullWidth
                                    name="roleId"
                                    label="Хэрэглэгчийн эрх"
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        native: false,
                                        sx: { textTransform: 'capitalize' },
                                    }}
                                >
                                    {adminList?.map((option, index) => (
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
                                <Autocomplete
                                    sx={{ width: 1 }}
                                    id="tags-outlined"
                                    options={soumList}
                                    getOptionLabel={(option) => option?.name}
                                    defaultValue={soumList || []}
                                    value={soumList?.find((option) => option?.id === soum) || null}
                                    filterSelectedOptions
                                    onChange={(event, value) => soumHandler(value)}
                                    renderInput={(params) => <TextField {...params} label="Сум" placeholder="Хайх" />}
                                />

                                <Autocomplete
                                    sx={{ width: 1 }}
                                    id="tags-outlined"
                                    options={orgList?.data ? orgList?.data : []}
                                    getOptionLabel={(option) => option?.name}
                                    defaultValue={orgList?.data || []}
                                    value={orgList?.data?.find((option) => option?.id === form?.values?.orgId) || null}
                                    filterSelectedOptions
                                    onChange={(e, value) => form.reset({ ...form.values, orgId: value?.id })}
                                    renderInput={(params) => <TextField {...params} label="Байгууллага" placeholder="Хайх" />}
                                    noOptionsText="Өгөгдөл байхгүй"
                                />
                                <RHFTextField name="lastname" label="Ажилтны овог" fullWidth />
                                <RHFTextField name="firstname" label="Ажилтны Нэр" fullWidth />
                                <RHFTextField name="position" label="Албан тушаал" fullWidth />
                                <RHFTextField name="email" label="И-Мэйл" fullWidth />
                                <RHFTextField type="number" name="phoneNumber" label="Утасны дугаар" fullWidth />
                                <RHFTextField name="username" label="Нэвтрэх нэр" fullWidth />
                                {dialogActionType !== 'create' && (
                                    <LabelStyle>
                                        Хэрэглэгчийн мэдээлэл засварлах бол нууц үг талбаруудыг заавал оруулах шаардлагагүй ба нууц үгийг солих бол
                                        шинэчлэх нууц үгээ оруулна уу.
                                    </LabelStyle>
                                )}
                                <RHFTextField
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    label="Нууц үг"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <RHFTextField type={showPassword ? 'text' : 'password'} name="confirmPassword" label="Нууц үг давтах" fullWidth />
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
