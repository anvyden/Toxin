import AirDatepicker from 'air-datepicker'

import BookingCard from '~/components/booking-card/booking-card'

const datepickerOpts = {
  acceptButton: {
    content: 'Применить',
    attrs: {
      type: 'button',
    },
    onClick: (datepicker) => {
      datepicker.$datepicker.classList.remove('-active-')
    },
  },
  clearButton: {
    content: 'Очистить',
    attrs: {
      type: 'button',
    },
    onClick: (datepicker) => {
      datepicker.clear()
    },
  },
  // calcDays: (input, inputSecond) => {
  //   const inputValue = input.value
  //   const inputSecondValue = inputSecond.value
  //   let days = 0
  //   if (inputValue !== 'ДД.ММ.ГГГГ' && inputSecondValue !== 'ДД.ММ.ГГГГ') {
  //     const firstDate = Date.parse(inputValue.split('.').reverse())
  //     const secondDate = Date.parse(inputSecondValue.split('.').reverse())
  //     const oneDay = 1000 * 60 * 60 * 24
  //     days = Math.round((secondDate - firstDate) / oneDay)
  //   }
  //   return days
  // },
}

const datepickerValues = {}

class Datepicker {
  constructor(selector, options) {
    this.selector = selector
    this.options = options
    this._init()
  }

  _init() {
    const { initialDates } = this.options
    
    this.root = document.querySelector(this.selector)
    
    this._findDOMElements()
    this._setup()
    
    this.datepicker = new AirDatepicker(this.root, this.params)
    this.container = this.datepicker.$datepicker;
    
    this.root.addEventListener('click', this._handleDateDropdownClick.bind(this))

    if (initialDates) this._setInitialDates(initialDates);
  }

  _setup() {
    const { hasTwoInputs } = this.options

    const params = {
      dateFormat: 'dd MMM',
      multipleDates: true,
      range: true,
      multipleDatesSeparator: ' - ',
      buttons: [datepickerOpts.clearButton, datepickerOpts.acceptButton],
      navTitles: {
        days: 'MMMM yyyy',
      },
      prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
      nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
    }

    const paramsWithTwoInputs = {
      position({$datepicker}) {
        $datepicker.style.top = '5px'
      },
      dateFormat: 'dd.MM.yyyy',
      multipleDates: true,
      range: true,
      multipleDatesSeparator: '-',
      buttons: [datepickerOpts.clearButton, datepickerOpts.acceptButton],
      navTitles: {
        days: 'MMMM yyyy',
      },
      onSelect: this._onSelect.bind(this),
      prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
      nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
    }

    this.params = hasTwoInputs ? paramsWithTwoInputs : params

    // if (dates !== '') {
    //   options.selectedDates = [dates]
    // }
  }

  _findDOMElements() {
    const { hasTwoInputs } = this.options
    if (hasTwoInputs) {
      this.start = this.root.querySelector('[data-type="date-dropdown-start"]')
      this.end = this.root.querySelector('[data-type="date-dropdown-end"]')
    }
  }

  _onSelect({formattedDate}) {
    const { hasTwoInputs } = this.options

    if (hasTwoInputs) {
      const [startDate = '', endDate = ''] = formattedDate
      this.start.value = startDate
      this.end.value = endDate
    }
  }

  _setInitialDates(dates = []) {
    this.datepicker.selectDate(dates)
  }

  _handleDateDropdownClick({ target }) {
    console.log(target)
    const { type } = target.dataset

    if (type === 'date-dropdown-start') this._toggle()
    if (type === 'date-dropdown-end') this._toggle()
    if (type === 'arrow') this._toggle()
  }

  get isOpen() {
    return this.container.classList.contains('-active-')
  }

  _close() {
    this.container.classList.remove('-active-')
  }

  _open() {
    this.container.classList.add('-active-')
  }

  _toggle() {
    console.log(this.isOpen)
    if (this.isOpen) {
      this._close()
    } else {
      this._open()
    }
  }
}

// class Datepicker {
//   constructor(props, bookingCardParams) {
//     this.selector = selector
//     this.props = props
//     this.bookingCardParams = bookingCardParams
//     this._init()
//   }

//   _init() {
//     const {
//       datepickerSelectors: {
//         input,
//         inputSecond,
//         datepickerDropdowns,
//       },
//       dates = '',
//     } = this.props
//     const cardParams = this.bookingCardParams

//     const options = {
//       dateFormat(date) {
//         return date[0]
//           ? date[0].toLocaleString('ru', {
//             year: 'numeric',
//             day: '2-digit',
//             month: '2-digit',
//           })
//           : 'ДД.ММ.ГГГГ'
//       },
//       altField: inputSecond,
//       altFieldDateFormat(date) {
//         return date[1]
//           ? date[1].toLocaleString('ru', {
//             year: 'numeric',
//             day: '2-digit',
//             month: '2-digit',
//           })
//           : 'ДД.ММ.ГГГГ'
//       },
//       multipleDates: true,
//       range: true,
//       multipleDatesSeparator: '-',
//       buttons: [datepickerOpts.clearButton, datepickerOpts.acceptButton],
//       navTitles: {
//         days: 'MMMM yyyy',
//       },
//       prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
//       nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
//     }

//     if (dates !== '') {
//       options.selectedDates = [dates[0], dates[1]]
//     }

//     if (cardParams !== undefined) {
//       options.onSelect = () => {
//         datepickerValues.amountSelectedDays = datepickerOpts.calcDays(input, inputSecond)
//         new BookingCard(cardParams).render()
//       }
//       // datepickerValues.amountSelectedDays = datepickerOpts.calcDays(input, inputSecond)
//     }

//     this.input = new AirDatepicker(input, options)
//     this.addEventListenerDropdowns(datepickerDropdowns)
//   }

//   addEventListenerDropdowns(dropdowns) {
//     dropdowns.forEach((dropdown) => {
//       dropdown.addEventListener('click', () => {
//         this.input.show()
//       })
//     })
//   }
// }

export { Datepicker, datepickerValues }
