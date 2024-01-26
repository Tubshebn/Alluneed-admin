//React
import { useState } from 'react';
//Named
import { fCurrency } from 'src/utils/formatNumber';
import { useSnackbar } from 'notistack';
//MUI
import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Button, Box, TablePagination } from '@mui/material';
//Default
import PropTypes from 'prop-types';
//Components
import Label from 'src/components/label/Label';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TableHeadCustom, TableRenderBody, TableSkeleton } from 'src/components/table';
//sections
import { DETAIL_TABLE_HEAD, SUB_TABLE_HEAD } from 'src/sections/user/utils/schema';
import Iconify from 'src/components/iconify/Iconify';
import { fDate } from 'src/utils/formatTime';

//Props
CustomerDetailTable.propTypes = {
    data: PropTypes.array.isRequired,
};

export default function CustomerDetailTable({ data, isLoading, isValidating, handleOpen, open, handleCloose, paidAt, status }) {
    const [bill, setBill] = useState();
    return (
        <Stack>
            {open === true && (
                <Button
                    sx={{ maxWidth: 100, mb: 1 }}
                    onClick={() => handleCloose()}
                    color="inherit"
                    size="medium"
                    variant="outlined"
                    startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
                >
                    {'Буцах'}
                </Button>
            )}
            <Scrollbar>
                {open === false ? (
                    <TableContainer>
                        <Table>
                            <TableHeadCustom headLabel={DETAIL_TABLE_HEAD} />
                            <TableBody>
                                {isLoading || isValidating ? (
                                    <TableSkeleton number={3} />
                                ) : (
                                    <TableRenderBody data={data}>
                                        {data &&
                                            data?.map((row, index) => {
                                                const { total_amount, transaction, bills, code } = row;
                                                const pendingAmount = total_amount - transaction?.total_amount;
                                                return (
                                                    <TableRow
                                                        hover
                                                        onClick={() => {
                                                            handleOpen();
                                                            setBill(bills);
                                                        }}
                                                    >
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                                            <Label variant="filled" color="success">
                                                                {code}
                                                            </Label>
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                                            {fCurrency(total_amount?.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                                            {fCurrency(transaction?.total_amount?.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                                            {fCurrency(pendingAmount?.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                                            {fDate(paidAt)}
                                                        </TableCell>
                                                        <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                                            <Label color={status === 'Төлөгдөж буй' ? 'warning' : 'success'}>{status}</Label>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableRenderBody>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <CustomerDetailTableRow bill={bill} open={open} handleCloose={handleCloose} paidAt={paidAt} />
                )}
            </Scrollbar>
        </Stack>
    );
}

function CustomerDetailTableRow({ bill }) {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHeadCustom headLabel={SUB_TABLE_HEAD} />
                    <TableBody>
                        {bill?.map((row, index) => {
                            const { billId, year, month, totalAmount, billAmount, lossAmount, paidAmount } = row;
                            const pendingAmount = totalAmount - paidAmount;
                            return (
                                <TableRow hover>
                                    <TableCell align="left">{index + 1}</TableCell>
                                    <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                                        <Label variant="filled" color="success">
                                            {billId}
                                        </Label>
                                    </TableCell>
                                    <TableCell>{`${year} - ${month} сар`}</TableCell>
                                    <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                                        {fCurrency(billAmount.toFixed(2))}
                                    </TableCell>
                                    <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                                        {fCurrency(lossAmount.toFixed(2))}
                                    </TableCell>
                                    <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                                        {fCurrency(totalAmount.toFixed(2))}
                                    </TableCell>
                                    <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
                                        {fCurrency(paidAmount.toFixed(2))}
                                    </TableCell>
                                    <TableCell align="center" sx={{ textTransform: 'capitalize' }}>
                                        {fCurrency(pendingAmount.toFixed(2))}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
