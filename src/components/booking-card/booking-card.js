import wNumb from 'wnumb';

import declination from '~/components/dropdown/utils/declination';

const moneyFormat = wNumb({
  thousand: ' ',
});

class BookingCard {
  constructor(params) {
    try {
      this.selector = params.selector;
      this.params = params;
    } catch (error) {
      throw new Error('failed to get params for BookingCard class', error);
    }

    this._init();
  }

  render(days) {
    const {
      roomNumber,
      roomPrice,
      discount,
      additionalServicesSum,
      priceForSelectedDays,
      totalSum,
    } = this._getCorrectParams(days);

    this.roomNumber.textContent = roomNumber;
    this.roomPrice.textContent = `${moneyFormat.to(roomPrice)}₽`;
    this.pricePerDays.textContent = `${moneyFormat.to(
      roomPrice,
    )}₽ х ${days} ${declination(days, ['сутки', 'суток', 'суток'])}`;
    this.sumPriceInDays.textContent = `${moneyFormat.to(
      priceForSelectedDays,
    )}₽`;
    this.servicesPrice.textContent = `Сбор за услуги: скидка ${moneyFormat.to(
      discount,
    )}₽`;
    this.servicesSumPrice.textContent = '0₽';
    this.additionalServicesSum.textContent = `${additionalServicesSum}₽`;

    if (totalSum < 0) {
      this.totalSum.textContent = '0₽';
    } else {
      this.totalSum.textContent = `${moneyFormat.to(totalSum)}₽`;
    }
  }

  _init() {
    this.root = document.querySelector(this.selector);
    this._getSelectors();
    this._getElemetns();
    this.render();
  }

  _getCorrectParams(days) {
    const {
      roomNumber, roomPrice, discount, additionalServicesSum,
    } = this.params;

    const correctRoomNumber = parseInt(roomNumber, 10);
    const correctRoomPrice = parseInt(roomPrice, 10);
    const correctDiscount = parseInt(discount, 10);
    const correctAdditionalServicesSum = parseInt(additionalServicesSum, 10);
    const priceForSelectedDays = correctRoomPrice * days;
    const totalSum = priceForSelectedDays - correctDiscount + correctAdditionalServicesSum;

    return {
      roomNumber: correctRoomNumber,
      roomPrice: correctRoomPrice,
      discount: correctDiscount,
      additionalServicesSum: correctAdditionalServicesSum,
      priceForSelectedDays,
      totalSum,
    };
  }

  _getSelectors() {
    this.numberSelector = '.js-booking-card__room-number-value';
    this.priceSelector = '.js-booking-card__room-price-value';
    this.pricePerDaysSelector = '.js-booking-card__days-value';
    this.sumPricePerDaysSelector = '.js-booking-card__days-sum';
    this.servicesPriceSelector = '.js-booking-card__services-value';
    this.servicesSumPriceSelector = '.js-booking-card__services-sum';
    this.totalSumSelector = '.js-booking-card__total-price-sum';
    this.additionalServicesSumSelector = '.js-booking-card__additional-services-sum';
  }

  _getElemetns() {
    this.roomNumber = this.root.querySelector(this.numberSelector);
    this.roomPrice = this.root.querySelector(this.priceSelector);
    this.pricePerDays = this.root.querySelector(this.pricePerDaysSelector);
    this.sumPriceInDays = this.root.querySelector(this.sumPricePerDaysSelector);
    this.servicesPrice = this.root.querySelector(this.servicesPriceSelector);
    this.servicesSumPrice = this.root.querySelector(this.servicesSumPriceSelector);
    this.additionalServicesSum = this.root.querySelector(
      this.additionalServicesSumSelector,
    );
    this.totalSum = this.root.querySelector(this.totalSumSelector);
  }
}

export default BookingCard;
