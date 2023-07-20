import Head from 'next/head';
import { Container, Stack, Typography } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useTheme } from '@mui/material/styles';

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function GeneralAppPage() {
   const { themeStretch } = useSettingsContext();
   const theme = useTheme();

   const {
      state: { isLoggedIn, user },
   } = useAuthContext();

   return (
      <>
         <Head>
            <title> Удирдах хуудас</title>
         </Head>
         <Container maxWidth={themeStretch ? false : 'xl'}>
            <Stack>
               <Typography variant="body2">Админааа хийж эхлийлдааа</Typography>
            </Stack>
         </Container>
      </>
   );
}
