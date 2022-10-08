// import Dropdown from '~/components/dropdown/dropdown';
import '~/components/find-room-card'
import Datepicker from '~/components/datepicker/datepicker';
import Header from '~/components/header/header';
import Menu from '~/components/menu/menu';

import landingPage from './landing-page.scss';

const init = {
  header: new Header(
    document.querySelector('.js-header__burger-menu-container'),
  ),
  menu: document
    .querySelectorAll('.js-menu__item')
    .forEach((item) => new Menu(item)),
  findRoomCard: {
    // guestsDropdown: new Dropdown('.js-find-room-guests', {
    //   type: 'guests',
    //   maxLengthItems: {
    //     item0: 5,
    //     item1: 10,
    //     item2: 10,
    //   },
    //   plurals: {
    //     guests: ['гость', 'гостя', 'гостей'],
    //     babies: ['младенец', 'младенца', 'младенцев'],
    //   },
    // }),
    dateDropdown: new Datepicker('.js-find-room-date-dropdown', {
      hasTwoInputs: true,
      initialDates: ['2019-08-19', '2019-08-23'],
    }),
  },
};
