import { useState } from 'react';
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
///Sections
import CustomerDetailTable from './CustomerDetailTable';

//Props
CustomerActionDialog.propTypes = {
   row: PropTypes.object.isRequired,
};

export default function CustomerActionDialog({ row, handleClose, dialogFormVisible, open, handleOpen, handleCloose }) {
   const { postFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();

   const pagination = { filter: [], page_no: 1, per_page: 5, sort: 'id desc' };

   if (!row?.bpayCode) {
      return null;
   }
   const {
      data: DetailData,
      isLoading,
      error,
      mutate: tableMutate,
      isValidating,
   } = useSWR([`payment/api/v1/admin/invoice/user/list/${row?.bpayCode}`, true, pagination], (args) => postFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   if (error) {
      enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });
   }

   return (
      <Dialog open={dialogFormVisible} onClose={handleClose} sx={{ p: 5 }} maxWidth="xl" fullWidth>
         <DialogTitle variant="h4" sx={{ textAlign: 'center' }}>
            {open === false ? 'Гүйлгээний түүх' : 'Гүйлгээний дэлгэрэнгүй'}
         </DialogTitle>

         <DialogContent sx={{ mx: 5 }}>
            {isLoading ? (
               <Stack justifyContent="center" alignItems="center" sx={{ height: 400 }}>
                  <CircularProgress size={100} thickness={0.6} sx={{ padding: '5px' }} />
               </Stack>
            ) : (
               <Stack spacing={3} sx={{ mt: 3 }}>
                  <>
                     <Grid container spacing={2} justifyContent="space-between" sx={{ minHeight: 50 }}>
                        <Grid item>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`BPAY ID:  ${row?.bpayCode}`}</Typography>
                        </Grid>
                        <Grid item>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Хэрэглэгч овог:  ${'Хоосон'}`}</Typography>
                        </Grid>
                        <Grid item>
                           <Typography
                              sx={{ wordSpacing: 2, textTransform: 'capitalize', mb: 0.4 }}
                              variant="subtitle1"
                           >{`Хэрэглэгч нэр:  ${'Хоосон'}`}</Typography>
                        </Grid>
                     </Grid>
                  </>
                  <CustomerDetailTable
                     handleCloose={handleCloose}
                     handleOpen={handleOpen}
                     open={open}
                     data={DetailData?.data[0]?.paymentSubGroups || ''}
                     paidAt={DetailData?.data[0]?.paidAt}
                     isLoading={isLoading}
                     isValidating={isValidating}
                  />
               </Stack>
            )}
         </DialogContent>
         <DialogActions>
            <Button onClick={() => handleClose()} color="inherit" size="medium" startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
               {'Хаах'}
            </Button>
         </DialogActions>
      </Dialog>
   );
}
