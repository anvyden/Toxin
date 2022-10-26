import '~/components/heading';
import dateMask from '@libs/inputmask';

import './text-field.scss';

$(document).ready(() => {
  dateMask.mask('.js-masked-text-field');
});
