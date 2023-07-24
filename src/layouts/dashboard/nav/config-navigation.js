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
            title: 'app',
            path: PATH_DASHBOARD.general.app,
            icon: ICONS.dashboard,
         },
         {
            title: 'Мерчант',
            path: PATH_DASHBOARD.merchant.table,
            icon: <Iconify icon={'raphael:customer'} />,
            hideSection: true,
         },
      ],
   },
];

export default navConfig;
