import wNumb from 'wnumb'

import declination from '@form-elements/dropdown/utils/declination'
import findItemNames from '@form-elements/dropdown/utils/findItemNames'
import { datepickerValues } from '@cards/datepicker/datepicker'

const moneyFormat = wNumb({
  thousand: ' ',
})

const daysWords = findItemNames('сутки')

class BookingCard {
  constructor(params) {
    this.params = params
    this._getElemetns()
    this.render()
  }

  render() {
    const params = this._getIntParams()

    this.calcPriceInDays = params.roomPrice * params.amountSelectedDays
    this.calcTotalSum = this.calcPriceInDays - params.discount + params.additionalServicesSum

    this.roomNumber.innerHTML = params.roomNumber
    this.roomPrice.innerHTML = `${moneyFormat.to(params.roomPrice)}₽`
    this.PriceInDays.innerHTML = `${moneyFormat.to(params.roomPrice)}₽ х ${params.amountSelectedDays} ${declination(params.amountSelectedDays, daysWords)}`
    this.sumPriceInDays.innerHTML = `${moneyFormat.to(this.calcPriceInDays)}₽`
    this.servicesPrice.innerHTML = `Сбор за услуги: скидка ${moneyFormat.to(params.discount)}₽`
    this.servicesSumPrice.innerHTML = '0₽'
    this.additionalServicesSum.innerHTML = `${params.additionalServicesSum}₽`

    if (this.calcTotalSum < 0) {
      this.totalSum.innerHTML = '0₽'
    } else {
      this.totalSum.innerHTML = `${moneyFormat.to(this.calcTotalSum)}₽`
    }
  }

  _getIntParams() {
    const {
      roomNumber,
      roomPrice,
      discount,
      additionalServicesSum,
    } = this.params

    let { amountSelectedDays } = datepickerValues
    amountSelectedDays = Number.isNaN(amountSelectedDays) ? 0 : amountSelectedDays

    return {
      roomNumber: Number(roomNumber),
      roomPrice: Number(roomPrice),
      discount: Number(discount),
      additionalServicesSum: Number(additionalServicesSum),
      amountSelectedDays: Number(amountSelectedDays),
    }
  }

  _getElemetns() {
    this.roomNumber = document.querySelector('.booking-card__room-number-value')
    this.roomPrice = document.querySelector('.booking-card__room-price-value')
    this.PriceInDays = document.querySelector('.booking-card__days-text')
    this.sumPriceInDays = document.querySelector('.booking-card__days-sum')
    this.servicesPrice = document.querySelector('.booking-card__services-text')
    this.servicesSumPrice = document.querySelector('.booking-card__services-sum')
    this.additionalServicesSum = document.querySelector('.booking-card__additional-services-sum')
    this.totalSum = document.querySelector('.booking-card__total-sum')
  }
}

export default BookingCard
