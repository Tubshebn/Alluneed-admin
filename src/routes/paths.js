function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/dashboard';

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    forgotPassword: path(ROOTS_AUTH, '/forgotPassword'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,

    invoice: {
        root: path(ROOTS_DASHBOARD, '/invoice'),
        table: path(ROOTS_DASHBOARD, '/invoice/table'),
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        table: path(ROOTS_DASHBOARD, '/user/table'),
    },
};
