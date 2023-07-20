import { PATH_DASHBOARD } from 'src/routes/paths';
import SvgColor from 'src/components/svg-color';
import Iconify from 'src/components/iconify/Iconify';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
   dashboard: icon('ic_dashboard'),
};

const navConfig = [
   {
      subheader: 'general',
      items: [
         {
            title: 'app',
            path: PATH_DASHBOARD.general.app,
            icon: ICONS.dashboard,
         },
         {
            title: 'Систем хэрэглэгчид',
            path: PATH_DASHBOARD.user.table,
            icon: <Iconify icon={'carbon:user-admin'} />,
            hideSection: true,
         },
      ],
   },
];

export default navConfig;
