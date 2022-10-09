import '~/assets/fonts/montserrat/montserrat.scss';
import '~/assets/fonts/material-icons/material-icons.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import '~/scss/settings.scss';
import '~/layouts/main-layout';
import '~/components/find-room-card';
import Datepicker from '~/components/datepicker/datepicker';

import './landing-page.scss';

const init = {
  findRoomCard: {
    dateDropdown: new Datepicker('.js-find-room-date-dropdown', {
      hasTwoInputs: true,
      initialDates: ['2019-08-19', '2019-08-23'],
    }),
  },
};
