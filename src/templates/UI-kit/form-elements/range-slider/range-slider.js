import noUiSlider from 'nouislider'
import wNumb from 'wnumb'

class RangeSlider {
  constructor(sliderClass, priceClass, options) {
    this.rangeSlider = document.querySelector(`.${sliderClass}`)
    this.rangeSliderPrice = document.querySelector(`.${priceClass}`)
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
    this.cssClasses.origin += ' range-slider__origin'
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
        format: wNumb({
          decimals: 0,
          thousand: ' ',
        }),
      })

      this.rangeSlider.noUiSlider.on('update', (values) => {
        const firstCounter = values[0]
        const secondCounter = values[1]
        this.rangeSliderPrice.innerHTML = `${firstCounter}₽ - ${secondCounter}₽`
      })
    }
  }
}

export default RangeSlider
