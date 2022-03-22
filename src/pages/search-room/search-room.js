import searchRoom from '@pages/search-room/search-room.scss'
import Dropdown from '@form-elements/dropdown/dropdown'
import StarRating from '@form-elements/star-rating/star-rating'
import RangeSlider from '@form-elements/range-slider/range-slider'
import Pagination from '@form-elements/pagination/pagination'
import CheckboxList from '@form-elements/checkbox-list/checkbox-list'
import Menu from '@headers-footers/menu/menu'
import Header from '@headers-footers/header/header'
import DatepickerWithOneInput from '@cards/datepicker/datepicker1'
import Slider from '@libs/swiper/swiper'

function initRoomsRatings() {
  const roomsRatings = [5, 4, 3, 5, 4, 3, 5, 4, 3, 5, 3, 3]
  const ratings = []
  roomsRatings.forEach((rating, i) => {
    ratings.push(new StarRating(`js-room-rating-${i}`, rating))
  })
  return ratings
}

class SearchRoom {
  constructor(opts) {
    this.opts = opts
    this.handleSidebarButtonClick()
  }

  handleSidebarButtonClick() {
    const { button } = this.opts
    this.clickHandlerSidebarButton = this.clickHandlerSidebarButton.bind(this)
    button.addEventListener('click', this.clickHandlerSidebarButton)
  }

  clickHandlerSidebarButton() {
    const { sidebar } = this.opts
    sidebar.classList.toggle('content__sidebar--visible')
  }
}

const init = {
  menu: new Menu(),
  header: new Header(),
  dropdownDate: new DatepickerWithOneInput(
    {
      datepickerSelectors: {
        input: document.querySelector('.js-input-date-selecter'),
      },
    },
  ),
  dropdownGuests: new Dropdown('js-dropdown-guests', {
    dropdownButtons: true,
    combineTwoFirstItems: true,
  }),
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
  dropdownComfort: new Dropdown('js-dropdown-comfort'),
  checkboxListComfort: new CheckboxList('js-checkbox-list-comfort'),
  rooms: {
    roomSlider: new Slider('.swiper'),
    roomRating: initRoomsRatings(),
    roomPagination: new Pagination('js-rooms-pagination', {
      countOfItems: 180,
      itemsPerPage: 12,
    }),
  },
  SearchRoom: new SearchRoom({
    button: document.querySelector('.js-sidebar-button'),
    sidebar: document.querySelector('.js-sidebar'),
  }),
}
