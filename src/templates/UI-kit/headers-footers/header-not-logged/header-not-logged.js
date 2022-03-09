class Header {
  constructor() {
    this.burgerMenu = document.querySelector('.header__burger-menu-wrapper')
    this.burgerButton = document.querySelector('.header__burger-button')
    this.burgerLines = [...document.querySelectorAll('.header__burger-line')]
    this.handleBurgerButtonClick(this.burgerButton)
  }

  handleBurgerButtonClick(button) {
    this.clickHandlerBurgerButton = this.clickHandlerBurgerButton.bind(this)
    button.addEventListener('click', this.clickHandlerBurgerButton)
  }

  clickHandlerBurgerButton() {
    if (this.burgerButton.classList.contains('header__burger-button--clicked')) {
      this.burgerButton.classList.remove('header__burger-button--clicked')

      this.burgerLines.forEach((item, i) => {
        const line = item
        if (i === 1) {
          line.classList.remove('header__burger-line-cross-1')
        } else if (i === 2) {
          line.classList.remove('header__burger-line-cross-2')
        } else {
          line.classList.remove('header__burger-line--hidden')
        }
      })

      this.burgerMenu.classList.remove('header__burger-menu-wrapper--visible')
    } else {
      this.burgerButton.classList.add('header__burger-button--clicked')

      this.burgerLines.forEach((item, i) => {
        const line = item
        if (i === 1) {
          line.classList.add('header__burger-line-cross-1')
        } else if (i === 2) {
          line.classList.add('header__burger-line-cross-2')
        } else {
          line.classList.add('header__burger-line--hidden')
        }
      })

      this.burgerMenu.classList.add('header__burger-menu-wrapper--visible')
    }
  }
}

export default Header
