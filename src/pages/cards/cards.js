import Slider from '@libs/swiper/swiper';
import cards from './cards.scss';
import * as textField from '~/components/text-field/text-field';
import Dropdown from '~/components/dropdown/dropdown';
import Datepicker from '~/components/datepicker/datepicker';

const init = {
  findRoomCard: {
    guestsDropdown: new Dropdown('.js-find-room-guests', {
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
    dateDropdown: new Datepicker('.js-date-dropdown', {
      hasTwoInputs: true,
      initialDates: ['2019-08-19', '2019-08-23'],
    }),
  },
  bookingCard: {
    guestsDropdown: new Dropdown('.js-booking-card-guests', {
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
    dateDropdown: new Datepicker(
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
      },
    ),
  },
  datepicker: new Datepicker('.js-datepicker', {
    inline: true,
    initialDates: ['2019-08-19', '2019-08-23'],
  }),
  roomCardsSlider: document
    .querySelectorAll('.swiper')
    .forEach((slider) => new Slider(slider)),
};
