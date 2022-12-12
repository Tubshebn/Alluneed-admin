import PropTypes from 'prop-types';
import { useState } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import AuthGuard from 'src/auth/AuthGuard';
import { useSettingsContext } from 'src/components/settings';
import Main from './Main';
import Header from './header';
import NavMini from './nav/NavMini';
import NavVertical from './nav/NavVertical';
import NavHorizontal from './nav/NavHorizontal';

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function DashboardLayout({ children, headTitle }) {
  const { themeLayout } = useSettingsContext();
  const isDesktop = useResponsive('up', 'lg');
  const [open, setOpen] = useState(false);
  const isNavHorizontal = themeLayout === 'horizontal';
  const isNavMini = themeLayout === 'mini';

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderNavVertical = <NavVertical openNav={open} onCloseNav={handleClose} />;

  const renderContent = () => {
    if (isNavHorizontal) {
      return (
        <>
          <Header onOpenNav={handleOpen} />

          {isDesktop ? <NavHorizontal /> : renderNavVertical}

          <Main>{children}</Main>
        </>
      );
    }
    if (isNavMini) {
      return (
        <>
          <Header onOpenNav={handleOpen} />
          <Box
            sx={{
              display: { lg: 'flex' },
              minHeight: { lg: 1 },
            }}
          >
            {isDesktop ? <NavMini /> : renderNavVertical}
            <Main>{children}</Main>
          </Box>
        </>
      );
    }
    return (
      <>
        <Header onOpenNav={handleOpen} />
        <Box
          sx={{
            display: { lg: 'flex' },
            minHeight: { lg: 1 },
          }}
        >
          {renderNavVertical}

          <Main>{children}</Main>
        </Box>
      </>
    );
  };

  return (
    <AuthGuard>
      <Head>
        <title>{headTitle || `Удирдах хуудас`}</title>
      </Head>
      {renderContent()}
    </AuthGuard>
  );
}
