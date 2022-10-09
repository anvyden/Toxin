import '~/components/text';

import RangeSlider from './range-slider';
import './range-slider.scss';

const sliders = document.querySelectorAll('.js-range-slider');
sliders.forEach((slider) => new RangeSlider(slider));
