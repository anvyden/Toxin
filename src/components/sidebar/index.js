import '~/components/dropdown';
import '~/components/date-dropdown';
import '~/components/range-slider';
import '~/components/checkbox-list';

import Sidebar from './Sidebar';
import './sidebar.scss';

const sidebars = document.querySelectorAll('.js-sidebar');
sidebars.forEach((sidebar) => new Sidebar(sidebar));
