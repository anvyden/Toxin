import formElements from 'pages/form-elements/form-elements.scss'
import LikeButton from 'form-elements/like-button/like-button'
import * as textField from 'form-elements/text-field/text-field'
import RangeSlider from 'form-elements/range-slider/range-slider'
import Pagination from 'form-elements/pagination/pagination'

const rangeSlider = new RangeSlider('js-range-slider', 'js-range-slider-price', {
  min: 0,
  max: 15000,
  minStartPrice: 5000,
  maxStartPrice: 10000,
})

const pagination = new Pagination('js-pagination', {
  countOfItems: 180,
  itemsPerPage: 12,
})
