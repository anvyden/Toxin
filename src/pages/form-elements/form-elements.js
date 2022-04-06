import formElements from '@pages/form-elements/form-elements.scss'
import * as textField from '@form-elements/text-field/text-field'
import Dropdown from '@form-elements/dropdown/dropdown'
import LikeButton from '@form-elements/like-button/like-button'
import StarRating from '@form-elements/star-rating/star-rating'
import RangeSlider from '@form-elements/range-slider/range-slider'
import Pagination from '@form-elements/pagination/pagination'
import CheckboxList from '@form-elements/checkbox-list/checkbox-list'

const init = (function () {
  return {
    dropdown1: new Dropdown('.js-dropdown-1', {
      maxLength: {
        item0: 10,
        item1: 15,
        item2: 6,
      },
    }),
    dropdown2: new Dropdown('.js-dropdown-guests-1', {
      maxLength: {
        item0: 10,
        item1: 15,
        item2: 6,
      },
      dropdownButtons: true,
      combineTwoFirstItems: true,
    }),
    dropdown3: new Dropdown('.js-dropdown-guests-2', {
      maxLength: {
        item0: 10,
        item1: 15,
        item2: 6,
      },
      dropdownButtons: true,
      combineTwoFirstItems: true,
    }),
    starRating1: new StarRating('.js-star-rating-1', 4),
    starRating2: new StarRating('.js-star-rating-2', 5),
    rangeSlider: new RangeSlider({
      sliderSelectors: {
        slider: '.js-range-slider',
        price: '.js-range-slider-price',
      },
      min: 0,
      max: 15000,
      minStartPrice: 5000,
      maxStartPrice: 10000,
    }),
    pagination: new Pagination('.js-pagination', {
      countOfItems: 180,
      itemsPerPage: 12,
    }),
    expandableCheckboxList: new CheckboxList('.js-expandable-checkbox'),
  }
}())
