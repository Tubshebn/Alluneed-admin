import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Typography, Stack } from '@mui/material';
import CompactLayout from 'src/layouts/compact';
import { MaintenanceIllustration } from 'src/assets/illustrations';

MaintenancePage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title> Maintenance | Minimal UI</title>
      </Head>

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Website currently under maintenance
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button component={NextLink} href="/" size="large" variant="contained">
          Go to Home
        </Button>
      </Stack>
    </>
  );
}
