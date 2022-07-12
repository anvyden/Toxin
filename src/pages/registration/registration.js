import * as textField from '@form-elements/text-field/text-field'
import registration from '@pages/registration/registration.scss'
import Header from '~/components/header/header'
import Menu from '~/components/menu/menu'

const init = (function () {
  return {
    header: new Header(),
    menu: new Menu(),
  }
}())
