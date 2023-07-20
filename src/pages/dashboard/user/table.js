///React
import { useState } from 'react';
///Named
import { useSnackbar } from 'notistack';
//Mui
import { Box, Card, Table, TableBody, Container, TableContainer, TablePagination, Typography, Button, Stack } from '@mui/material';
///Default
import Layout from 'src/layouts/dashboard';
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWR from 'swr';
///Components
import { TableHeadCustom, TableRenderBody, useTable, TableSkeleton } from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import { labelDisplayedRows } from 'src/components/table/utils';
///Section
import { UserActionDialog } from 'src/sections/user/action';
import { UserTableRow, UserTableToolbar } from 'src/sections/user/table';
import { TABLE_HEAD } from 'src/sections/user/utils/schema';

UserListTable.getLayout = function getLayout(page) {
   return <Layout headTitle="Систем хэрэглэгчид">{page}</Layout>;
};

export default function UserListTable() {
   const { postFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();
   const { page, rowsPerPage, onChangePage, onChangeRowsPerPage, dense } = useTable();
   const [dialogActionType, setDialogActionType] = useState('');
   const [filterModel, setFilterModel] = useState({});
   const [row, setRow] = useState({});

   //Table List pagination
   let pagination = {
      //   filter: {
      //      email: filterModel.email ? filterModel.email : null,
      //      organization: filterModel.organization ? filterModel.organization : null,
      //      phoneNumber: filterModel.phoneNumber ? filterModel.phoneNumber : null,
      //      roleId: filterModel.authType ? filterModel.authType : null,
      //      username: filterModel.username ? filterModel.username : null,
      //   },
      page_no: page,
      per_page: rowsPerPage,
      sort: 'created_at desc',
   };

   // swr
   const {
      data: tableData,
      isLoading,
      error,
      mutate: tableMutate,
      isValidating,
   } = useSWR(['employee/employee/get_user_list', true, pagination], (args) => postFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

   const {
      data: adminList,
      isLoading: adminListIsLoading,
      error: adminListError,
      mutate: adminListMuate,
      isValidating: adminListisValidating,
   } = useSWR(['user/role/select/all', true], (args) => getFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
   });
   error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

   //Function
   const handleUpdate = async (row) => {
      setRow(row);
      setDialogActionType('update');
   };

   const handleCreate = async () => {
      setRow({});
      setDialogActionType('create');
   };

   const filterFunction = (data) => {
      if (Object.keys(data).length > 0) {
         setFilterModel(data);
      }
   };

   return (
      <>
         <Container maxWidth={'xl'}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" spacing={2}>
               <Typography variant="h4">{'Систем хэрэглэгчдийн жагсаалт'}</Typography>
               <Button variant="contained" startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={() => handleCreate()}>
                  {'Нэмэх'}
               </Button>
            </Stack>

            {!adminListIsLoading && <UserTableToolbar adminList={adminList} filterFunction={filterFunction} />}
            <Card>
               <Scrollbar>
                  <TableContainer sx={{ minWidth: 1500, position: 'relative' }}>
                     <Table>
                        <TableHeadCustom headLabel={TABLE_HEAD} />
                        <TableBody>
                           {isLoading || isValidating ? (
                              <TableSkeleton number={5} />
                           ) : (
                              <TableRenderBody data={tableData?.data}>
                                 {tableData?.data?.map((row, index) => (
                                    <UserTableRow
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
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tableData?.pagination?.totalElements || 0}
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
         <UserActionDialog
            row={row}
            dialogActionType={dialogActionType}
            changeDialogStatus={(e) => {
               setDialogActionType(e);
            }}
            refreshTable={() => tableMutate()}
         />
      </>
   );
}
