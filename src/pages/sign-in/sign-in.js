import signIn from '@pages/sign-in/sign-in.scss'
import Header from '@headers-footers/header/header'
import Menu from '@headers-footers/menu/menu'

const init = (function () {
  return {
    header: new Header(),
    menu: new Menu(),
  }
}())
