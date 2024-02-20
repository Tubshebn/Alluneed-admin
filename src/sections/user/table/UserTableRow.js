///React
import { useState } from 'react';
///Named
import { useSnackbar } from 'notistack';
//Mui
import {
  TableRow,
  TableCell,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';
///Default
import useSwrFetcher from 'src/hooks/useSwrFetcher';
import useSWRMutation from 'swr/mutation';
import PropTypes from 'prop-types';
///Components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import DeleteDialog from 'src/components/DeleteDialog';
import MenuPopover from 'src/components/menu-popover';
import TextMaxLine from 'src/components/text-max-line/TextMaxLine';

// props
UserTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  refreshTable: PropTypes.func,
  handleUpdate: PropTypes.func,
  index: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default function UserTableRow({
  row,
  refreshTable,
  handleUpdate,
  handleView,
  index,
  page,
  rowsPerPage,
}) {
  console.log('🚀 ~ UserTableRow ~ row:', row);
  const { getFetcher } = useSwrFetcher();
  const { enqueueSnackbar } = useSnackbar();
  const [confirmModal, setConfirmModal] = useState(false);
  const [openMenu, setOpenMenuActions] = useState(null);
  const { id, name, email, phone_number, followers, location, role, photo } =
    row;

  const { trigger } = useSWRMutation(
    [`api/delete_admin_user/id/${id}`, true],
    (args) => getFetcher(args),
    {
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
    }
  );

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
      return (
        <DeleteDialog
          handleDeleteRow={trigger}
          open={confirmModal}
          close={handleClose}
        />
      );
    }
  };

  return (
    <TableRow hover>
      {showUpDeleteDialog()}

      <TableCell align='left'>{page * rowsPerPage + index + 1}</TableCell>
      <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
        <Avatar
          src={
            photo?.length > 0 &&
            'http://103.168.56.249:8080/file/' + photo?.[0]?.file_name
          }
        />
      </TableCell>
      <TableCell align='left' color='gray' sx={{ textTransform: 'capitalize' }}>
        {name}
      </TableCell>
      <TableCell align='left' color='gray' sx={{ textTransform: 'capitalize' }}>
        {phone_number}
      </TableCell>
      <TableCell align='left'>
        <Label
          variant={'soft'}
          color={'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {email}
        </Label>
      </TableCell>

      <TableCell align='left' color='gray' sx={{ textTransform: 'capitalize' }}>
        {role}
      </TableCell>
      <TableCell align='left' color='gray' sx={{ textTransform: 'capitalize' }}>
        {location}
      </TableCell>

      <TableCell align='center'>
        <IconButton
          color={openMenu ? 'inherit' : 'default'}
          onClick={handleOpenMenu}
        >
          <Iconify icon='eva:more-vertical-fill' />
        </IconButton>
      </TableCell>
      <MenuPopover
        open={openMenu}
        onClose={handleCloseMenu}
        arrow='right-top'
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleView();
            handleCloseMenu();
          }}
        >
          <Iconify icon='eva:eye-fill' />
          Харах
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleUpdate();
            handleCloseMenu();
          }}
        >
          <Iconify icon='eva:edit-fill' />
          Засах
        </MenuItem>
      </MenuPopover>
    </TableRow>
  );
}
