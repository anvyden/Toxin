import formElements from 'pages/form-elements/form-elements.scss'
import * as textField from 'form-elements/text-field/text-field'
import Dropdown from 'form-elements/dropdown/dropdown'
import LikeButton from 'form-elements/like-button/like-button'
import StarRating from 'form-elements/star-rating/star-rating'
import RangeSlider from 'form-elements/range-slider/range-slider'
import Pagination from 'form-elements/pagination/pagination'

const dropdown1 = new Dropdown('js-dropdown-1', {
  maxLength: {
    item0: 10,
    item1: 15,
    item2: 6,
  },
})

const starRating1 = new StarRating('js-star-rating-1', 4)
const starRating2 = new StarRating('js-star-rating-2', 5)

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
