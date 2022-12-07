import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Stack, Container } from '@mui/material';
import useOffSetTop from 'src/hooks/useOffSetTop';
import { HEADER } from 'src/config-global';
const Header = dynamic(() => import('./Header'), { ssr: false });

CompactLayout.propTypes = {
  children: PropTypes.node,
};

export default function CompactLayout({ children }) {
  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  return (
    <>
      <Header isOffset={isOffset} />

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
