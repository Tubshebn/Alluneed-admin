import NextLink from 'next/link';

import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
import { useAuthContext } from 'src/auth/useAuthContext';
import { PATH_AUTH } from 'src/routes/paths';

import LoginLayout from 'src/layouts/login';
import AuthLoginForm from './AuthLoginForm';

export default function Login() {
   const { method } = useAuthContext();

   return (
      <LoginLayout>
         <Stack spacing={2} sx={{ mb: 5, position: 'relative', textAlign: 'center' }}>
            <Typography variant="h4"> Bpay админ системд тавтай морил</Typography>
         </Stack>

         <AuthLoginForm />
      </LoginLayout>
   );
}
