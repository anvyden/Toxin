import '~/scss/settings.scss'
import '~/layouts/UI-kit-layout'
import '~/assets/fonts/montserrat/montserrat.scss';
import '~/assets/fonts/material-icons/material-icons.scss';
import '@pages/form-elements/sections/buttons';
import '@pages/form-elements/sections/checkboxs';
import '@pages/form-elements/sections/controls';
import '@pages/form-elements/sections/dropdowns';
import '@pages/form-elements/sections/fields';
import '@pages/form-elements/sections/room-info';
import Datepicker from '~/components/datepicker/datepicker';

import './form-elements.scss';

const init = {
  dateDropdown: new Datepicker('.js-date-dropdown', {
    hasTwoInputs: true,
    initialDates: ['2019-08-19', '2019-08-23'],
  }),
  filterDateDropdown: new Datepicker('.js-filter-date-dropdown', {
    initialDates: ['2019-08-19', '2019-08-23'],
    size: 'small',
  }),
};
