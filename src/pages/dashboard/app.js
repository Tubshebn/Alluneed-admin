import Head from 'next/head';
import { Container, Stack, Typography } from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard';
import { useSettingsContext } from 'src/components/settings';

GeneralAppPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default function GeneralAppPage() {
  const { themeStretch } = useSettingsContext();
  return (
    <>
      <Head>
        <title> Удирдах хуудас</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack>
          <Typography variant="body2">Чиний контент энд</Typography>
        </Stack>
      </Container>
    </>
  );
}
