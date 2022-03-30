import roomDetails from '@pages/room-details/room-details.scss'
import Dropdown from '@form-elements/dropdown/dropdown'
import LikeButton from '@form-elements/like-button/like-button'
import { Datepicker } from '@cards/datepicker/datepicker'
import BookingCard from '@cards/booking-card/booking-card'
import Menu from '@headers-footers/menu/menu'
import Header from '@headers-footers/header/header'

const roomInfo = {
  roomNumber: '888',
  roomPrice: '9990',
  discount: '2179',
  additionalServicesSum: '300',
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
      roomInfo,
    ),
    dropdownGuests: new Dropdown('js-booking-card-guests', {
      dropdownButtons: true,
      combineTwoFirstItems: true,
    }),
    bookingCard: new BookingCard(roomInfo),
    likeButtons: new LikeButton('js-like-button'),
  }
}())
