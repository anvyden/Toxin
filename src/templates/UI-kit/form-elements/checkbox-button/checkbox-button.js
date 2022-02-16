class Checkbox {
  constructor(selector) {
    this.checkbox = document.querySelector(`.${selector}`)
    this.selector = selector
    this._render()
  }

  handleCheckboxClick() {
    this.clickHandlerCheckbox = this.clickHandlerCheckbox.bind(this)
    this.checkboxHeading.addEventListener('click', this.clickHandlerCheckbox)
  }

  clickHandlerCheckbox() {
    this.toggle()
  }

  toggle() {
    this.checkboxButtons.classList.toggle('checkbox-buttons--hidden')
    this._switchArrow()
  }

  _render() {
    this._getElements()
    this.handleCheckboxClick()
    this._switchArrow()
  }

  _getElements() {
    this.checkboxHeading = document.querySelector(`.${this.selector} .checkbox-heading`)
    this.checkboxButtons = document.querySelector(`.${this.selector} .checkbox-buttons`)
    this.checkboxButtonArrow = document.querySelector(`.${this.selector} .checkbox-heading__button`)
  }

  _switchArrow() {
    if (!this.checkboxButtons.classList.contains('checkbox-buttons--hidden')) {
      this.checkboxButtonArrow.classList.add('checkbox-heading__button--rotate')
    } else {
      this.checkboxButtonArrow.classList.remove('checkbox-heading__button--rotate')
    }
  }
}

export default Checkbox
