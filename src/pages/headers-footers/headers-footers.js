import headersFooters from '@pages/headers-footers/headers-footers.scss'
import Header from '@headers-footers/header/header'
import Menu from '@headers-footers/menu/menu'

const init = (function () {
  return {
    header: new Header(),
    menu: new Menu(),
  }
}())
