import '~/components/sub-menu';

import Menu from './Menu';
import './menu.scss';

const menus = document.querySelectorAll('.js-menu__item');
menus.forEach((item) => new Menu(item));
