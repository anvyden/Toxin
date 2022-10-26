import Inputmask from 'inputmask';

const dateMask = Inputmask('datetime', {
  inputFormat: 'dd.mm.yyyy',
  placeholder: '__.__.____',
  clearIncomplete: true,
  showMaskOnHover: false,
  showMaskOnFocus: false,
});

export default dateMask;
