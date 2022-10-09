import '~/assets/fonts/montserrat/montserrat.scss';
import '~/assets/fonts/material-icons/material-icons.scss';
import '~/scss/settings.scss';
import '~/layouts/UI-kit-layout'
import '~/components/find-room-card';
import '~/components/sign-up-card';
import '~/components/booking-card';
import '~/components/sign-in-card';
import '~/components/room-card';
import Slider from '@libs/swiper/swiper';
import Datepicker from '~/components/datepicker/datepicker';

import './cards.scss';

const init = {
  findRoomCard: {
    dateDropdown: new Datepicker('.js-date-dropdown', {
      hasTwoInputs: true,
      initialDates: ['2019-08-19', '2019-08-23'],
    }),
  },
  bookingCard: {
    dateDropdown: new Datepicker(
      '.js-booking-card-date-dropdown',
      {
        hasTwoInputs: true,
        initialDates: ['2019-08-19', '2019-08-23'],
      },
      {
        selector: '.js-booking-card',
        roomNumber: '888',
        roomPrice: '9990₽',
        discount: '2179₽',
        additionalServicesSum: '300₽',
      },
    ),
  },
  datepicker: new Datepicker('.js-datepicker', {
    inline: true,
    initialDates: ['2019-08-19', '2019-08-23'],
  }),
  roomCardsSlider: document
    .querySelectorAll('.swiper')
    .forEach((slider) => new Slider(slider)),
};
