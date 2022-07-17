import Inputmask from 'inputmask';

$(document).ready(() => {
  Inputmask('datetime', {
    inputFormat: 'dd.mm.yyyy',
    placeholder: '__.__.____',
    clearIncomplete: true,
    showMaskOnHover: false,
    showMaskOnFocus: false,
  }).mask('.js-masked-text-field');
});
