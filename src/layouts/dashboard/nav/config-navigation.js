import { PATH_DASHBOARD } from 'src/routes/paths';
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify/Iconify';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
    dashboard: icon('ic_dashboard'),
};

const navConfig = [
    {
        subheader: 'Системийн удирдлага',
        items: [
            {
                title: 'Хэрэглэгчийн удирдлага',
                path: PATH_DASHBOARD.user.root,
                icon: <Iconify icon="mdi:user" />,
            },
            {
                title: 'Билл төлөлт',
                path: PATH_DASHBOARD.invoice.root,
                icon: <Iconify icon="fluent:window-ad-20-filled" />,
            },
        ],
    },
];

export default navConfig;
