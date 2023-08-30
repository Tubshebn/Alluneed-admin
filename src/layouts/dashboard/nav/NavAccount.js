import NextLink from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import { PATH_DASHBOARD } from 'src/routes/paths';
import Logo from 'src/components/logo/Logo';

const StyledRoot = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: theme.spacing(2, 2.5),
   borderRadius: Number(theme.shape.borderRadius) * 1.5,
   backgroundColor: alpha(theme.palette.grey[500], 0.12),
   transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
   }),
}));

export default function NavAccount() {
   const { user } = useAuthContext();

   return (
      <Link component={NextLink} href={PATH_DASHBOARD.invoice.root} underline="none" color="inherit">
         <StyledRoot>
            <Logo sx={{ mr: 2.5 }} />
            <Box sx={{ ml: 2, minWidth: 0 }}>
               <Typography variant="subtitle2" noWrap>
                  Trading platform
               </Typography>
            </Box>
         </StyledRoot>
      </Link>
   );
}
