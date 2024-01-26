///React
import { useCallback, useState } from 'react';
///Named
import { useSnackbar } from 'notistack';
import { fDate } from 'src/utils/formatTime';
import { useAuthContext } from 'src/auth/useAuthContext';
import { saveAs } from 'file-saver';
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
import { TABLE_HEAD } from 'src/sections/user/utils/schema';
import UserTableRow from 'src/sections/user/table/UserTableRow';
import UserTableToolbar from 'src/sections/user/table/UserTableToolbar';
import CustomerActionDialog from 'src/sections/user/action/CustomerActionDialog';

UserListTable.getLayout = function getLayout(page) {
    return <Layout headTitle="Хэрэглэгчийн жагсаалт">{page}</Layout>;
};

export default function UserListTable() {
    const { postFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable({ defaultRowsPerPage: 25 });
    const [dialogFormVisible, setDialogFormVisible] = useState(false);
    const [filterModel, setFilterModel] = useState({});
    const [row, setRow] = useState({});
    const [open, setOpen] = useState(false);
    const {
        handlers: { POST },
    } = useAuthContext();

    //Table List pagination
    let pagination = {
        filter: [
            {
                fieldName: 'email',
                fieldType: 'text',
                value: filterModel.email ? filterModel.email : null,
                operation: 'like',
            },

            {
                fieldName: 'bpay_code',
                fieldType: 'text',
                value: filterModel.bpay_code ? filterModel.bpay_code : null,
                operation: 'like',
            },

            {
                fieldName: 'phone_number',
                fieldType: 'text',
                value: filterModel.phone_number ? filterModel.phone_number : null,
                operation: 'like',
            },
            {
                fieldName: 'created_at',
                fieldType: 'date',
                value: filterModel.startDate && filterModel.endDate ? `${fDate(filterModel.startDate)}` : null,
                operation: '>',
            },
            {
                fieldName: 'created_at',
                fieldType: 'date',
                value: filterModel.startDate && filterModel.endDate ? `${fDate(filterModel.endDate)}` : null,
                operation: '<',
            },
        ],
        pageNo: page + 1,
        perPage: rowsPerPage,
        sort: 'id desc',
    };

    // swr
    const {
        data: tableData,
        isLoading,
        error,
        mutate: tableMutate,
        isValidating,
    } = useSWR(['payment/api/v1/admin/customer/list', true, pagination], (args) => postFetcher(args), {
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    });
    error && enqueueSnackbar('Өгөгдөл татахад алдаа гарлаа', { variant: 'warning' });

    //Function
    const handleUpdate = async (row) => {
        setRow(row);
        setDialogFormVisible(true);
    };

    const handleClose = async () => {
        setDialogFormVisible(false);
        setOpen(false);
    };

    const filterFunction = (data) => {
        if (Object.keys(data).length > 0) {
            setFilterModel(data);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCloose = () => {
        setOpen(false);
    };

    const clearFilter = () => {
        setFilterModel('');
    };
    return (
        <>
            <Container maxWidth={'xl'}>
                <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" spacing={2}>
                    <Typography variant="h3" sx={{ mb: 4 }}>
                        {'Хэрэглэгчийн жагсаалт'}
                    </Typography>
                </Stack>
                {!isLoading && <UserTableToolbar filterFunction={filterFunction} clearFilter={clearFilter} />}
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
            <CustomerActionDialog
                row={row}
                dialogFormVisible={dialogFormVisible}
                handleCloose={handleCloose}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
                open={open}
                handleOpen={handleOpen}
            />
        </>
    );
}
