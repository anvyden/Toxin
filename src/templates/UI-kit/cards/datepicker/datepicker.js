import AirDatepicker from 'air-datepicker'

const datepickerButtons = {
  acceptButton: {
    content: 'Применить',
    className: 'button button--variant-text button__button button__button--variant-text',
    onClick: (accept) => {
      accept.hide()
    },
  },
  clearButton: {
    content: 'Очистить',
    className: 'button button--variant-text button__button button__button--variant-text',
    onClick: (clear) => {
      clear.clear()
    },
  },
}

const datepickerValues = {
  amountSelectedDays: 0,
}

const calcDays = (input, inputSecond) => {
  const inputValue = input.value
  const inputSecondValue = inputSecond.value
  let days = 0
  if (inputValue !== 'ДД.ММ.ГГГГ' && inputSecondValue !== 'ДД.ММ.ГГГГ') {
    const firstDate = Date.parse(inputValue.split('.').reverse())
    const secondDate = Date.parse(inputSecondValue.split('.').reverse())
    const oneDay = 1000 * 60 * 60 * 24
    days = Math.round((secondDate - firstDate) / oneDay)
  }
  return days
}

class Datepicker {
  constructor(datepickerElements) {
    this.datepickerElements = datepickerElements
    this._init()
  }

  _init() {
    const { input, inputSecond } = this.datepickerElements
    const options = {
      dateFormat(date) {
        return date[0]
          ? date[0].toLocaleString('ru', {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
          })
          : 'ДД.ММ.ГГГГ'
      },
      altField: inputSecond,
      altFieldDateFormat(date) {
        return date[1]
          ? date[1].toLocaleString('ru', {
            year: 'numeric',
            day: '2-digit',
            month: '2-digit',
          })
          : 'ДД.ММ.ГГГГ'
      },
      onSelect() {
        datepickerValues.amountSelectedDays = calcDays(input, inputSecond)
      },
      multipleDates: true,
      range: true,
      multipleDatesSeparator: '-',
      buttons: [datepickerButtons.clearButton, datepickerButtons.acceptButton],
      navTitles: {
        days: 'MMMM yyyy',
      },
      prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
      nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
    }
    this.input = new AirDatepicker(input, options)
    this.addEventListenerDropdowns()
  }

  addEventListenerDropdowns() {
    const { datepickerDropdowns } = this.datepickerElements
    datepickerDropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', () => {
        this.input.show()
      })
    })
  }
}

export default Datepicker
