import Inputmask from 'inputmask'

$(document).ready(() => {
  Inputmask({ mask: '99.99.9999', placeholder: 'ДД.ММ.ГГГГ', clearIncomplete: true }).mask('.js-masked-text-field')
})
