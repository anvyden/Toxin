import Swiper, { Navigation, Pagination } from 'swiper';

import './swiper.scss';

class Slider {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this.slider = new Swiper(this.root, {
      modules: [Navigation, Pagination],
      pagination: {
        el: '.swiper-pagination',
        bulletElement: 'div',
        bulletClass: 'slider__pagination-bullet',
        bulletActiveClass: 'slider__pagination-bullet--active',
        clickable: true,
      },
      navigation: {
        disabledClass: 'slider__button--disabled',
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      },
    });
  }
}

export default Slider;
