//react
import { useState } from 'react';
//mui
import { Stack, Alert, IconButton, InputAdornment, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
//named import
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from 'src/auth/useAuthContext';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { LOGIN_URL, LOGIN_AUTH_USERNAME, LOGIN_AUTH_PASSWORD } from 'src/config-global';
//default import
import * as Yup from 'yup';
import axios from 'axios';
//components
import Iconify from 'src/components/iconify';

export default function AuthLoginForm() {
   const {
      handlers: { signIn },
      user,
   } = useAuthContext();

   const [showPassword, setShowPassword] = useState(false);

   const LoginSchema = Yup.object().shape({
      username: Yup.string().required('username is required'),
      password: Yup.string().required('Password is required'),
   });

   const defaultValues = { username: '', password: '' };

   const methods = useForm({ resolver: yupResolver(LoginSchema), defaultValues });

   const {
      reset,
      setError,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting, isSubmitSuccessful },
   } = methods;
   const values = watch();
   console.log(values);

   // const onSubmit = async (data) => {
   //     try {
   //         const response = await axios.post(
   //             `${LOGIN_URL}/token?username=${data.username}&password=${data.password}&grant_type=password`,
   //             {},
   //             { auth: { username: LOGIN_AUTH_USERNAME, password: LOGIN_AUTH_PASSWORD } }
   //         );
   //         signIn(response.data.access_token);
   //     } catch (error) {
   //         reset();
   //         setError('afterSubmit', { ...error, message: error.message });
   //     }
   // };

   const onSubmit = async (data) => {
      try {
         const response = await axios.post(
            `${LOGIN_URL}login/oauth/basic_login`,
            { username: data?.username, password: data?.password },
            { auth: { username: LOGIN_AUTH_USERNAME, password: LOGIN_AUTH_PASSWORD } }
         );

         if (response?.data?.token) {
            signIn(response.data.token);
         } else {
            reset();
            setError('afterSubmit', { message: 'Таньд хандах эрх байхгүй байна.' });
         }
      } catch (error) {
         reset();
         setError('afterSubmit', { ...error, message: error.response?.data?.error_description || 'Нэвтрэх нэр эсвэл нууц үг буруу байна.' });
      }
   };

   return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
         <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <RHFTextField name="username" label="username" />
            <RHFTextField
               name="password"
               label="Password"
               type={showPassword ? 'text' : 'password'}
               InputProps={{
                  endAdornment: (
                     <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                           <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                     </InputAdornment>
                  ),
               }}
            />
         </Stack>
         <Box sx={{ mt: 3 }} />
         <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitSuccessful || isSubmitting}
            sx={{
               bgcolor: 'text.primary',
               color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
               '&:hover': { bgcolor: 'text.primary', color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800') },
            }}
         >
            Login
         </LoadingButton>
      </FormProvider>
   );
}
