import '~/components/checkbox';

import CheckboxList from './CheckboxList';
import './checkbox-list.scss';

const checkboxLists = document.querySelectorAll('.js-checkbox-list');
checkboxLists.forEach((checkboxList) => new CheckboxList(checkboxList));
