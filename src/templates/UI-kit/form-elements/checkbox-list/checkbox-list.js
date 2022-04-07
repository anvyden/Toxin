class CheckboxList {
  constructor(selector) {
    this.checkbox = document.querySelector(`${selector}`)
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
    this.checkboxButtonArrow.classList.toggle('checkbox-list__expandable-heading-button--rotate')
  }

  _render() {
    this._getElements()
    this.handleCheckboxClick()
  }

  _getElements() {
    this.checkboxHeading = document.querySelector(`${this.selector} .js-checkbox-list__expandable-heading`)
    this.checkboxButtons = document.querySelector(`${this.selector} .js-checkbox-list__list`)
    this.checkboxButtonArrow = document.querySelector(`${this.selector} .js-checkbox-list__expandable-heading-button`)
  }
}

export default CheckboxList
