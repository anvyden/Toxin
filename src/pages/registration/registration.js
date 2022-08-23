import * as textField from '~/components/text-field/text-field';
import registration from '@pages/registration/registration.scss';
import Header from '~/components/header/header';
import Menu from '~/components/menu/menu';

const init = {
  header: new Header(
    document.querySelector('.js-header__burger-menu-container')
  ),
  menu: document
    .querySelectorAll('.js-menu__item')
    .forEach((item) => new Menu(item)),
};
