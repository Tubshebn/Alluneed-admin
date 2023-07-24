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
import useAction from 'src/sections/merchant/hooks/useAction';

//Props
MerchantActionDialog.propTypes = {
   row: PropTypes.object.isRequired,
   dialogActionType: PropTypes.string,
   refreshTable: PropTypes.func,
   changeDialchangeDialogStatusogStatus: PropTypes.func,
};

export default function MerchantActionDialog({ row, dialogActionType, refreshTable, changeDialogStatus }) {
   const { formFetcher, postFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();
   const { form, actionState, actionFunction } = useAction(dialogActionType, row, changeDialogStatus);

   //RoleList Request body
   const pagination = {
      page_no: 0,
      per_page: 1000,
      sort: 'created_at desc',
      filter: [],
   };

   const { trigger, isMutating } = useSWRMutation(
      `/users/api/v1/merchant/${dialogActionType === 'update' ? 'update/' + row?.id : 'create'}`,
      formFetcher,
      {
         onSuccess: (newData) => {
            newData?.responseCode === true
               ? enqueueSnackbar(dialogActionType === 'update' ? 'Амжилттай шинэчлэгдсэн' : 'Амжилттай бүртгэгдсэн')
               : enqueueSnackbar(newData.responseMsg, { variant: 'warning' });
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
      }
   );

   const {
      data: roleList,
      isLoading,
      error,
   } = useSWR(['/users/api/v1/role/list', true, pagination], (args) => postFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

   //Function
   const onSubmit = async () => {
      let body = {
         username: form?.values?.username,
         password: form?.values?.password || '',
         roleId: form?.values?.roleId,
      };
      trigger({ body });
   };

   return (
      <Dialog open={actionState.dialogFormVisible} onClose={actionFunction.handleClose} sx={{ p: 5 }} maxWidth="sm" fullWidth>
         <DialogTitle>{dialogActionType === 'update' ? 'Мерчант засах' : 'Мерчант нэмэх'}</DialogTitle>
         <DialogContent>
            <FormProvider methods={form.methods}>
               <Stack spacing={3} sx={{ mt: 2 }}>
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
                           SelectProps={{
                              native: false,
                              sx: { textTransform: 'capitalize' },
                           }}
                        >
                           <MenuItem
                              value={''}
                              sx={{
                                 mx: 1,
                                 my: 0.5,
                                 borderRadius: 0.75,
                                 typography: 'body2',
                                 textTransform: 'capitalize',
                              }}
                           >
                              Сонгох
                           </MenuItem>
                           {!isLoading &&
                              roleList?.data?.map((option, index) => (
                                 <MenuItem
                                    key={index}
                                    value={option?.id || row?.roleId || ''}
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
                        <RHFTextField type="text" name="username" label="Нэвтрэх нэр" fullWidth />
                        {dialogActionType === 'create' && <RHFTextField type="text" name="password" label="Нууц үг" fullWidth />}
                        {dialogActionType === 'create' && <RHFTextField type="text" name="confirmPassword" label="Нууц үг давтах" fullWidth />}
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
