class CheckboxList {
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
    this.checkboxButtons.classList.toggle('checkbox-list__list--hidden')
    this._switchArrow()
  }

  _render() {
    this._getElements()
    this.handleCheckboxClick()
    this._switchArrow()
  }

  _getElements() {
    this.checkboxHeading = document.querySelector(`.${this.selector} .checkbox-list__expandable-heading`)
    this.checkboxButtons = document.querySelector(`.${this.selector} .checkbox-list__list`)
    this.checkboxButtonArrow = document.querySelector(`.${this.selector} .checkbox-list__expandable-heading-button`)
  }

  _switchArrow() {
    if (!this.checkboxButtons.classList.contains('checkbox-list__list--hidden')) {
      this.checkboxButtonArrow.classList.add('checkbox-list__expandable-heading-button--rotate')
    } else {
      this.checkboxButtonArrow.classList.remove('checkbox-list__expandable-heading-button--rotate')
    }
  }
}

export default CheckboxList
