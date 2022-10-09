import '~/assets/fonts/montserrat/montserrat.scss';
import '~/assets/fonts/material-icons/material-icons.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '~/scss/settings.scss';
import '~/layouts/main-layout';
import '~/components/text';
import '~/components/features';
import '~/components/bullet-list';
import '~/components/comments';
import '~/components/booking-card';
import '~/components/pie-chart';
import Datepicker from '~/components/datepicker/datepicker';

import './room-details.scss';

const init = {
  bookindCard: {
    dateDropdown: new Datepicker(
      '.js-booking-card-date-dropdown',
      {
        hasTwoInputs: true,
        initialDates: ['2019-08-19', '2019-08-23'],
      },
      {
        selector: '.js-room-details-booking-card',
        roomNumber: '888',
        roomPrice: '9990₽',
        discount: '2179₽',
        additionalServicesSum: '300₽',
      }
    ),
  },
};
