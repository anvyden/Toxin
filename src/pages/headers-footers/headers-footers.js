import headersFooters from '@pages/headers-footers/headers-footers.scss';
import Header from '~/components/header/header';
import Menu from '~/components/menu/menu';

const init = (function () {
  return {
    header: new Header(),
    menu: document
      .querySelectorAll('.js-menu__item')
      .forEach((item) => new Menu(item)),
  };
})();
