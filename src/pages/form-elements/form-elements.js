import formElements from './form-elements.scss'
import * as textField from '~/components/text-field/text-field'
import Dropdown from '~/components/dropdown/dropdown'
import LikeButton from '~/components/like-button/like-button'
import StarRating from '~/components/star-rating/star-rating'
import RangeSlider from '~/components/range-slider/range-slider'
import Pagination from '~/components/pagination/pagination'
import CheckboxList from '~/components/checkbox-list/checkbox-list'

const init = (function () {
  return {
    dropdown1: new Dropdown('.js-dropdown-1', {
      type: 'comfort',
      maxLengthItems: {
        item0: 10,
        item1: 15,
        item2: 6,
      },
      plurals: {
        bedrooms: ['спальня', 'спальни', 'спален'],
        beds: ['кровать', 'кровати', 'кроватей'],
        bathrooms: ['ванная комната', 'ванные комнаты', 'ванных комнат'],
      }
    }),
    dropdown2: new Dropdown('.js-dropdown-guests-1', {
      type: 'guests',
      maxLengthItems: {
        item0: 10,
        item1: 15,
        item2: 6,
      },
      plurals: {
        guests: ['гость', 'гостя', 'гостей'],
        babies: ['младенец', 'младенца', 'младенцев'],
      },
      dropdownButtons: true,
      combineTwoFirstItems: true,
    }),
    dropdown3: new Dropdown('.js-dropdown-guests-2', {
      type: 'guests',
      maxLengthItems: {
        item0: 10,
        item1: 15,
        item2: 6,
      },
      plurals: {
        guests: ['гость', 'гостя', 'гостей'],
        babies: ['младенец', 'младенца', 'младенцев'],
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
