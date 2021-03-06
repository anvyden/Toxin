import landingPage from '@pages/landing-page/landing-page.scss'
import Dropdown from '@form-elements/dropdown/dropdown'
import { Datepicker } from '@cards/datepicker/datepicker'
import Header from '~/components/header/header'
import Menu from '~/components/menu/menu'

const init = (function () {
  return {
    header: new Header(),
    menu: new Menu(),
    findRoomCardOpts: {
      guests: new Dropdown('.js-landing-page-guests', {
        maxLength: {
          item0: 5,
          item1: 10,
          item2: 10,
        },
        dropdownButtons: true,
        combineTwoFirstItems: true,
      }),
      datepicker: new Datepicker(
        {
          datepickerSelectors: {
            input: document.querySelector('.js-landing-page-datepicker-1'),
            inputSecond: document.querySelector('.js-landing-page-datepicker-2'),
            datepickerDropdowns: document.querySelectorAll('.js-landing-page-datepicker-dropdown .js-dropdown__dropdown-default'),
          },
        },
      ),
    },
  }
}())
