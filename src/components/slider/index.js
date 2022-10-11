import Slider from '@libs/swiper';

import './slider.scss';

const sliders = document.querySelectorAll('.js-slider');
sliders.forEach((slider) => new Slider(slider));
