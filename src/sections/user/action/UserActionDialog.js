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
import {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
///Sections
import { styled } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
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

export default function UserActionDialog({
  role,
  row,
  dialogActionType,
  refreshTable,
  changeDialogStatus,
  orgList,
  adminList,
  setSoum,
  soum,
  soumList,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [roleId, setroleId] = useState(null);
  const { formFetcher, postFetcher } = useSwrFetcher();
  const { enqueueSnackbar } = useSnackbar();
  const { form, actionState, actionFunction } = useAction(
    dialogActionType,
    row,
    changeDialogStatus,
    roleId
  );

  useEffect(() => {
    setroleId(form?.values?.roleId ? form?.values?.roleId : 1);
  }, [form?.values?.roleId]);

  const { trigger, isMutating } = useSWRMutation(
    `/auth${
      form?.values?.roleId === 1 ? '/signup/admin' : 'create_admin_user'
    }`,
    formFetcher,
    {
      onSuccess: (newData) => {
        newData?.response_code === 200
          ? (enqueueSnackbar(
              dialogActionType === 'update'
                ? 'Амжилттай шинэчлэгдсэн'
                : 'Амжилттай бүртгэгдсэн'
            ),
            form.reset(),
            actionFunction.handleClose(),
            refreshTable())
          : enqueueSnackbar(
              newData?.response_msg || 'Алдаа гарлаа, дахин оролдоно уу',
              {
                variant: 'warning',
              }
            );
      },
      onError: (err) => {
        err &&
          enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
            variant: 'warning',
          });
      },
    }
  );

  //Function
  const onSubmit = async () => {
    if (form?.values?.roleId === 1) {
      var body = {
        email: form?.values?.email,
        name: form?.values?.name,
        password: form?.values?.password,
        passwordConfirm: form?.values?.confirmPassword,
        photo: form?.values?.image,
      };
      if (dialogActionType === 'update') {
        body = { ...body, id: row?.id };
      }
    }
    // body.append('lastname', form.values.lastname);
    // body.append('profile', '');
    // body.append('firstname', form.values.firstname);
    // body.append('mobileNumber', form.values.phoneNumber);
    // body.append('email', form.values.email);
    // body.append('organizationName', '');
    // body.append('position', form.values.position);
    // body.append('username', form.values.username);
    // body.append('roleId', form.values.roleId);
    // body.append('organizationId', form.values.orgId);
    // if (form.values.password) {
    //   body.append('password', form.values.password);
    // }
    // if (form.values.confirmPassword) {
    //   body.append('confirmPassword', form.values.confirmPassword);
    // }
    trigger({ body });
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const reader = new FileReader();
      reader.onload = function () {
        form.setValue(
          'image',
          {
            base64: reader.result.replace('data:', '').replace(/^.+,/, ''),
            preview: newFile.preview,
          },
          { shouldValidate: true }
        );
      };
      reader.readAsDataURL(file);
    },
    [form.setValue]
  );

  return (
    <Dialog
      open={actionState.dialogFormVisible}
      onClose={actionFunction.handleClose}
      sx={{ p: 5 }}
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle>
        {dialogActionType === 'update'
          ? 'Систем хэрэглэгч засах'
          : 'Систем хэрэглэгч нэмэх'}
      </DialogTitle>
      {console.log('🚀 ~ form:', form?.values)}

      <DialogContent>
        <FormProvider methods={form.methods}>
          <Stack spacing={3} sx={{ mt: 3 }}>
            {actionState.dialogLoader ? (
              <Stack
                justifyContent='center'
                alignItems='center'
                sx={{ height: 400 }}
              >
                <CircularProgress
                  size={100}
                  thickness={0.6}
                  sx={{ padding: '5px' }}
                />
              </Stack>
            ) : (
              <>
                <RHFSelect
                  fullWidth
                  name='roleId'
                  label='Хэрэглэгчийн эрх'
                  InputLabelProps={{ shrink: true }}
                  SelectProps={{
                    native: false,
                    sx: { textTransform: 'capitalize' },
                  }}
                >
                  {role?.map((option, index) => (
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
                {[1]?.includes(form?.values?.roleId) && (
                  <>
                    <RHFUploadAvatar
                      name='image'
                      maxSize={3145728}
                      onDrop={handleDrop}
                    />
                    <RHFTextField name='name' label='Нэр' fullWidth />
                  </>
                )}
                {[1]?.includes(form?.values?.roleId) && (
                  <RHFTextField name='email' label='И-Мэйл' fullWidth />
                )}
                {/* <RHFTextField
                  type='number'
                  name='phoneNumber'
                  label='Утасны дугаар'
                  fullWidth
                /> */}
                {/* <RHFTextField name='username' label='Нэвтрэх нэр' fullWidth /> */}
                {/* {dialogActionType !== 'create' && (
                  <LabelStyle>
                    Хэрэглэгчийн мэдээлэл засварлах бол нууц үг талбаруудыг
                    заавал оруулах шаардлагагүй ба нууц үгийг солих бол шинэчлэх
                    нууц үгээ оруулна уу.
                  </LabelStyle>
                )} */}
                {[1]?.includes(form?.values?.roleId) && (
                  <RHFTextField
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    label='Нууц үг'
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge='end'
                          >
                            <Iconify
                              icon={
                                showPassword
                                  ? 'eva:eye-fill'
                                  : 'eva:eye-off-fill'
                              }
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                {[1]?.includes(form?.values?.roleId) && (
                  <RHFTextField
                    type={showPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    label='Нууц үг давтах'
                    fullWidth
                  />
                )}
              </>
            )}
          </Stack>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => actionFunction.handleClose()}
          color='inherit'
          size='medium'
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          {'Хаах'}
        </Button>
        <LoadingButton
          disabled={dialogActionType === 'create' && !form.formState.isValid}
          type='submit'
          variant='contained'
          loading={isMutating}
          onClick={form.handleSubmit(onSubmit)}
          startIcon={
            <Iconify
              icon={
                dialogActionType === 'update'
                  ? 'akar-icons:edit'
                  : 'akar-icons:send'
              }
            />
          }
          size='small'
        >
          {dialogActionType === 'update' ? 'Засах' : 'Нэмэх'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
