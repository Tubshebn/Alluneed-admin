///React
import { useState } from 'react';
///Named
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
//Mui
import { Box, Button, Card, Container, Stack, Table, TableBody, TableContainer, TablePagination, Typography } from '@mui/material';
///Default
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import Layout from 'src/layouts/dashboard';
import useSWR from 'swr';
///Components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableRenderBody, TableSkeleton, useTable } from 'src/components/table';
import { labelDisplayedRows } from 'src/components/table/utils';
///Section
import { useAuthContext } from 'src/auth/useAuthContext';
import { OrganizationActionDialog } from 'src/sections/organization/action';
import { OrganizationTableRow, OrganizationTableToolbar } from 'src/sections/organization/table';
import { TABLE_HEAD } from 'src/sections/organization/utils/schema';

AgencyTable.getLayout = function getLayout(page) {
    return <Layout headTitle='Агентууд'>{page}</Layout>;
};

export default function AgencyTable() {
    const {
        state: { user },
    } = useAuthContext();
    const { push } = useRouter();
    const { postFetcher } = useSwrFetcher();
    const { enqueueSnackbar } = useSnackbar();
    const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTable();
    const [dialogActionType, setDialogActionType] = useState('');
    const [filterModel, setFilterModel] = useState({});
    const [row, setRow] = useState({});

    //Table List pagination
    let pagination = {
        filter: [],
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
    } = useSWR(['agent/list', true, pagination], (args) => postFetcher(args), {
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
        setFilterModel(data);
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
                    <Typography variant='h4'>{'Агентуудын жагсаалт'}</Typography>
                    <Button variant='contained' startIcon={<Iconify icon={'eva:plus-fill'} />} onClick={() => handleCreate()}>
                        {'Бүртгэх'}
                    </Button>
                </Stack>

                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ position: 'relative' }}>
                            <Table>
                                <TableHeadCustom headLabel={TABLE_HEAD} />
                                <TableBody>
                                    {isLoading || isValidating ? (
                                        <TableSkeleton number={5} />
                                    ) : (
                                        <TableRenderBody data={tableData?.data}>
                                            {tableData?.data?.map((row, index) => (
                                                <OrganizationTableRow
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
                                component='div'
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
            <OrganizationActionDialog
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
