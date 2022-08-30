import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

class RangeSlider {
  constructor(selector, options) {
    this.selector = selector;
    this.options = options;
    this._init();
  }

  _init() {
    const {
      min,
      max,
      step,
      minStartValue,
      maxStartValue,
    } = this.options;

    this._getElements();
    this._addClassesForStyles();

    if (this.slider) {
      noUiSlider.create(this.slider, {
        start: [minStartValue, maxStartValue],
        step,
        connect: true,
        range: {
          min: [min],
          max: [max],
        },
        format: wNumb({
          decimals: 0,
          thousand: ' ',
        }),
      });

      this.slider.noUiSlider.on('update', (values) => {
        const [first, second] = values;
        this.sliderValue.value = `${first}₽ - ${second}₽`;
      });
    }
  }

  _getElements() {
    const root = document.querySelector(this.selector);
    this.slider = root.querySelector('.js-range-slider__slider');
    this.sliderValue = root.querySelector('.js-range-slider__value');
  }

  _addClassesForStyles() {
    this.cssClasses = noUiSlider.cssClasses;
    this.cssClasses.target += ' range-slider__target';
    this.cssClasses.handle += ' range-slider__handle';
    this.cssClasses.connect += ' range-slider__connect';
    this.cssClasses.connects += ' range-slider__connects';
    this.cssClasses.origin += ' range-slider__origin';
  }
}

export default RangeSlider;
