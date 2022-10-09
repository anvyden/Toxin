import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

class RangeSlider {
  constructor(root) {
    this.root = root;
    const { props } = this.root.dataset;
    
    try {
      this.props = JSON.parse(props);
      this._init();
    } catch (error) {
      throw new Error('failed to get props for RangeSlider class', error)
    }
  }

  _init() {
    const {
      min,
      max,
      step,
      minStartValue,
      maxStartValue,
    } = this.props;

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
    this.slider = this.root.querySelector('.js-range-slider__slider');
    this.sliderValue = this.root.querySelector('.js-range-slider__value');
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
