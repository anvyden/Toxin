import '~/components/logo';
import '~/components/menu';
import '~/components/button';

import Header from './header';
import './header.scss';

const headers = document.querySelectorAll('.js-header__burger-menu-container');
headers.forEach((header) => new Header(header));
