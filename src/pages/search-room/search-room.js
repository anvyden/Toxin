import '~/assets/fonts/montserrat/montserrat.scss';
import '~/assets/fonts/material-icons/material-icons.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '~/scss/settings.scss';
import '~/layouts/main-layout';
import '~/components/sidebar';
import '~/components/room-selection';
import Slider from '@libs/swiper/swiper';
// import Datepicker from '~/components/datepicker/datepicker';

import './search-room.scss';

const init = {
  // sidebar: {
  //   filterDateDropdown: new Datepicker('.js-sidebar-date-dropdown', {
  //     initialDates: ['2019-08-19', '2019-08-23'],
  //     size: 'small',
  //   }),
  // },
  roomSelection: {
    slider: document
      .querySelectorAll('.swiper')
      .forEach((slider) => new Slider(slider)),
  },
};
