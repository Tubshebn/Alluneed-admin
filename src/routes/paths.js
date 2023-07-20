function path(root, sublink) {
   return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
   root: ROOTS_AUTH,
   login: path(ROOTS_AUTH, '/login'),
};

export const PATH_PAGE = {
   comingSoon: '/coming-soon',
};

export const PATH_DASHBOARD = {
   root: ROOTS_DASHBOARD,
   general: {
      app: path(ROOTS_DASHBOARD, '/app'),
   },
   user: {
      root: path(ROOTS_DASHBOARD, '/user'),
      table: path(ROOTS_DASHBOARD, '/user/table'),
   },
};
