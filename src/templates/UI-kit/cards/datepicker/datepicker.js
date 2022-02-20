import AirDatepicker from 'air-datepicker'

class Datepicker {
  constructor(datepickerClass, options) {
    this.selector = datepickerClass
    this._init()
  }

  _init() {
    this.datepicker = new AirDatepicker(this.selector, {
      inline: true,
      range: true,
      navTitles: {
        days: 'MMMM yyyy',
      },
      buttons: [this._getClearButton(), this._getAcceptButton()],
      prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
      nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
    })
  }

  _getAcceptButton() {
    this.acceptButton = {
      content: 'Применить',
      className: 'button button__button text--with-type-h3',
      onClick: (accept) => {
        this.datepicker.hide()
      },
    }
    return this.acceptButton
  }

  _getClearButton() {
    this.clearButton = {
      content: 'Очистить',
      className: 'button button__button text--with-type-h3',
      onClick: (clear) => {
        clear.clear()
      },
    }
    return this.clearButton
  }
}

export default Datepicker
