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

class DatepickerWithOneInput {
  constructor(props) {
    this.props = props
    this._init()
  }

  _init() {
    const {
      datepickerSelectors: {
        input,
      },
      dates = '',
    } = this.props
    const options = {
      dateFormat: 'dd MMM',
      multipleDates: true,
      range: true,
      multipleDatesSeparator: ' - ',
      buttons: [datepickerButtons.clearButton, datepickerButtons.acceptButton],
      navTitles: {
        days: 'MMMM yyyy',
      },
      prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
      nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
    }

    if (dates !== '') {
      options.selectedDates = [dates]
    }

    this.input = new AirDatepicker(input, options)
  }
}

export default DatepickerWithOneInput
