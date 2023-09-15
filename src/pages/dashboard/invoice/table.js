///React
import { useState } from 'react';
///Named
import { useSnackbar } from 'notistack';
import { fDate } from 'src/utils/formatTime';
//Mui
import { Box, Card, Table, TableBody, Container, TableContainer, TablePagination, Typography, Stack } from '@mui/material';
///Default
import Layout from 'src/layouts/dashboard';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWR from 'swr';
///Components
import { TableHeadCustom, TableRenderBody, useTable, TableSkeleton } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';
import { labelDisplayedRows } from 'src/components/table/utils';
///Section
import { TABLE_HEAD } from 'src/sections/Invoice/utils/schema';
import InvoiceActionDialog from 'src/sections/Invoice/action/InvoiceActionDialog';
import InvoiceTableToolbar from 'src/sections/Invoice/table/InvoiceTableToolbar';
import InvoiceTableRow from 'src/sections/Invoice/table/InvoiceTableRow';

InvoiceListTable.getLayout = function getLayout(page) {
   return <Layout headTitle="Билл төлөлт">{page}</Layout>;
};

export default function InvoiceListTable() {
   const { postFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();
   const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable({ defaultRowsPerPage: 25 });
   const [dialogFormVisible, setDialogFormVisible] = useState(false);
   const [filterModel, setFilterModel] = useState({});
   const [row, setRow] = useState({});

   //Table List pagination
   let pagination = {
      filter: [
         {
            fieldName: 'c.bpay_code',
            fieldType: 'text',
            value: filterModel.bpayCode ? filterModel.bpayCode : null,
            operation: 'like',
         },
         {
            fieldName: 'tg.transaction_id',
            fieldType: 'text',
            value: filterModel.transactionId ? filterModel.transactionId : null,
            operation: 'like',
         },
         {
            fieldName: 'payment_group.total_amount',
            fieldType: 'number',
            value: filterModel.totalAmount,
            operation: 'like',
         },
         {
            fieldName: 'payment_group.updated_at',
            fieldType: 'date',
            value: filterModel.startDate && filterModel.endDate ? `${fDate(filterModel.startDate)}` : null,
            operation: '>',
         },
         {
            fieldName: 'payment_group.updated_at',
            fieldType: 'date',
            value: filterModel.startDate && filterModel.endDate ? `${fDate(filterModel.endDate)}` : null,
            operation: '<',
         },
         {
            fieldName: 'r.id',
            fieldType: 'select',
            value: filterModel.status ? String(filterModel.status) : null,
            operation: 'like',
         },
      ],
      page_no: page + 1,
      per_page: rowsPerPage,
      sort: 'id desc',
   };

   // swr
   const {
      data: tableData,
      isLoading,
      error,
      mutate: tableMutate,
      isValidating,
   } = useSWR(['payment/api/v1/admin/invoice/list', true, pagination], (args) => postFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

   const {
      data: statusList,
      isLoading: statusLoading,
      error: errorr,
      mutate: tableMutating,
      isValidating: validate,
   } = useSWR(['payment/api/v1/reference', true, { ref_code: 'BILL_STATUS', field3: 'admin' }], (args) => postFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   errorr && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

   //Function
   const handleUpdate = async (row) => {
      setRow(row);
      setDialogFormVisible(true);
   };
   const handleClose = async () => {
      setDialogFormVisible(false);
   };

   const filterFunction = (data) => {
      if (Object.keys(data).length > 0) {
         setFilterModel(data);
      }
   };
   const clearFilter = () => {
      setFilterModel('');
   };

   return (
      <>
         <Container maxWidth={'xl'}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" spacing={2}>
               <Typography variant="h3" sx={{ mb: 4 }}>
                  {'Билл төлөлт'}
               </Typography>
            </Stack>
            {!statusLoading && <InvoiceTableToolbar statusList={statusList} filterFunction={filterFunction} clearFilter={clearFilter} />}
            <Card>
               <Scrollbar>
                  <TableContainer sx={{ minWidth: 1400, position: 'relative' }}>
                     <Table size="small">
                        <TableHeadCustom headLabel={TABLE_HEAD} />
                        <TableBody>
                           {isLoading || isValidating ? (
                              <TableSkeleton number={rowsPerPage} />
                           ) : (
                              <TableRenderBody data={tableData?.data}>
                                 {tableData?.data?.map((row, index) => (
                                    <InvoiceTableRow
                                       key={index}
                                       index={index}
                                       row={row}
                                       page={page}
                                       rowsPerPage={rowsPerPage}
                                       handleUpdate={() => handleUpdate(row)}
                                       refreshTable={() => tableMutate()}
                                    />
                                 ))}
                              </TableRenderBody>
                           )}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Scrollbar>

               <Box sx={{ position: 'relative' }}>
                  {!isLoading && (
                     <TablePagination
                        rowsPerPageOptions={[25, 50, 100]}
                        component="div"
                        count={tableData?.pagination?.total_elements || 0}
                        page={page}
                        onPageChange={onChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        labelRowsPerPage={'Хуудсанд харуулах тоо' + ': '}
                        labelDisplayedRows={(to) => labelDisplayedRows(to, 'Нийт систем хэрэглэгч: ')}
                     />
                  )}
               </Box>
            </Card>
         </Container>
         <InvoiceActionDialog row={row} dialogFormVisible={dialogFormVisible} handleClose={handleClose} handleUpdate={handleUpdate} />
      </>
   );
}
