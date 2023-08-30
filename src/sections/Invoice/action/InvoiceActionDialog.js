///Named
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, MenuItem, CircularProgress, Box, Grid, Typography } from '@mui/material';
///Default
import PropTypes from 'prop-types';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
//Components
import Iconify from 'src/components/iconify';
import { fDateTime } from 'src/utils/formatTime';
import Label from 'src/components/label/Label';
import InvoiceDetailTable from './InvoiceDetailTable';
///Sections

//Props
InvoiceActionDialog.propTypes = {
   row: PropTypes.object.isRequired,
   refreshTable: PropTypes.func,
};

export default function InvoiceActionDialog({ row, handleClose, handleUpdate, dialogFormVisible }) {
   const { getFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();

   if (!row?.id) {
      return null;
   }
   const {
      data: DetailData,
      isLoading,
      error,
      mutate: tableMutate,
      isValidating,
   } = useSWR([`/payment/api/v1/admin/invoice/${row?.id}`, true], (args) => getFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   if (error) {
      enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });
   }
   //Function

   return (
      <Dialog open={dialogFormVisible} onClose={handleClose} sx={{ p: 5 }} maxWidth="xl" fullWidth>
         <DialogTitle variant="h4" sx={{ textAlign: 'center' }}>
            {'Билл төлөлт дэлгэрэнгүй'}
         </DialogTitle>
         <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
            <Label variant={'soft'} color={row?.status === 'Төлөгдөж буй' ? 'warning' : 'success'} sx={{ textTransform: 'capitalize' }}>
               {row?.status}
            </Label>
         </Typography>
         <DialogContent sx={{ mx: 5 }}>
            <Stack spacing={3} sx={{ mt: 3 }}>
               {isLoading ? (
                  <Stack justifyContent="center" alignItems="center" sx={{ height: 400 }}>
                     <CircularProgress size={100} thickness={0.6} sx={{ padding: '5px' }} />
                  </Stack>
               ) : (
                  <>
                     <Grid container spacing={2} justifyContent="space-between" sx={{ minHeight: 170 }}>
                        <Grid item>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Гүйлгээний ID:  ${row?.transactionId}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Гүйлгээний огноо:  ${fDateTime(row?.paidAt)}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Нийт билл дүн:  ${DetailData?.data?.total_amount}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.3 }}
                              variant="subtitle1"
                           >{`Нийт төлсөн дүн:  ${DetailData?.data?.total_amount}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Нийт хаагдаагүй төлөлт дүн:  ${'0'}`}</Typography>
                        </Grid>
                        <Grid item>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`BPAY ID:  ${row?.bpayCode}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Хэрэглэгч овог:  ${'Хоосон'}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Хэрэглэгч нэр:  ${'Хоосон'}`}</Typography>
                        </Grid>
                     </Grid>
                  </>
               )}
            </Stack>
            <InvoiceDetailTable data={DetailData?.data?.paymentSubGroups} isLoading={isLoading} isValidating={isValidating} />
         </DialogContent>
         <DialogActions>
            <Button onClick={() => handleClose()} color="inherit" size="medium" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
               {'Хаах'}
            </Button>
         </DialogActions>
      </Dialog>
   );
}
