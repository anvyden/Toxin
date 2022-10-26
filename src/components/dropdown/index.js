import '~/components/heading';
import '~/components/button';

import Dropdown from './dropdown';
import './dropdown.scss';

const dropdowns = document.querySelectorAll('.js-dropdown');
dropdowns.forEach((dropdown) => new Dropdown(dropdown));
