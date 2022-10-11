import '~/components/text';

import RangeSlider from '~/libs/noUiSlider';
import './range-slider.scss';

const sliders = document.querySelectorAll('.js-range-slider');
sliders.forEach((slider) => new RangeSlider(slider));
