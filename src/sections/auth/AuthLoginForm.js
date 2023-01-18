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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${LOGIN_URL}/token?username=${data.username}&password=${data.password}&grant_type=password`,
        {},
        { auth: { username: LOGIN_AUTH_USERNAME, password: LOGIN_AUTH_PASSWORD } }
      );
      signIn(response.data.access_token);
    } catch (error) {
      reset();
      setError('afterSubmit', { ...error, message: error.message });
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
