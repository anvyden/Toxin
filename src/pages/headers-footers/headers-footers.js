import headersFooters from '@pages/headers-footers/headers-footers.scss';
import Header from '~/components/header/header';
import Menu from '~/components/menu/menu';

const init = (function () {
  return {
    header: document
      .querySelectorAll('.js-header__burger-menu-container')
      .forEach((header) => new Header(header)),
    menu: document
      .querySelectorAll('.js-menu__item')
      .forEach((item) => new Menu(item)),
  };
})();
