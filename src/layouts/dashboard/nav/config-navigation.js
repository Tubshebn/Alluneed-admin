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
            title: 'Билл төлөлт',
            path: PATH_DASHBOARD.invoice.root,
            icon: <Iconify icon="fluent:window-ad-20-filled" />,
            code: 'PERM_INVOICE',
         },
      ],
   },
];

export default navConfig;
