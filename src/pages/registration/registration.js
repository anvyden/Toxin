import * as textField from '~/components/text-field/text-field';
import Header from '~/components/header/header';
import Menu from '~/components/menu/menu';

import registration from './registration.scss';

const init = {
  header: new Header(
    document.querySelector('.js-header__burger-menu-container'),
  ),
  menu: document
    .querySelectorAll('.js-menu__item')
    .forEach((item) => new Menu(item)),
};
