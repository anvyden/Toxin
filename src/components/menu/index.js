import '~/components/sub-menu';

import Menu from './menu';
import './menu.scss';

const menus = document.querySelectorAll('.js-menu__item');
menus.forEach((item) => new Menu(item));
