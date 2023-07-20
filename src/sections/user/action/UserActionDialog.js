///Named
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, MenuItem, CircularProgress } from '@mui/material';
///Default
import PropTypes from 'prop-types';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
//Components
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
///Sections
import useAction from 'src/sections/user/hooks/useAction';

//Props
UserActionDialog.propTypes = {
   row: PropTypes.object.isRequired,
   dialogActionType: PropTypes.string,
   refreshTable: PropTypes.func,
   changeDialchangeDialogStatusogStatus: PropTypes.func,
};

export default function UserActionDialog({ row, dialogActionType, refreshTable, changeDialogStatus }) {
   const { formFetcher, getFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();
   const { form, actionState, actionFunction } = useAction(dialogActionType, row, changeDialogStatus);

   const { trigger, isMutating } = useSWRMutation(`/api/${dialogActionType === 'update' ? 'edit_admin_user' : 'create_admin_user'}`, formFetcher, {
      onSuccess: (newData) => {
         newData?.success && enqueueSnackbar(dialogActionType === 'update' ? 'Амжилттай шинэчлэгдсэн' : 'Амжилттай бүртгэгдсэн');
         form.reset();
         actionFunction.handleClose();
         refreshTable();
      },
      onError: (err) => {
         err &&
            enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
               variant: 'warning',
            });
         actionFunction.handleClose();
      },
   });

   const {
      data: adminList,
      isLoading,
      error,
      mutate: tableMutate,
      isValidating,
   } = useSWR(['user/role/select/all', true], (args) => getFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

   //Function
   const onSubmit = async () => {
      var body = new FormData();
      if (dialogActionType === 'update') {
         body.append('id', form.values.id);
      }
      body.append('lastname', form.values.lastname);
      body.append('firstname', form.values.firstname);
      body.append('mobileNumber', form.values.phoneNumber);
      body.append('email', form.values.email);
      body.append('organizationName', form.values.organizationName);
      body.append('position', form.values.position);
      body.append('username', form.values.username);
      body.append('roleId', form.values.roleId);
      if (form.values.password !== '') {
         body.append('password', form.values.password);
      }
      if (form.values.confirmPassword !== '') {
         body.append('confirmPassword', form.values.confirmPassword);
      }
      trigger({ body, type: 'multipart/form-data' });
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
                           {!isLoading &&
                              adminList?.map((option, index) => (
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
                        <RHFTextField name="organizationName" label="Байгууллагын нэр" fullWidth />

                        <RHFTextField name="lastname" label="Ажилтны овог" fullWidth />

                        <RHFTextField name="firstname" label="Ажилтны Нэр" fullWidth />

                        <RHFTextField name="position" label="Албан тушаал" fullWidth />

                        <RHFTextField name="email" label="И-Мэйл" fullWidth />

                        <RHFTextField name="phoneNumber" label="Утасны дугаар" fullWidth />

                        <RHFTextField name="username" label="Нэвтрэх нэр" fullWidth />

                        <RHFTextField type="text" name="password" label="Нууц үг" fullWidth />

                        <RHFTextField type="text" name="confirmPassword" label="Нууц үг давтах" fullWidth />
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
