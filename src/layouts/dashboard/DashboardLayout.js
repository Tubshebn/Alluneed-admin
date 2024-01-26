import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
import { useAuthContext } from 'src/auth/useAuthContext';
import { HOST_API_KEY } from 'src/config-global';
import axios from 'axios';
import Cookies from 'js-cookie';

DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default function DashboardLayout({ children, headTitle }) {
    const { themeLayout } = useSettingsContext();
    const isDesktop = useResponsive('up', 'lg');
    const [open, setOpen] = useState(false);
    const isNavHorizontal = themeLayout === 'horizontal';
    const isNavMini = themeLayout === 'mini';
    const {
        handlers: { stateDynamicUpdate },
        state: { info },
    } = useAuthContext();

    useEffect(() => {
        getUserInfo();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getUserInfo = () => {
        const tk = Cookies.get('accessToken');
        axios
            .get(`${HOST_API_KEY}/users/me`, {
                headers: {
                    Authorization: `Bearer ${tk}`,
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => {
                let detail = resp?.data?.data;
                stateDynamicUpdate({ type: 'user', value: detail });
            });
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
