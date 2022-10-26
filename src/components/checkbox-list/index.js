import '~/components/checkbox';

import CheckboxList from './checkbox-list';
import './checkbox-list.scss';

const checkboxLists = document.querySelectorAll('.js-checkbox-list');
checkboxLists.forEach((checkboxList) => new CheckboxList(checkboxList));
