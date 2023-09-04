'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { PATH_AUTH } from 'src/routes/paths';
import { useRouter } from 'next/router';

// auth
import { useAuthContext } from 'src/auth/useAuthContext';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {
   const {
      handlers: { POST },
   } = useAuthContext();
   const { enqueueSnackbar } = useSnackbar();

   const router = useRouter();

   const ForgotPasswordSchema = Yup.object().shape({
      email: Yup.string().required('И-мэйл хаягаа оруулна уу').email('И-мэйл хаяг буруу байна!'),
   });

   const defaultValues = {
      email: '',
   };

   const methods = useForm({
      resolver: yupResolver(ForgotPasswordSchema),
      defaultValues,
   });

   const {
      reset,
      setError,
      handleSubmit,
      formState: { errors, isSubmitting, isSubmitSuccessful },
   } = methods;

   const onSubmit = handleSubmit(async (data) => {
      try {
         const response = await POST('/users/api/v1/user/reset/password', true, { email: data?.email });

         reset();
         response?.responseCode === true
            ? enqueueSnackbar(response?.responseMsg, { variant: 'success' }) && router.push(PATH_AUTH.login)
            : enqueueSnackbar(response?.responseMsg, { variant: 'warning' });
      } catch (error) {
         reset();
         enqueueSnackbar('Алдаа гарлаа.Дахин оролдоно уу', { variant: 'error' });
      }
   });

   const renderForm = (
      <Stack spacing={3} alignItems="center">
         {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
         <RHFTextField name="email" label="И-мэил" />

         <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Илгээх
         </LoadingButton>

         <Link
            href={PATH_AUTH.login}
            color="inherit"
            variant="subtitle2"
            sx={{
               alignItems: 'center',
               display: 'inline-flex',
            }}
         >
            <Iconify icon="eva:arrow-ios-back-fill" width={16} />
            Буцах
         </Link>
      </Stack>
   );

   const renderHead = (
      <>
         <PasswordIcon sx={{ height: 96 }} />

         <Stack spacing={1} sx={{ my: 5 }}>
            <Typography variant="h3">Нууц үг сэргээх</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               Та бүртгэлтэй и-мэил хаягаа оруулна уу
            </Typography>
         </Stack>
      </>
   );

   return (
      <FormProvider methods={methods} onSubmit={onSubmit}>
         {renderHead}
         {renderForm}
      </FormProvider>
   );
}
