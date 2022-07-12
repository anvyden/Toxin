import signIn from '@pages/sign-in/sign-in.scss'
import Header from '~/components/header/header'
import Menu from '~/components/menu/menu'

const init = (function () {
  return {
    header: new Header(),
    menu: new Menu(),
  }
}())
