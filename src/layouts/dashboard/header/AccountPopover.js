import { useState } from 'react';
import { useRouter } from 'next/router';
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
import { PATH_DASHBOARD, PATH_AUTH } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/useAuthContext';
import { CustomAvatar } from 'src/components/custom-avatar';
import { useSnackbar } from 'src/components/snackbar';
import MenuPopover from 'src/components/menu-popover';
import { IconButtonAnimate } from 'src/components/animate';

const OPTIONS = [
   {
      label: 'Нүүр',
      linkTo: '/',
   },
   {
      label: 'Би',
      linkTo: PATH_DASHBOARD.general.app,
   },
   {
      label: 'Тохиргоо',
      linkTo: PATH_DASHBOARD.general.app,
   },
];

export default function AccountPopover() {
   const { replace, push } = useRouter();

   const {
      handlers: { logOut },
      state: { user },
   } = useAuthContext();

   const { enqueueSnackbar } = useSnackbar();

   const [openPopover, setOpenPopover] = useState(null);

   const handleOpenPopover = (event) => {
      setOpenPopover(event.currentTarget);
   };

   const handleClosePopover = () => {
      setOpenPopover(null);
   };

   const handleLogout = async () => {
      try {
         logOut();
         replace(PATH_AUTH.login);
         handleClosePopover();
      } catch (error) {
         enqueueSnackbar('Unable to logout!', { variant: 'error' });
      }
   };

   const handleClickItem = (path) => {
      handleClosePopover();
      push(path);
   };

   return (
      <>
         <IconButtonAnimate
            onClick={handleOpenPopover}
            sx={{
               p: 0,
               ...(openPopover && {
                  '&:before': {
                     zIndex: 1,
                     content: "''",
                     width: '100%',
                     height: '100%',
                     borderRadius: '50%',
                     position: 'absolute',
                     bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                  },
               }),
            }}
         >
            <CustomAvatar src={user?.photoURL} alt={user?.displayName} name={user?.displayName} />
         </IconButtonAnimate>

         <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ width: 200, p: 0 }}>
            <Box sx={{ my: 1.5, px: 2.5 }}>
               <Typography variant="subtitle2" noWrap>
                  {user?.username}
               </Typography>

               <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                  {user?.azure_id}
               </Typography>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack sx={{ p: 1 }}>
               {OPTIONS.map((option) => (
                  <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
                     {option.label}
                  </MenuItem>
               ))}
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
               Гарах
            </MenuItem>
         </MenuPopover>
      </>
   );
}
