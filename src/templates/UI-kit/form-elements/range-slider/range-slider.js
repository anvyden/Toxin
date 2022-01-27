import noUiSlider from 'nouislider'

class RangeSlider {
  constructor(sliderId, priceId, options) {
    this.rangeSlider = document.getElementById(sliderId)
    this.rangeSliderPrice = document.getElementById(priceId)
    this.options = options
    this.cssClasses = noUiSlider.cssClasses
    this.stylization()
    this._init()
  }

  stylization() {
    this.cssClasses.target += ' range-slider__target'
    this.cssClasses.handle += ' range-slider__handle'
    this.cssClasses.connect += ' range-slider__connect'
    this.cssClasses.connects += ' range-slider__connects'
  }

  _init() {
    const {
      min,
      max,
      minStartPrice,
      maxStartPrice,
    } = this.options
    if (this.rangeSlider) {
      noUiSlider.create(this.rangeSlider, {
        start: [minStartPrice, maxStartPrice],
        step: 50,
        connect: true,
        range: {
          min: [min],
          max: [max],
        },
      })

      this.rangeSlider.noUiSlider.on('update', (values) => {
        const firstCounter = Math.round(values[0])
        const secondCounter = Math.round(values[1])
        this.rangeSliderPrice.innerHTML = `${firstCounter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}₽ - ${secondCounter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}₽`
      })
    }
  }
}

export default RangeSlider

// const rangeSlider = document.getElementById('js-range-slider')
// const rangeSliderPrice = document.getElementById('js-range-slider-price')

// // Стилизация слайдера
// noUiSlider.cssClasses.target += ' range-slider__target'
// noUiSlider.cssClasses.handle += ' range-slider__handle'
// noUiSlider.cssClasses.connect += ' range-slider__connect'
// noUiSlider.cssClasses.connects += ' range-slider__connects'

// // Инициализация range-slider
// if (rangeSlider) {
//   noUiSlider.create(rangeSlider, {
//     start: [5000, 10000],
//     step: 1,
//     connect: true,
//     range: {
//       min: [0],
//       max: [15000],
//     },
//   })

//   rangeSlider.noUiSlider.on('update', (values) => {
//     rangeSliderPrice.innerHTML = `${Math.round(values[0])}₽ - ${Math.round(values[1])}₽`
//   })
// }
