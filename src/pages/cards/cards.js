import AirDatepicker from 'air-datepicker';

import cards from '@pages/cards/cards.scss';
import * as textField from '~/components/text-field/text-field';
import Dropdown from '~/components/dropdown/dropdown';
import StarRating from '~/components/star-rating/star-rating';
import { Datepicker } from '~/components/datepicker/datepicker';
import Slider from '@libs/swiper/swiper';

const datepickerStaticButtons = {
  acceptButton: {
    content: 'Применить',
  },
  clearButton: {
    content: 'Очистить',
  },
};

const cardsParams = {
  roomInfo: {
    roomNumber: '888',
    roomPrice: '9990₽',
    discount: '2179₽',
    additionalServicesSum: '300₽',
  },
  datepickerStaticOpts: {
    inline: true,
    range: true,
    buttons: [
      datepickerStaticButtons.clearButton,
      datepickerStaticButtons.acceptButton,
    ],
    navTitles: {
      days: 'MMMM yyyy',
    },
    prevHtml:
      '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
    nextHtml:
      '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
  },
};

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
        initialDates: ['2019-08-19', '2019-08-23'],
      }),
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
      bookingCardDatepicker: new Datepicker(
        '.js-booking-card-date-dropdown',
        {
          hasTwoInputs: true,
          initialDates: ['2019-08-19', '2019-08-23'],
        },
        {
          selector: '.js-booking-card',
          roomNumber: '888',
          roomPrice: '9990₽',
          discount: '2179₽',
          additionalServicesSum: '300₽',
        }
      ),
    },
    datepickerStatic: new AirDatepicker('.js-datepicker', {
      hasTwoInputs: true,
      inline: true,
      initialDates: ['2019-08-19', '2019-08-23'],
    }),
    roomCards: {
      roomRating1: new StarRating('.js-room-rating-1', 5),
      roomRating2: new StarRating('.js-room-rating-2', 4),
      cardSlider: new Slider('.swiper'),
    },
  };
})();
