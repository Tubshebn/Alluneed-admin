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

// props
MerchantTableRow.propTypes = {
   row: PropTypes.object.isRequired,
   refreshTable: PropTypes.func,
   handleUpdate: PropTypes.func,
   index: PropTypes.number,
   page: PropTypes.number,
   rowsPerPage: PropTypes.number,
};

export default function MerchantTableRow({ row, refreshTable, handleUpdate, index, page, rowsPerPage }) {
   const { getFetcher } = useSwrFetcher();
   const { enqueueSnackbar } = useSnackbar();
   const [confirmModal, setConfirmModal] = useState(false);
   const [openMenu, setOpenMenuActions] = useState(null);
   const { id, status, role, username } = row;

   const { trigger } = useSWRMutation([`api/delete_admin_user/id/${id}`, true], (args) => getFetcher(args), {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onSuccess: (newData) => {
         newData?.success && enqueueSnackbar('Амжилттай устгагдсан');
         handleClose();
         refreshTable();
      },
      onError: (err) => {
         err &&
            enqueueSnackbar('Алдаа гарлаа, дахин оролдоно уу', {
               variant: 'warning',
            });
         handleClose();
      },
   });

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
         <TableCell align="left">{username}</TableCell>
         <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            {role}
         </TableCell>
         <TableCell align="left">
            <Label variant="outlined" color="primary">
               {status}
            </Label>
         </TableCell>
         <TableCell align="center">
            <IconButton color={openMenu ? 'inherit' : 'default'} onClick={handleOpenMenu}>
               <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
         </TableCell>
         <MenuPopover open={openMenu} onClose={handleCloseMenu} arrow="right-top" sx={{ width: 140 }}>
            <MenuItem
               onClick={() => {
                  handleUpdate();
                  handleCloseMenu();
               }}
            >
               <Iconify icon="eva:edit-fill" />
               Засах
            </MenuItem>
            <MenuItem
               onClick={() => {
                  handleOpen();
                  handleCloseMenu();
               }}
               sx={{ color: 'error.main' }}
            >
               <Iconify icon="eva:trash-2-outline" />
               Устгах
            </MenuItem>
         </MenuPopover>
      </TableRow>
   );
}
