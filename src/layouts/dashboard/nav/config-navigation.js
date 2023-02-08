import { PATH_DASHBOARD } from 'src/routes/paths';
import SvgColor from 'src/components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
    dashboard: icon('ic_dashboard'),
};

const navConfig = [
    {
        subheader: 'general',
        items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
    },
];

export default navConfig;
