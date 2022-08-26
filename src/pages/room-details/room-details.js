import roomDetails from '@pages/room-details/room-details.scss';
import Dropdown from '~/components/dropdown/dropdown';
import LikeButton from '~/components/like-button/like-button';
import Datepicker from '~/components/datepicker/datepicker';
import BookingCard from '~/components/booking-card/booking-card';
import Menu from '~/components/menu/menu';
import Header from '~/components/header/header';
import VotesPieChart from '~/components/votes-pie-chart/votes-pie-chart';

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
};

const init = {
  header: new Header(
    document.querySelector('.js-header__burger-menu-container')
  ),
  menu: document
    .querySelectorAll('.js-menu__item')
    .forEach((item) => new Menu(item)),
  bookindCard: {
    dateDropdown: new Datepicker(
      '.js-booking-card-date-dropdown',
      {
        hasTwoInputs: true,
        initialDates: ['2019-08-19', '2019-08-23'],
      },
      {
        selector: '.js-room-details-booking-card',
        roomNumber: '888',
        roomPrice: '9990₽',
        discount: '2179₽',
        additionalServicesSum: '300₽',
      }
    ),
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
  },
  likeButtons: new LikeButton('js-like-button'),
  chart: new VotesPieChart(roomDetailsParams.chartParams),
};
