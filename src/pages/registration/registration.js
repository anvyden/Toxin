import * as textField from '@form-elements/text-field/text-field'
import registration from '@pages/registration/registration.scss'
import Header from '@headers-footers/header/header'
import Menu from '@headers-footers/menu/menu'

const init = (function () {
  return {
    header: new Header(),
    menu: new Menu(),
  }
}())
