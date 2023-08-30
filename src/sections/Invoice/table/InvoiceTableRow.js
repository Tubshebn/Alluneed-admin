///React
import { useState } from 'react';
///Named
import { useSnackbar } from 'notistack';
//Mui
import { TableRow, TableCell, MenuItem, IconButton } from '@mui/material';
///Default
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWRMutation from 'swr/mutation';
import PropTypes from 'prop-types';
///Components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import DeleteDialog from 'src/components/DeleteDialog';
import MenuPopover from 'src/components/menu-popover';
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';

// props
InvoiceTableRow.propTypes = {
   row: PropTypes.object.isRequired,
   refreshTable: PropTypes.func,
   handleUpdate: PropTypes.func,
   index: PropTypes.number,
   page: PropTypes.number,
   rowsPerPage: PropTypes.number,
};

export default function InvoiceTableRow({ row, handleUpdate, index, page, rowsPerPage }) {
   const [confirmModal, setConfirmModal] = useState(false);
   const [openMenu, setOpenMenuActions] = useState(null);
   const { bpayCode, paidAt, transactionId, totalAmount, status } = row;

   //Functions
   const handleOpenMenu = (event) => {
      setOpenMenuActions(event.currentTarget);
   };

   const handleCloseMenu = () => {
      setOpenMenuActions(null);
   };

   const handleOpen = () => {
      setConfirmModal(true);
   };

   const handleClose = () => {
      setConfirmModal(false);
   };

   const showUpDeleteDialog = () => {
      if (confirmModal) {
         return <DeleteDialog handleDeleteRow={trigger} open={confirmModal} close={handleClose} />;
      }
   };

   return (
      <TableRow hover>
         {showUpDeleteDialog()}
         <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
         <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            <Label variant="filled" color="success">
               {bpayCode}
            </Label>
         </TableCell>
         <TableCell align="left">{fDate(paidAt)}</TableCell>
         <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {transactionId}
         </TableCell>
         <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {fCurrency(totalAmount.toFixed(2))}
         </TableCell>
         <TableCell align="left">
            <Label variant={'soft'} color={status === 'Төлөгдөж буй' ? 'warning' : 'success'} sx={{ textTransform: 'capitalize' }}>
               {status}
            </Label>
         </TableCell>
         <TableCell align="center">
            <IconButton
               color={openMenu ? 'inherit' : 'default'}
               onClick={() => {
                  handleUpdate();
                  handleCloseMenu();
               }}
            >
               <Iconify icon="mdi:eye" sx={{ width: 25, height: 25 }} />
            </IconButton>
         </TableCell>
      </TableRow>
   );
}
