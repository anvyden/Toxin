import AirDatepicker from 'air-datepicker'

import cards from '@pages/cards/cards.scss'
import * as textField from '~/components/text-field/text-field'
import Dropdown from '~/components/dropdown/dropdown'
import StarRating from '~/components/star-rating/star-rating'
import { Datepicker } from '~/components/datepicker/datepicker'
import BookingCard from '~/components/booking-card/booking-card'
import Slider from '@libs/swiper/swiper'

const datepickerStaticButtons = {
  acceptButton: {
    content: 'Применить',
  },
  clearButton: {
    content: 'Очистить',
  },
}

const cardsParams = {
  roomInfo: {
    roomNumber: '888',
    roomPrice: '9990',
    discount: '2179',
    additionalServicesSum: '300',
  },
  datepickerStaticOpts: {
    inline: true,
    range: true,
    buttons: [datepickerStaticButtons.clearButton, datepickerStaticButtons.acceptButton],
    navTitles: {
      days: 'MMMM yyyy',
    },
    prevHtml: '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
    nextHtml: '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
  },
}

const init = (function () {
  return {
    findRoomCardOpts: {
      findRoomGuests: new Dropdown('.js-find-room-guests', {
        type: 'guests',
        maxLengthItems: {
          item0: 5,
          item1: 10,
          item2: 10,
        },
        plurals: {
          guests: ['гость', 'гостя', 'гостей'],
          babies: ['младенец', 'младенца', 'младенцев'],
        },
      }),
      findRoomDatepicker: new Datepicker('.js-date-dropdown', {
        hasTwoInputs: true,
        initialDates: ['2019-08-19', '2019-08-23']
      })
      // findRoomDatepicker: new Datepicker(
      //   {
      //     datepickerSelectors: {
      //       input: document.querySelector('.js-find-room-datepicker-1'),
      //       inputSecond: document.querySelector('.js-find-room-datepicker-2'),
      //       datepickerDropdowns: document.querySelectorAll('.js-find-room-datepicker-dropdown .js-dropdown__dropdown-default'),
      //     },
      //   },
      // ),
    },
    bookingCardOpts: {
      bookingCardGuests: new Dropdown('.js-booking-card-guests', {
        type: 'guests',
        maxLengthItems: {
          item0: 5,
          item1: 10,
          item2: 10,
        },
        plurals: {
          guests: ['гость', 'гостя', 'гостей'],
          babies: ['младенец', 'младенца', 'младенцев'],
        },
      }),
      // bookingCardDatepicker: new Datepicker(
      //   {
      //     datepickerSelectors: {
      //       input: document.querySelector('.js-booking-card-datepicker-1'),
      //       inputSecond: document.querySelector('.js-booking-card-datepicker-2'),
      //       datepickerDropdowns: document.querySelectorAll('.js-booking-room-datepicker-dropdown .js-dropdown__dropdown-default'),
      //     },
      //     dates: ['2019-08-19', '2019-08-23'],
      //   },
      //   cardsParams.roomInfo,
      // ),
      // bookingCard: new BookingCard(cardsParams.roomInfo),
    },
    datepickerStatic: new AirDatepicker('.js-datepicker', cardsParams.datepickerStaticOpts),
    roomCards: {
      roomRating1: new StarRating('.js-room-rating-1', 5),
      roomRating2: new StarRating('.js-room-rating-2', 4),
      cardSlider: new Slider('.swiper'),
    },
  }
}())
