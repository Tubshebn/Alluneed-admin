///Named
import { useSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, MenuItem, CircularProgress, Box, Grid, Typography } from '@mui/material';
import { fDateTime } from 'src/utils/formatTime';
///Default
import PropTypes from 'prop-types';
import useSWR from 'swr';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
//Components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/Label';
///Sections
import InvoiceDetailTable from './InvoiceDetailTable';

//Props
InvoiceActionDialog.propTypes = {
   row: PropTypes.object.isRequired,
};

export default function InvoiceActionDialog({ row, handleClose, dialogFormVisible }) {
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
                           <Typography sx={{ wordSpacing: 2, mb: 0.4 }} variant="subtitle1">{`Гүйлгээний ID:  ${row?.transactionId}`}</Typography>
                           <Typography sx={{ wordSpacing: 2, mb: 0.4 }} variant="subtitle1">{`Гүйлгээ хийсэн огноо:  ${fDateTime(
                              row?.paidAt
                           )}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, mb: 0.4 }}
                              variant="subtitle1"
                           >{`Нийт билл дүн:  ${DetailData?.data?.total_amount}`}</Typography>
                           <Typography
                              sx={{ wordSpacing: 2, mb: 0.3 }}
                              variant="subtitle1"
                           >{`Нийт төлсөн дүн:  ${DetailData?.data?.total_amount}`}</Typography>
                           <Typography sx={{ wordSpacing: 2, mb: 0.4 }} variant="subtitle1">{`Нийт хаагдаагүй төлөлт дүн:  ${'0'}`}</Typography>
                        </Grid>
                        <Grid item>
                           <Typography sx={{ wordSpacing: 2, mb: 0.4 }} variant="subtitle1">{`BPAY ID:  ${row?.bpayCode}`}</Typography>
                           <Typography sx={{ wordSpacing: 2, mb: 0.4 }} variant="subtitle1">{`Хэрэглэгч овог:  ${'Хоосон'}`}</Typography>
                           <Typography sx={{ wordSpacing: 2, mb: 0.4 }} variant="subtitle1">{`Хэрэглэгч нэр:  ${'Хоосон'}`}</Typography>
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
