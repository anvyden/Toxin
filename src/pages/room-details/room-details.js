import roomDetails from '@pages/room-details/room-details.scss';
import Dropdown from '~/components/dropdown/dropdown';
import LikeButton from '~/components/like-button/like-button';
import Datepicker from '~/components/datepicker/datepicker';
import Menu from '~/components/menu/menu';
import Header from '~/components/header/header';
import PieChart from '~/components/votes-pie-chart/votes-pie-chart';

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
  likeButtons: document
    .querySelectorAll('.js-like-button__button')
    .forEach((button) => new LikeButton(button)),
  chart: new PieChart(document.querySelector('.js-pie-chart'), [
    {
      id: 'disappointed',
      text: 'Разочарован',
      votesAmount: 0,
      firstStopColor: '#919191',
      secondStopColor: '#3D4975',
    },
    {
      id: 'satisfactorily',
      text: 'Удовлетворительно',
      votesAmount: 260,
      firstStopColor: '#BC9CFF',
      secondStopColor: '#8BA4F9',
    },
    {
      id: 'good',
      votesAmount: 260,
      text: 'Хорошо',
      firstStopColor: '#6FCF97',
      secondStopColor: '#66D2EA',
    },
    {
      id: 'sumptuously',
      text: 'Великолепно',
      votesAmount: 520,
      firstStopColor: '#FFE39C',
      secondStopColor: '#FFBA9C',
    },
  ]),
};
