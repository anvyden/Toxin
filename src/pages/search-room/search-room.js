import Slider from '@libs/swiper/swiper';
import Dropdown from '~/components/dropdown/dropdown';
import Datepicker from '~/components/datepicker/datepicker';
import RangeSlider from '~/components/range-slider/range-slider';
import Pagination from '~/components/pagination/pagination';
import '~/components/checkbox-list';
import '~/components/header';
import '~/components/menu';
import '~/components/sidebar';

import searchRoom from './search-room.scss';

const init = {
  // header: new Header(
  //   document.querySelector('.js-header__burger-menu-container'),
  // ),
  // menu: document
  //   .querySelectorAll('.js-menu__item')
  //   .forEach((item) => new Menu(item)),
  sidebar: {
    // sidebarBlock: new Sidebar(document.querySelector('.js-sidebar')),
    filterDateDropdown: new Datepicker('.js-sidebar-date-dropdown', {
      initialDates: ['2019-08-19', '2019-08-23'],
      size: 'small',
    }),
    // dropdownGuests: new Dropdown('.js-sidebar-dropdown-guests', {
    //   type: 'guests',
    //   maxLengthItems: {
    //     item0: 10,
    //     item1: 15,
    //     item2: 6,
    //   },
    //   plurals: {
    //     guests: ['гость', 'гостя', 'гостей'],
    //     babies: ['младенец', 'младенца', 'младенцев'],
    //   },
    // }),
    rangeSlider: new RangeSlider('.js-sidebar-range-slider', {
      min: 0,
      max: 15000,
      step: 50,
      minStartValue: 5000,
      maxStartValue: 10000,
    }),
    // dropdownComfort: new Dropdown('.js-sidebar-dropdown-comfort', {
    //   type: 'comfort',
    //   maxLengthItems: {
    //     item0: 10,
    //     item1: 15,
    //     item2: 6,
    //   },
    //   plurals: {
    //     bedrooms: ['спальня', 'спальни', 'спален'],
    //     beds: ['кровать', 'кровати', 'кроватей'],
    //     bathrooms: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
    //   },
    // }),
    // checkboxListComfort: new CheckboxList('.js-sidebar-checkbox-list-comfort'),
  },
  roomSelection: {
    slider: document
      .querySelectorAll('.swiper')
      .forEach((slider) => new Slider(slider)),
    pagination: new Pagination('.js-room-selection-pagination', {
      countOfItems: 180,
      itemsPerPage: 12,
    }),
  },
};
