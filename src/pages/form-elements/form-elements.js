import formElements from './form-elements.scss';
import * as textField from '~/components/text-field/text-field';
import Dropdown from '~/components/dropdown/dropdown';
import LikeButton from '~/components/like-button/like-button';
import RangeSlider from '~/components/range-slider/range-slider';
import Pagination from '~/components/pagination/pagination';
import CheckboxList from '~/components/checkbox-list/checkbox-list';
import Datepicker from '~/components/datepicker/datepicker';

const init = {
  dateDropdown: new Datepicker('.js-date-dropdown', {
    hasTwoInputs: true,
    initialDates: ['2019-08-19', '2019-08-23'],
  }),
  filterDateDropdown: new Datepicker('.js-filter-date-dropdown', {
    initialDates: ['2019-08-19', '2019-08-23'],
    size: 'small',
  }),
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
    },
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
  }),
  rangeSlider: new RangeSlider('.js-range-slider', {
    min: 0,
    max: 15000,
    step: 50,
    minStartValue: 5000,
    maxStartValue: 10000,
  }),
  pagination: new Pagination('.js-pagination', {
    countOfItems: 180,
    itemsPerPage: 12,
  }),
  expandableCheckboxList: new CheckboxList('.js-expandable-checkbox'),
  likeButtons: [...document.querySelectorAll('.js-like-button__button')].map(
    (button) => new LikeButton(button)
  ),
};
