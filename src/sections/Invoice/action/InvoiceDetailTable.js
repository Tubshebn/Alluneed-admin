import { Box, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import Label from 'src/components/label/Label';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableRenderBody, TableSkeleton } from 'src/components/table';
import { DETAIL_TABLE_HEAD } from 'src/sections/Invoice/utils/schema';
import { fCurrency } from 'src/utils/formatNumber';

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
                              <InvoiceDetailTableRow key={index} index={index} row={row} />
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
   console.log('🚀 ~ file: InvoiceDetailTable.js:36 ~ InvoiceDetailTableRow ~ row:', row);
   const { code, total_amount, transaction, bills } = row;
   const [open, setOpen] = useState(false);

   return (
      <>
         <TableRow hover>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               <Label variant="filled" color="success">
                  {transaction?.transactionId}
               </Label>
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {transaction.transactionId}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(total_amount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(total_amount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(total_amount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(total_amount.toFixed(2))}
            </TableCell>
            <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
               {fCurrency(total_amount.toFixed(2))}
            </TableCell>
            <TableCell>
               <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  <Label variant={'soft'} color={status === 'Төлөгдөж буй' ? 'warning' : 'success'} sx={{ textTransform: 'capitalize' }}>
                     {open ? <Iconify icon="ep:arrow-up-bold" /> : <Iconify icon="ep:arrow-down-bold" />}
                  </Label>
               </IconButton>
            </TableCell>
         </TableRow>
         <TableRow>
            <TableCell style={{ padding: 4 }} colSpan={10}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <DetailSubTable data={bills} />
               </Collapse>
            </TableCell>
         </TableRow>
      </>
   );
}

function DetailSubTable({ data }) {
   console.log('🚀 ~ file: InvoiceDetailTable.js:87 ~ DetailSubTable ~ data:', data);
   const isNotFound = !data?.length;

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
               {data?.map((o, i) => (
                  <TableRow key={i}>
                     <TableCell>{o.factor_name}</TableCell>
                     <TableCell>{o.min_value}</TableCell>
                     <TableCell>{o.max_value}</TableCell>
                  </TableRow>
               ))}
            </TableBody>
            {isNotFound && (
               <TableBody>
                  <TableRow>
                     <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                        <SearchNotFound />
                     </TableCell>
                  </TableRow>
               </TableBody>
            )}
         </Table>
      </Box>
   );
}
