import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// routes
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (pathname === '/') {
      push(PATH_AUTH.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
