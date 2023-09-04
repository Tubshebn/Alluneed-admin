///React
import { useState } from 'react';
///Named
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
//Mui
import { TableRow, TableCell, IconButton, MenuItem } from '@mui/material';
///Default
import PropTypes from 'prop-types';
///Components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import DeleteDialog from 'src/components/DeleteDialog';
import MenuPopover from 'src/components/menu-popover/MenuPopover';

// props
CustomerTableRow.propTypes = {
   row: PropTypes.object.isRequired,
   handleUpdate: PropTypes.func,
   index: PropTypes.number,
   page: PropTypes.number,
   rowsPerPage: PropTypes.number,
};

export default function CustomerTableRow({ row, handleUpdate, index, page, rowsPerPage }) {
   const [openMenu, setOpenMenuActions] = useState(null);
   const { bpayCode, createdAt, email, phoneNumber } = row;

   //Functions
   const handleOpenMenu = (event) => {
      setOpenMenuActions(event.currentTarget);
   };

   const handleCloseMenu = () => {
      setOpenMenuActions(null);
   };

   return (
      <TableRow hover>
         <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
         <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
            <Label variant="filled" color="success">
               {bpayCode}
            </Label>
         </TableCell>
         <TableCell align="left" color="gray" sx={{ textTransform: 'capitalize' }}>
            {'Хоосон'}
         </TableCell>
         <TableCell align="left" color="gray" sx={{ textTransform: 'capitalize' }}>
            {'Хоосон'}
         </TableCell>
         <TableCell align="left">
            <Label variant={'soft'} color={'success'} sx={{ textTransform: 'capitalize' }}>
               {email}
            </Label>
         </TableCell>
         <TableCell align="left" color="gray" sx={{ textTransform: 'capitalize' }}>
            {'Хоосон'}
         </TableCell>
         <TableCell align="left" color="gray" sx={{ textTransform: 'capitalize' }}>
            {fDate(createdAt)}
         </TableCell>
         <TableCell align="center">
            <IconButton
               color={openMenu ? 'inherit' : 'default'}
               onClick={(event) => {
                  handleOpenMenu(event);
               }}
            >
               <Iconify icon="eva:more-vertical-fill" sx={{ width: 25, height: 25 }} />
            </IconButton>
            <MenuPopover open={openMenu} onClose={handleCloseMenu} arrow="right-top">
               <MenuItem
                  onClick={() => {
                     handleUpdate();
                     handleCloseMenu();
                  }}
               >
                  <Iconify icon="mdi:eye" />
                  Гүйлгээний түүх
               </MenuItem>
            </MenuPopover>
         </TableCell>
      </TableRow>
   );
}
