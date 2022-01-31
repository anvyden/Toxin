import declination from './utils/declination'
import findItemNames from './utils/dropdownItemsName'

class Dropdown {
  constructor(selector, options) {
    this.dropdown = document.querySelector(`.${selector}`)
    this.dropdownItemsButtons = document.querySelectorAll(`.${selector} .dropdown-list__item-button`)
    this.dropdownItems = document.querySelectorAll(`.${selector} .dropdown-list__item`)
    this.selector = selector
    this.options = options
    this.itemsValue = {}
    this.dropdownInputValueArray = []
    this.setDataDropdownItem()
    this.itemCounterChange()
  }

  setDataDropdownItem() {
    this.dropdownItems.forEach((item, i) => {
      this.dropdownItem = item
      this.dropdownItem.dataset.dropdownItemNumber = i
      this.setDropdownItemsValue(i)
    })
  }

  setDropdownItemsValue(i) {
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
    this.dropdownItemNumber = Number(this.dropdownItem.dataset.dropdownItemNumber)
    this.dropdownItemNameValue = this.dropdownItemName.innerHTML
    this.dropdownItemCounterValue = Number(this.dropdownItemCounter.innerHTML)

    if (this.dropdownItemCounterValue !== 0) {
      this.dropdownItemCounterValue -= 1
    }

    if (this.dropdownItemCounterValue === 0) {
      this.target.classList.add('dropdown-list__item-button--disabled')
    }

    this.dropdownItemCounter.innerHTML = this.dropdownItemCounterValue
    this._dropdownInputValue()
  }

  clickHandlerButtonIncrease(event) {
    this.target = event.target
    this._getItemName()
    this._getItemCounter()
    this.dropdownItemNumber = Number(this.dropdownItem.dataset.dropdownItemNumber)
    this.dropdownItemNameValue = this.dropdownItemName.innerHTML
    this.dropdownItemCounterValue = Number(this.dropdownItemCounter.innerHTML)

    this.dropdownItemCounter.innerHTML = this.dropdownItemCounterValue
    this._increaseItemValue()
  }

  _setDropdownInputValue() {
    if ((this.dropdownSecondItemValue === '') && (this.dropdownThirdItemValue === '')) {
      this.dropdownInput.value = this.dropdownFirstItemValue
    } else if (this.dropdownFirstItemValue !== '' && (this.dropdownSecondItemValue !== '' || this.dropdownThirdItemValue !== '')) {
      this.dropdownInput.value = `${this.dropdownFirstItemValue}, `
    } else {
      this.dropdownInput.value = this.dropdownFirstItemValue
    }

    if ((this.dropdownThirdItemValue === '')) {
      this.dropdownInput.value += `${this.dropdownSecondItemValue}`
    } else if (this.dropdownSecondItemValue !== '' && this.dropdownThirdItemValue !== '') {
      this.dropdownInput.value += `${this.dropdownSecondItemValue}, `
    } else {
      this.dropdownInput.value += this.dropdownSecondItemValue
    }

    this.dropdownInput.value += `${this.dropdownThirdItemValue}`
  }

  _increaseItemValue() {
    const { maxLength } = this.options
    this.maxLengthItem = maxLength[`item${this.dropdownItemNumber}`] ? maxLength[`item${this.dropdownItemNumber}`] : 5
    if (this.dropdownItemCounterValue < this.maxLengthItem) {
      this.dropdownItemCounterValue += 1
      console.log(this.dropdownItemCounterValue)
      this.dropdownItemCounter.innerHTML = this.dropdownItemCounterValue
      this._dropdownInputValue()
      if (this.dropdownItemCounterValue === this.maxLengthItem) {
        this.target.classList.add('dropdown-list__item-button--disabled')
      }
    }
  }

  // _increaseFirstItemValue() {
  //   if (this.dropdownItemNumber === 1 && this.dropdownItemCounterValue < 6) {
  //     this.dropdownItemCounterValue += 1
  //     this._firstItemValueEndings()
  //     if (this.dropdownItemCounterValue === 6) {
  //       this.target.classList.add('dropdown-list__item-button--disabled')
  //     }
  //   }
  // }

  _increaseSecondItemValue() {
    if (this.dropdownItemNumber === 2 && this.dropdownItemCounterValue < 7) {
      this.dropdownItemCounterValue += 1
      this._secondItemValueEndings()
      if (this.dropdownItemCounterValue === 7) {
        this.target.classList.add('dropdown-list__item-button--disabled')
      }
    }
  }

  _increaseThirdItemValue() {
    if (this.dropdownItemNumber === 3 && this.dropdownItemCounterValue < 4) {
      this.dropdownItemCounterValue += 1
      this._thirdItemValueEndings()
      if (this.dropdownItemCounterValue === 4) {
        this.target.classList.add('dropdown-list__item-button--disabled')
      }
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
    console.log(this.dropdownInputValueArray)
    this.dropdownInput = document.querySelector(`.${this.selector} .dropdown__input`)
    this.dropdownInput.value = this.dropdownInputValueArray.join(', ')
    this.dropdownInputValueArray = []
  }

  // _firstItemValueEndings() {
  //   if (this.dropdownItemNumber === 0) {
  //     if (this.dropdownItemCounterValue === 0) {
  //       this.dropdownFirstItemValue = ''
  //     } else if (this.dropdownItemCounterValue === 1) {
  //       this.dropdownFirstItemValue = `${this.dropdownItemCounterValue} спальня`
  //     } else if (this.dropdownItemCounterValue < 5) {
  //       this.dropdownFirstItemValue = `${this.dropdownItemCounterValue} спальни`
  //     } else {
  //       this.dropdownFirstItemValue = `${this.dropdownItemCounterValue} спален`
  //     }
  //   }
  //   return this.dropdownFirstItemValue
  // }

  _secondItemValueEndings() {
    if (this.dropdownItemNumber === 1) {
      if (this.dropdownItemCounterValue === 0) {
        this.dropdownSecondItemValue = ''
      } else if (this.dropdownItemCounterValue === 1) {
        this.dropdownSecondItemValue = `${this.dropdownItemCounterValue} кровать`
      } else if (this.dropdownItemCounterValue < 5) {
        this.dropdownSecondItemValue = `${this.dropdownItemCounterValue} кровати`
      } else {
        this.dropdownSecondItemValue = `${this.dropdownItemCounterValue} кроватей`
      }
    }
    return this.dropdownSecondItemValue
  }

  _thirdItemValueEndings() {
    if (this.dropdownItemNumber === 2) {
      if (this.dropdownItemCounterValue === 0) {
        this.dropdownThirdItemValue = ''
      } else if (this.dropdownItemCounterValue === 1) {
        this.dropdownThirdItemValue = `${this.dropdownItemCounterValue} ванная комната`
      } else if (this.dropdownItemCounterValue < 5) {
        this.dropdownThirdItemValue = `${this.dropdownItemCounterValue} ванные комнаты`
      } else {
        this.dropdownThirdItemValue = `${this.dropdownItemCounterValue} ванных комнат`
      }
    }
    return this.dropdownThirdItemValue
  }

  _getItemName() {
    this.dropdownItem = this.target.closest('.dropdown-list__item')
    this._getChildren({ parentElem: this.dropdownItem, childrenClass: 'dropdown-list__item-name', childElemName: 'dropdownItemName' })
  }

  _getItemCounter() {
    this.dropdownItemMenu = this.target.closest('.dropdown-list__item-menu')
    this._getChildren({ parentElem: this.dropdownItemMenu, childrenClass: 'dropdown-list__item-counter', childElemName: 'dropdownItemCounter' })
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
