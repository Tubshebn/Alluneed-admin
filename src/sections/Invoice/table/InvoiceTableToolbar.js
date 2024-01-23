///React
import { useState, useEffect } from 'react';
//Named
import { useSnackbar } from 'notistack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//Mui
import { Stack, TextField, MenuItem, IconButton } from '@mui/material';
///Default
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify/Iconify';

// props
InvoiceTableToolbar.propTypes = {
   filterFunction: PropTypes.func,
   statusList: PropTypes.array,
};

export default function InvoiceTableToolbar({ filterFunction, statusList, clearFilter }) {
   const [filterModel, setFilterModel] = useState({});
   const { enqueueSnackbar } = useSnackbar();

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         if (filterModel) {
            filterFunction(filterModel);
         }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
   }, [filterModel]);

   const handlingFilterChange = (name, value) => {
      setFilterModel({ ...filterModel, [name]: value });
   };

   const isValid = (size, value, type) => {
      if (value) {
         if (value?.length < size) {
            handlingFilterChange(type, value);
         } else {
            enqueueSnackbar(`${size}-с их тэмдэгт оруулж болохгүй`, { variant: 'warning' });
         }
      } else {
         handlingFilterChange(type, '');
      }
   };

   const clearFunction = () => {
      clearFilter();
      setFilterModel('');
   };

   return (
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 3, mb: 3 }}>
         <DatePicker
            label="Эхлэх өдөр"
            value={filterModel?.startDate ? filterModel?.startDate : null}
            ampm={false}
            onChange={(event) => handlingFilterChange('startDate', event)}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ maxWidth: { xs: 180, md: 200 } }} InputLabelProps={{ shrink: true }} />}
         />

         <DatePicker
            label="Дуусах өдөр"
            ampm={false}
            minDate={filterModel?.startDate}
            value={filterModel?.endDate ? filterModel?.endDate : null}
            onChange={(event) => handlingFilterChange('endDate', event)}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ maxWidth: { xs: 180, md: 200 } }} InputLabelProps={{ shrink: true }} />}
         />
         <TextField
            fullWidth
            label="Bpay ID"
            sx={{
               maxWidth: 220,
            }}
            value={filterModel?.bpayCode ? filterModel?.bpayCode : ''}
            onChange={(event) => isValid(100, event.target.value, 'bpayCode')}
         />

         <TextField
            fullWidth
            label="Гүйлгээний ID "
            sx={{
               maxWidth: 220,
            }}
            value={filterModel?.transactionId ? filterModel?.transactionId : ''}
            onChange={(event) => handlingFilterChange('transactionId', event.target.value)}
         />

         <TextField
            fullWidth
            label="Төлсөн дүнгээр"
            sx={{
               maxWidth: 220,
            }}
            value={filterModel?.totalAmount ? filterModel?.totalAmount : ''}
            onChange={(event) => handlingFilterChange('totalAmount', event.target.value)}
         />

         <TextField
            fullWidth
            select
            label="Төлөв"
            InputLabelProps={{ shrink: true }}
            sx={{
               maxWidth: 220,
            }}
            value={filterModel?.status ? filterModel?.status : ''}
            onChange={(event) => handlingFilterChange('status', event.target.value)}
         >
            <MenuItem
               value=""
               sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
               }}
            >
               Бүгд
            </MenuItem>
            {statusList &&
               statusList?.map((option, index) => (
                  <MenuItem
                     key={index}
                     value={option?.id}
                     sx={{
                        mx: 1,
                        my: 0.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        textTransform: 'capitalize',
                     }}
                  >
                     {option?.name}
                  </MenuItem>
               ))}
         </TextField>
         <IconButton onClick={clearFunction} sx={{ mt: 4, maxHeight: 60 }}>
            <Iconify icon="tabler:reload" sx={{ fontSize: 25 }} align="center" />
         </IconButton>
      </Stack>
   );
}