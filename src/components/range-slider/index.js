import '~/components/heading';

import RangeSlider from '~/libs/nouislider';
import './range-slider.scss';

const sliders = document.querySelectorAll('.js-range-slider');
sliders.forEach((slider) => new RangeSlider(slider));
