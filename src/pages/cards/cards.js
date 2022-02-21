import cards from 'pages/cards/cards.scss'
import AirDatepicker from 'air-datepicker'
import Datepicker from 'cards/datepicker/datepicker'
import StarRating from 'form-elements/star-rating/star-rating'
import Slider from 'libs/swiper/swiper'

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

const datepickerStaticOpts = {
  inline: true,
  range: true,
  buttons: [clearButton, acceptButton],
  navTitles: {
    days: 'MMMM yyyy',
  },
  prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
  nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
}

const datepickerStatic = new AirDatepicker('.js-datepicker', datepickerStaticOpts)

const datepickerSelectors = {
  input: document.querySelector('.js-datepicker-input-1'),
  inputSecond: document.querySelector('.js-datepicker-input-2'),
}

const datepickerInput = new Datepicker(datepickerSelectors)

const roomRating1 = new StarRating('js-room-rating-1', 5)
const roomRating2 = new StarRating('js-room-rating-2', 4)

const cardSlider = new Slider('.swiper')
