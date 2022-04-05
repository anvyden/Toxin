import roomDetails from '@pages/room-details/room-details.scss'
import Dropdown from '@form-elements/dropdown/dropdown'
import LikeButton from '@form-elements/like-button/like-button'
import { Datepicker } from '@cards/datepicker/datepicker'
import BookingCard from '@cards/booking-card/booking-card'
import Menu from '@headers-footers/menu/menu'
import Header from '@headers-footers/header/header'
import VotesPieChart from '@templates/pages/votes-pie-chart/votes-pie-chart'

const roomDetailsParams = {
  roomInfo: {
    roomNumber: '888',
    roomPrice: '9990',
    discount: '2179',
    additionalServicesSum: '300',
  },
  chartParams: {
    perfectly: 510,
    well: 240,
    satisfactory: 240,
    disappointed: 0,
    total: 990,
  },
}

const init = (function () {
  return {
    menu: new Menu(),
    header: new Header(),
    datepicker: new Datepicker(
      {
        datepickerSelectors: {
          input: document.querySelector('.js-booking-card-input-1'),
          inputSecond: document.querySelector('.js-booking-card-input-2'),
          datepickerDropdowns: document.querySelectorAll('.js-booking-card-dropdown .dropdown__dropdown-default'),
        },
      },
      roomDetailsParams.roomInfo,
    ),
    dropdownGuests: new Dropdown('js-booking-card-guests', {
      dropdownButtons: true,
      combineTwoFirstItems: true,
    }),
    bookingCard: new BookingCard(roomDetailsParams.roomInfo),
    likeButtons: new LikeButton('js-like-button'),
    chart: new VotesPieChart(roomDetailsParams.chartParams),
  }
}())
