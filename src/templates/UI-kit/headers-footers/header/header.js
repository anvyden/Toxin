class Header {
  constructor() {
    this.burgerMenu = document.querySelector('.js-header-burger-menu-wrapper')
    this.burgerButton = document.querySelector('.js-header-burger-button')
    this.burgerLines = [...document.querySelectorAll('.js-header-burger-line')]
    this.handleBurgerButtonClick(this.burgerButton)
    this.handleBurgerButtonKeyup(this.burgerButton)
  }

  handleBurgerButtonClick(button) {
    this.clickHandlerBurgerButton = this.clickHandlerBurgerButton.bind(this)
    button.addEventListener('click', this.clickHandlerBurgerButton)
  }

  clickHandlerBurgerButton() {
    this.burgerLines.forEach((item, i) => {
      const line = item
      if (i === 1) {
        line.classList.toggle('header__burger-line-cross-1')
      } else if (i === 2) {
        line.classList.toggle('header__burger-line-cross-2')
      } else {
        line.classList.toggle('header__burger-line--hidden')
      }
    })
    this.burgerMenu.classList.toggle('header__burger-menu-wrapper--visible')
  }

  handleBurgerButtonKeyup(button) {
    this.keyupHandlerBurgerButton = this.keyupHandlerBurgerButton.bind(this)
    button.addEventListener('keyup', this.keyupHandlerBurgerButton)
  }

  keyupHandlerBurgerButton(event) {
    if (event.key === 'Enter') {
      this.burgerLines.forEach((item, i) => {
        const line = item
        if (i === 1) {
          line.classList.toggle('header__burger-line-cross-1')
        } else if (i === 2) {
          line.classList.toggle('header__burger-line-cross-2')
        } else {
          line.classList.toggle('header__burger-line--hidden')
        }
      })
      this.burgerMenu.classList.toggle('header__burger-menu-wrapper--visible')
    }
  }
}

export default Header
