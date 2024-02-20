// React
import { useState } from 'react';
// Mui
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@mui/material';
// Named
import { useSnackbar } from 'notistack';
// Default
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import Layout from 'src/layouts/dashboard';
import useSWR from 'swr';
// Components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import {
  TableHeadCustom,
  TableRenderBody,
  TableSkeleton,
  useTable,
} from 'src/components/table';
import { labelDisplayedRows } from 'src/components/table/utils';
// Sections
import { UserActionDialog } from 'src/sections/user/action';
import { UserTableRow, UserTableToolbar } from 'src/sections/user/table';
import { TABLE_HEAD } from 'src/sections/user/utils/schema';

UserListTable.getLayout = function getLayout(page) {
  return <Layout headTitle='Систем хэрэглэгчид'>{page}</Layout>;
};

export default function UserListTable() {
  const [dialogActionType, setDialogActionType] = useState('');
  const [filterModel, setFilterModel] = useState({});
  const [row, setRow] = useState({});
  const { postFetcher } = useSwrFetcher();
  const { enqueueSnackbar } = useSnackbar();
  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();

  //Table List pagination
  let pagination = {
    filter: [],
    page_no: page + 1,
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
  } = useSWR(['/users/list', true, pagination], (args) => postFetcher(args), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  error &&
    enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

  let paginationRoleList = {
    filter: [],
    page_no: 0,
    per_page: 1000,
    sort: 'created_at desc',
  };

  const {
    data: roleData,
    isLoading: roleDataLoading,
    error: roleErr,
    isValidating: roleDataValidating,
  } = useSWR(
    ['/role/list', true, paginationRoleList],
    (args) => postFetcher(args),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );
  error &&
    enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

  //Function
  const handleUpdate = async (row) => {
    setRow(row);
    setDialogActionType('update');
  };

  const handleCreate = async () => {
    setRow({});
    setDialogActionType('create');
  };
  const handleView = async (row) => {
    setRow(row);
    setDialogActionType('view');
  };

  return (
    <>
      <Container maxWidth={'xl'}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent='space-between'
          spacing={2}
          sx={{ mb: 5 }}
        >
          <Typography variant='h4' sx>
            {'Систем хэрэглэгчдийн жагсаалт'}
          </Typography>
          <Button
            variant='contained'
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            onClick={() => handleCreate()}
          >
            {'Нэмэх'}
          </Button>
        </Stack>

        {/* {!isLoading && <UserTableToolbar adminList={adminList} filterFunction={filterFunction} />} */}
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
                          handleView={() => handleView(row)}
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
                component='div'
                count={tableData?.pagination?.totalElements || 0}
                page={page}
                onPageChange={onChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onChangeRowsPerPage}
                labelRowsPerPage={'Хуудсанд харуулах тоо' + ': '}
                labelDisplayedRows={(to) =>
                  labelDisplayedRows(to, 'Нийт систем хэрэглэгч: ')
                }
              />
            )}
          </Box>
        </Card>
      </Container>
      {!roleDataLoading && (
        <UserActionDialog
          role={roleData?.data}
          row={row}
          dialogActionType={dialogActionType}
          changeDialogStatus={(e) => {
            setDialogActionType(e);
          }}
          refreshTable={() => tableMutate()}
        />
      )}
    </>
  );
}
