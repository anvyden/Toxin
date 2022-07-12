import AirDatepicker from 'air-datepicker'

import BookingCard from '@cards/booking-card/booking-card'

const datepickerOpts = {
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
  calcDays: (input, inputSecond) => {
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
  },
}

const datepickerValues = {}

class Datepicker {
  constructor(props, bookingCardParams) {
    this.props = props
    this.bookingCardParams = bookingCardParams
    this._init()
  }

  _init() {
    const {
      datepickerSelectors: {
        input,
        inputSecond,
        datepickerDropdowns,
      },
      dates = '',
    } = this.props
    const cardParams = this.bookingCardParams

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
      multipleDates: true,
      range: true,
      multipleDatesSeparator: '-',
      buttons: [datepickerOpts.clearButton, datepickerOpts.acceptButton],
      navTitles: {
        days: 'MMMM yyyy',
      },
      prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
      nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
    }

    if (dates !== '') {
      options.selectedDates = [dates[0], dates[1]]
    }

    if (cardParams !== undefined) {
      options.onSelect = () => {
        datepickerValues.amountSelectedDays = datepickerOpts.calcDays(input, inputSecond)
        new BookingCard(cardParams).render()
      }
      datepickerValues.amountSelectedDays = datepickerOpts.calcDays(input, inputSecond)
    }

    this.input = new AirDatepicker(input, options)
    this.addEventListenerDropdowns(datepickerDropdowns)
  }

  addEventListenerDropdowns(dropdowns) {
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', () => {
        this.input.show()
      })
    })
  }
}

export { Datepicker, datepickerValues }
