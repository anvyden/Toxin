import declination from './utils/declination'
import findItemNames from './utils/findItemNames'

class Dropdown {
  constructor(selector, options) {
    this.dropdown = document.querySelector(`.${selector}`)
    this.dropdownItemsButtons = document.querySelectorAll(`.${selector} .dropdown-list__item-button`)
    this.dropdownItems = document.querySelectorAll(`.${selector} .dropdown-list__item`)
    this.dropdownDefault = document.querySelector(`.${selector} .dropdown__dropdown-default`)
    this.dropdownExpanded = document.querySelector(`.${selector} .dropdown__dropdown-expanded`)
    this.selector = selector
    this.options = options
    this.itemsValue = {}
    this.dropdownInputValueArray = []
    this._setDataDropdownItem()
    this.itemCounterChange()
  }

  _setDataDropdownItem() {
    this.dropdownItems.forEach((item, i) => {
      this.dropdownItem = item
      this.dropdownItem.dataset.dropdownItemNumber = i
      this._setDropdownItemsValue(i)
    })
    this.handleDropdownClick()
  }

  _setDropdownItemsValue(i) {
    this.dropdownItemNumber = i
    this.dropdownItemNameValue = document.querySelector(`.${this.selector} [data-dropdown-item-number="${i}"] .dropdown-list__item-name`).innerHTML
    this.dropdownItemCounterValue = Number(document.querySelector(`.${this.selector} [data-dropdown-item-number="${i}"] .dropdown-list__item-counter`).innerHTML)
    this._dropdownInputValue()
  }

  itemCounterChange() {
    this.dropdownItemsButtons.forEach((button) => {
      this.handleButtonClick(button)
    })
  }

  handleDropdownClick() {
    this.clickHandlerDropdown = this.clickHandlerDropdown.bind(this)
    this.dropdownDefault.addEventListener('click', this.clickHandlerDropdown)
  }

  clickHandlerDropdown(event) {
    this.target = event.currentTarget
    this.toggle()
  }

  handleButtonClick(button) {
    if (button.classList.contains('dropdown-list__item-button-decrease')) {
      this.clickHandlerButtonDecrease = this.clickHandlerButtonDecrease.bind(this)
      button.addEventListener('click', this.clickHandlerButtonDecrease)
    } else {
      this.clickHandlerButtonIncrease = this.clickHandlerButtonIncrease.bind(this)
      button.addEventListener('click', this.clickHandlerButtonIncrease)
    }
  }

  clickHandlerButtonDecrease(event) {
    this.target = event.target
    this._getItemName()
    this._getItemCounter()
    this._getItemButtonIncrease()
    this.dropdownItemNumber = Number(this.dropdownItem.dataset.dropdownItemNumber)
    this.dropdownItemNameValue = this.dropdownItemName.innerHTML
    this.dropdownItemCounterValue = Number(this.dropdownItemCounter.innerHTML)

    if (this.dropdownItemCounterValue !== 0) {
      this.dropdownItemCounterValue -= 1
    }

    if (this.dropdownItemCounterValue === 0) {
      this.target.classList.add('dropdown-list__item-button--disabled')
    } else {
      this.dropdownItemButtonIncrease.classList.remove('dropdown-list__item-button--disabled')
    }

    this.dropdownItemCounter.innerHTML = this.dropdownItemCounterValue
    this._dropdownInputValue()
  }

  clickHandlerButtonIncrease(event) {
    this.target = event.target
    this._getItemName()
    this._getItemCounter()
    this._getItemButtonDecrease()
    this.dropdownItemNumber = Number(this.dropdownItem.dataset.dropdownItemNumber)
    this.dropdownItemNameValue = this.dropdownItemName.innerHTML
    this.dropdownItemCounterValue = Number(this.dropdownItemCounter.innerHTML)

    this.dropdownItemCounter.innerHTML = this.dropdownItemCounterValue
    this._increaseItemValue()
  }

  toggle() {
    this.dropdownExpanded.classList.toggle('dropdown__dropdown-expanded--hidden')
    this.dropdownInput.classList.toggle('dropdown__input--expanded')
  }

  _increaseItemValue() {
    const { maxLength } = this.options
    this.maxLengthItem = maxLength[`item${this.dropdownItemNumber}`]
      ? maxLength[`item${this.dropdownItemNumber}`]
      : 5

    if (this.dropdownItemCounterValue < this.maxLengthItem) {
      this.dropdownItemCounterValue += 1

      if (this.dropdownItemCounterValue === this.maxLengthItem) {
        this.target.classList.add('dropdown-list__item-button--disabled')
      } else {
        this.dropdownItemButtonDecrease.classList.remove('dropdown-list__item-button--disabled')
      }

      this.dropdownItemCounter.innerHTML = this.dropdownItemCounterValue
      this._dropdownInputValue()
    }
  }

  _dropdownInputValue() {
    this.itemNames = findItemNames(this.dropdownItemNameValue)
    this.itemName = declination(this.dropdownItemCounterValue, this.itemNames)

    if (this.dropdownItemCounterValue === 0) {
      this.itemsValue[`item${this.dropdownItemNumber}`] = ''
    } else {
      this.itemValue = [`${this.dropdownItemCounterValue} ${this.itemName}`]
      this.itemsValue[`item${this.dropdownItemNumber}`] = this.itemValue
    }

    for (let n = 0; n < this.dropdownItems.length; n += 1) {
      if (this.itemsValue[`item${n}`] !== '') {
        this.dropdownInputValueArray.push(this.itemsValue[`item${n}`])
      }
    }

    this.dropdownInput = document.querySelector(`.${this.selector} .dropdown__input`)
    this.dropdownInput.value = this.dropdownInputValueArray.join(', ')
    this.dropdownInputValueArray = []
  }

  _getItemName() {
    this.dropdownItem = this.target.closest('.dropdown-list__item')
    this._getChildren({ parentElem: this.dropdownItem, childrenClass: 'dropdown-list__item-name', childElemName: 'dropdownItemName' })
  }

  _getItemCounter() {
    this.dropdownItemMenu = this.target.closest('.dropdown-list__item-menu')
    this._getChildren({ parentElem: this.dropdownItemMenu, childrenClass: 'dropdown-list__item-counter', childElemName: 'dropdownItemCounter' })
  }

  _getItemButtonDecrease() {
    this.dropdownItemMenu = this.target.closest('.dropdown-list__item-menu')
    this._getChildren({ parentElem: this.dropdownItemMenu, childrenClass: 'dropdown-list__item-button-decrease', childElemName: 'dropdownItemButtonDecrease' })
  }

  _getItemButtonIncrease() {
    this.dropdownItemMenu = this.target.closest('.dropdown-list__item-menu')
    this._getChildren({ parentElem: this.dropdownItemMenu, childrenClass: 'dropdown-list__item-button-increase', childElemName: 'dropdownItemButtonIncrease' })
  }

  _getChildren({ parentElem, childrenClass, childElemName }) {
    for (let i = 0; i < parentElem.children.length; i += 1) {
      if (parentElem.children[i].classList.contains(childrenClass)) {
        this[childElemName] = parentElem.children[i]
      }
    }
  }
}

export default Dropdown
