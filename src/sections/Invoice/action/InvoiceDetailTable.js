//React
import { useState } from 'react';
//Named
import { fCurrency } from 'src/utils/formatNumber';
import { useSnackbar } from 'notistack';
//MUI
import { Box, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
//Default
import useSWRMutation from 'swr/mutation';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import PropTypes from 'prop-types';
//Components
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label/Label';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableRenderBody, TableSkeleton } from 'src/components/table';
//sections
import { DETAIL_TABLE_HEAD } from 'src/sections/Invoice/utils/schema';

//Props
InvoiceDetailTable.propTypes = {
   data: PropTypes.array.isRequired,
};

export default function InvoiceDetailTable({ data, isLoading, isValidating }) {
   return (
      <Stack>
         <Scrollbar>
            <TableContainer>
               <Table>
                  <TableHeadCustom headLabel={DETAIL_TABLE_HEAD} />
                  <TableBody>
                     {isLoading || isValidating ? (
                        <TableSkeleton number={3} />
                     ) : (
                        <TableRenderBody data={data}>
                           {data?.map((row, index) => (
                              <InvoiceDetailTableRow key={index} index={index} row={row} isLoading={isLoading} />
                           ))}
                        </TableRenderBody>
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
         </Scrollbar>
      </Stack>
   );
}

function InvoiceDetailTableRow({ row, index }) {
   const { code, billAmount, billTotalAmount, lossAmount, paidAmount, transaction, bills } = row;
   const [open, setOpen] = useState(false);

   return (
      <>
         <TableRow hover onClick={() => setOpen(!open)}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               <Label variant="filled" color="success">
                  {code}
               </Label>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {transaction?.transactionId}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(billAmount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(lossAmount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(billTotalAmount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(paidAmount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {transaction.statusId === 1001 ? 0 : billAmount}
            </TableCell>
            <TableCell>
               <IconButton aria-label="expand row" size="small">
                  <Label variant="soft" color="success">
                     {open ? <Iconify icon="ep:arrow-up-bold" /> : <Iconify icon="ep:arrow-down-bold" />}
                  </Label>
               </IconButton>
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ padding: 4 }} colSpan={10}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <DetailSubTable data={bills} transactionId={transaction?.transactionId} />
               </Collapse>
            </TableCell>
         </TableRow>
      </>
   );
}

function DetailSubTable({ data, isLoading, transactionId }) {
   const { getFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();

   const { trigger } = useSWRMutation([`payment/api/v1/admin/invoice/check/${transactionId}`, true], (args) => getFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onSuccess: (newData) => {
         newData?.responseCode === false
            ? enqueueSnackbar(newData.responseMsg, { variant: 'warning' })
            : enqueueSnackbar(newData.responseMsg, { variant: 'success' });
      },
      onError: (err) => {
         err &&
            enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
               variant: 'warning',
            });
      },
   });

   return (
      <Box>
         <Table aria-label="purchases">
            <TableHead>
               <TableRow>
                  <TableCell>{'№'}</TableCell>
                  <TableCell>{'Билл №'}</TableCell>
                  <TableCell>{'Билл огноо'}</TableCell>
                  <TableCell>{'Билл нэр'}</TableCell>
                  <TableCell>{'Билл цэвэр дүн'}</TableCell>
                  <TableCell>{'Алданги'}</TableCell>
                  <TableCell>{'Билл нийт дүн'}</TableCell>
                  <TableCell>{'Нийт төлсөн дүн'}</TableCell>
                  <TableCell>{'Хаагдаагүй төлөлт'}</TableCell>
               </TableRow>
            </TableHead>

            <TableBody>
               {isLoading ? (
                  <TableSkeleton number={3} />
               ) : (
                  <TableRenderBody data={data}>
                     {data?.map((row, i) => (
                        <TableRow key={i}>
                           <TableCell>{i + 1}</TableCell>
                           <TableCell>{row?.billId}</TableCell>
                           <TableCell>{`${row?.year} - ${row?.month} сар`}</TableCell>
                           <TableCell>{row.orgName}</TableCell>
                           <TableCell>{fCurrency(row.billAmount.toFixed(2))}</TableCell>
                           <TableCell>{fCurrency(row.lossAmount.toFixed(2))}</TableCell>
                           <TableCell>{fCurrency(row.totalAmount.toFixed(2))}</TableCell>
                           <TableCell>{fCurrency(row?.paidAmount.toFixed(2))}</TableCell>
                           <TableCell>{row.statusId === 1001 ? 0 : fCurrency(row?.billAmount.toFixed(2))}</TableCell>
                        </TableRow>
                     ))}
                  </TableRenderBody>
               )}
            </TableBody>
         </Table>
         <Box sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', display: 'flex', pr: 4 }}>
            <Button size="medium" onClick={trigger} variant="contained" color="info">
               Төлөлт лавлах
            </Button>
         </Box>
      </Box>
   );
}
