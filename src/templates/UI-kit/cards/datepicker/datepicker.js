import AirDatepicker from 'air-datepicker'

const acceptButton = {
  content: 'Применить',
  className: 'button button__button text--with-type-h3',
  onClick: (accept) => {
    accept.hide()
  },
}

const clearButton = {
  content: 'Очистить',
  className: 'button button__button text--with-type-h3',
  onClick: (clear) => {
    clear.clear()
  },
}

const AirDatepickerInputsOptions = (datepickerSelectors) => {
  const { input, inputSecond } = datepickerSelectors
  const options = {
    multipleDates: true,
    range: true,
    multipleDatesSeparator: '-',
    onSelect(date) {
      input.value = date.formattedDate[0] ? date.formattedDate[0] : 'ДД.ММ.ГГГГ'
      inputSecond.value = date.formattedDate[1] ? date.formattedDate[1] : 'ДД.ММ.ГГГГ'
    },
    buttons: [clearButton, acceptButton],
    navTitles: {
      days: 'MMMM yyyy',
    },
    prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
    nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
  }
  return options
}

class Datepicker {
  constructor(datepickerSelectors) {
    this.datepickerSelectors = datepickerSelectors
    this._init()
  }

  _init() {
    const { input } = this.datepickerSelectors
    this.input = new AirDatepicker(input, AirDatepickerInputsOptions(this.datepickerSelectors))
    this.addEventListenerInput()
  }

  addEventListenerInput() {
    const { inputSecond } = this.datepickerSelectors
    inputSecond.addEventListener('click', () => {
      this.input.show()
    })
  }
}

export default Datepicker
