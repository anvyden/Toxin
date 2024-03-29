import '~/components/text-field';
import Datepicker from '@libs/air-datepicker';

import './date-dropdown.scss';

const dateDropdowns = document.querySelectorAll('.js-date-dropdown');
dateDropdowns.forEach((dateDropdown) => new Datepicker(dateDropdown));
