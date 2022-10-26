import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

import './nouislider.scss';

class RangeSlider {
  constructor(root) {
    this.root = root;
    const { props } = this.root.dataset;

    try {
      this.props = JSON.parse(props);
    } catch (error) {
      throw new Error('failed to get props for RangeSlider class', error);
    }

    this._init();
  }

  _init() {
    const {
      min, max, step, minStartValue, maxStartValue,
    } = this.props;

    this._getSelectors();
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

      const onUpdateHandler = (values) => {
        const [first, second] = values;
        this.sliderValue.value = `${first}₽ - ${second}₽`;
      }

      this.slider.noUiSlider.on('update', onUpdateHandler);
    }
  }

  _getSelectors() {
    this.sliderSelector = '.js-range-slider__slider';
    this.sliderValueSelector = '.js-range-slider__value';
  }

  _getElements() {
    this.slider = this.root.querySelector(this.sliderSelector);
    this.sliderValue = this.root.querySelector(this.sliderValueSelector);
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
