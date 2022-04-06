import declination from './utils/declination'
import findItemNames from './utils/findItemNames'

class Dropdown {
  constructor(selector, options) {
    this.dropdown = document.querySelector(`${selector}`)
    this.selector = selector
    this.options = options !== undefined ? options : {}
    this.itemsValue = []
    this.inputValueArray = []
    this.click = false
    this._render()
  }

  handleDropdownClick() {
    this.clickHandlerDropdown = this.clickHandlerDropdown.bind(this)
    this.dropdownDefault.addEventListener('click', this.clickHandlerDropdown)
  }

  clickHandlerDropdown() {
    this.dropdownToggle()
  }

  dropdownToggle() {
    this.dropdownExpanded.classList.toggle('dropdown__dropdown-expanded--hidden')
    this.dropdownInput.classList.toggle('dropdown__input--expanded')
    this._switchArrow()
  }

  CheckItemValueChange() {
    this.itemsButtons.forEach((button) => {
      this.handleItemButtonClick(button)
    })
  }

  handleItemButtonClick(button) {
    if (button.classList.contains('dropdown__item-button-decrease')) {
      this.clickHandlerButtonDecrease = this.clickHandlerButtonDecrease.bind(this)
      button.addEventListener('click', this.clickHandlerButtonDecrease)
    } else {
      this.clickHandlerButtonIncrease = this.clickHandlerButtonIncrease.bind(this)
      button.addEventListener('click', this.clickHandlerButtonIncrease)
    }
  }

  clickHandlerButtonDecrease(event) {
    this.click = true
    this._getItemValueOnClick(event)
    this._decreaseItemValue()
    this._renderButtons()
  }

  clickHandlerButtonIncrease(event) {
    this.click = true
    this._getItemValueOnClick(event)
    this._increaseItemValue()
    this._renderButtons()
  }

  handleButtonClearClick() {
    if (this.dropdownButtons) {
      this.click = true
      this.clickHandlerButtonClear = this.clickHandlerButtonClear.bind(this)
      this.dropdownButtons[0].addEventListener('click', this.clickHandlerButtonClear)
    }
  }

  clickHandlerButtonClear(event) {
    this.target = event.target
    this.items.forEach((item, index) => {
      this.itemsCounters[index].innerHTML = 0
      this.itemCounterValue = 0
      this.itemNameValue = this.itemsNames[index].innerHTML.toLowerCase()
      this._dropdownInputValue(this.itemNameValue, this.itemCounterValue, index)
      this._getItemButtonDecrease(index)
      this.itemButtonDecrease.classList.add('dropdown__item-button--disabled')
      this._getItemButtonIncrease(index)
      this.itemButtonIncrease.classList.remove('dropdown__item-button--disabled')
    })
    this.itemsCountersSum = 0
    this.target.classList.add('button__button--hidden')
  }

  handleButtonAcceptClick() {
    if (this.dropdownButtons) {
      this.clickHandlerButtonAccept = this.clickHandlerButtonAccept.bind(this)
      this.dropdownButtons[1].addEventListener('click', this.clickHandlerButtonAccept)
    }
  }

  clickHandlerButtonAccept() {
    this.dropdownToggle()
  }

  _render() {
    this._getElements()
    this.itemsCountersSum = 0
    this.items.forEach((item, index) => {
      this.item = item
      this.item.dataset.dropdownItem = index
      this._setItemsValue(index)
      this._dropdownInputValue(this.itemNameValue, this.itemCounterValue, index)
    })
    this.handleDropdownClick()
    this.CheckItemValueChange()
    this._renderButtons()
    this.handleButtonClearClick()
    this.handleButtonAcceptClick()
  }

  _renderButtons() {
    if (this.dropdownButtons) {
      if (this.itemsCountersSum === 0) {
        this.dropdownButtons[0].classList.add('button__button--hidden')
      } else {
        this.dropdownButtons[0].classList.remove('button__button--hidden')
      }
    }
  }

  _getElements() {
    const { dropdownButtons = false } = this.options
    this.itemsButtons = document.querySelectorAll(`${this.selector} .dropdown__item-button`)
    this.items = document.querySelectorAll(`${this.selector} .dropdown__item`)
    this.dropdownDefault = document.querySelector(`${this.selector} .dropdown__dropdown-default`)
    this.dropdownExpanded = document.querySelector(`${this.selector} .dropdown__dropdown-expanded`)
    this.itemsNames = document.querySelectorAll(`${this.selector} .dropdown__item-name`)
    this.itemsCounters = document.querySelectorAll(`${this.selector} .dropdown__item-counter`)
    this.dropdownInput = document.querySelector(`${this.selector} .dropdown__input`)
    this.dropdownButtonArrow = document.querySelector(`${this.selector} .dropdown__button`)
    if (dropdownButtons) {
      this.dropdownButtons = document.querySelectorAll(`${this.selector} .js-dropdown-button`)
    }
  }

  _switchArrow() {
    if (!this.dropdownExpanded.classList.contains('dropdown__dropdown-expanded--hidden')) {
      this.dropdownButtonArrow.classList.add('dropdown__button--rotate')
    } else {
      this.dropdownButtonArrow.classList.remove('dropdown__button--rotate')
    }
  }

  _getItemsCounterSum() {
    if (this.dropdownButtons) {
      this.itemsCountersSum += this.itemCounterValue
    }
  }

  _setItemsValue(index) {
    this.itemNumber = index
    this.itemNameValue = this.itemsNames[index].innerHTML.toLowerCase()
    this.itemCounterValue = Number(this.itemsCounters[index].innerHTML)
    this._getItemsCounterSum()
    if (this.itemCounterValue === 0) {
      this._getItemButtonDecrease(index)
      this.itemsButtons[this.index].classList.add('dropdown__item-button--disabled')
    }
  }

  _getItemValueOnClick(event) {
    this.target = event.target
    this.item = this.target.closest('.dropdown__item')
    this.itemNumber = Number(this.item.dataset.dropdownItem)
    this.itemCounter = this.itemsCounters[this.itemNumber]
    this.itemNameValue = this.itemsNames[this.itemNumber].innerHTML.toLowerCase()
    this.itemCounterValue = Number(this.itemsCounters[this.itemNumber].innerHTML)
  }

  _decreaseItemValue() {
    this._getMaxLenghtItem()

    if (this.itemCounterValue !== 0) {
      this.itemCounterValue -= 1
      this.itemsCountersSum -= 1
    }

    if (this.itemCounterValue === 0) {
      this._getItemButtonDecrease(this.itemNumber)
      this.itemButtonDecrease.classList.add('dropdown__item-button--disabled')
    }

    if (this.itemCounterValue !== this.maxLengthItem) {
      this._getItemButtonIncrease(this.itemNumber)
      this.itemButtonIncrease.classList.remove('dropdown__item-button--disabled')
    }

    this.itemCounter.innerHTML = this.itemCounterValue
    this._dropdownInputValue(this.itemNameValue, this.itemCounterValue, this.itemNumber)
  }

  _increaseItemValue() {
    this._getMaxLenghtItem()

    if (this.itemCounterValue < this.maxLengthItem) {
      this.itemCounterValue += 1
      this.itemsCountersSum += 1
    }

    if (this.itemCounterValue === this.maxLengthItem) {
      this._getItemButtonIncrease(this.itemNumber)
      this.itemButtonIncrease.classList.add('dropdown__item-button--disabled')
    }

    if (this.itemCounterValue !== 0) {
      this._getItemButtonDecrease(this.itemNumber)
      this.itemButtonDecrease.classList.remove('dropdown__item-button--disabled')
    }

    this.itemCounter.innerHTML = this.itemCounterValue
    this._dropdownInputValue(this.itemNameValue, this.itemCounterValue, this.itemNumber)
  }

  _getMaxLenghtItem() {
    const { maxLength = false } = this.options
    this.maxLengthItem = maxLength[`item${this.itemNumber}`]
      ? maxLength[`item${this.itemNumber}`]
      : 5
  }

  _dropdownInputValue(name, value, index) {
    const { combineTwoFirstItems = false } = this.options
    if (combineTwoFirstItems) {
      this._inputValueWithCombine(name, value, index)
    } else {
      this._inputValue(name, value, index)
    }

    if (this.click) {
      this.dropdownInput.value = this.inputValueArray.join(', ')
    }
    this.inputValueArray = []
  }

  _inputValue(name, value, index) {
    this.itemNames = findItemNames(name)
    this.itemName = declination(value, this.itemNames)

    this._setItemValue(name, value, index)

    this.itemsValue.forEach((item) => {
      if (item !== '') {
        this.inputValueArray.push(item)
      }
    })
  }

  _inputValueWithCombine(name, value, index) {
    this.itemNames = findItemNames(name)
    this.CounterValue = value

    if (index < 2) {
      let twoFirstCountersSum = 0
      this.twoFirstCounters = Array.from(this.itemsCounters).slice(0, 2)

      this.twoFirstCounters.forEach((item) => {
        twoFirstCountersSum += Number(item.innerHTML)
      })

      this.CounterValue = twoFirstCountersSum
      this.itemName = declination(this.CounterValue, this.itemNames)
      this._setItemValue(this.itemName, this.CounterValue, 0)
    } else if (index >= 2) {
      this.itemName = declination(this.CounterValue, this.itemNames)
      this._setItemValue(this.itemName, this.CounterValue, index - 1)
    }

    this.itemsValue.forEach((item) => {
      if (item !== '') {
        this.inputValueArray.push(item)
      }
    })
  }

  _setItemValue(name, value, index) {
    if (value === 0) {
      this.itemsValue[index] = ''
    } else {
      this.itemValue = [`${value} ${name}`]
      this.itemsValue[index] = this.itemValue
    }
  }

  _getItemButtonDecrease(dataNumber) {
    this._getButtonDecreaseIndex(dataNumber)
    this.itemButtonDecrease = this.itemsButtons[this.index]
  }

  _getItemButtonIncrease(dataNumber) {
    this._getButtonIncreaseIndex(dataNumber)
    this.itemButtonIncrease = this.itemsButtons[this.index]
  }

  _getButtonDecreaseIndex(dataNumber) {
    this.index = (dataNumber * 4) / 2
  }

  _getButtonIncreaseIndex(dataNumber) {
    this.index = Math.round(((dataNumber * 4) + 1) / 2)
  }
}

export default Dropdown
