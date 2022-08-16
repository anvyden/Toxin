import Swiper, { Navigation, Pagination } from 'swiper';

class Slider {
  constructor(selector) {
    this.selector = selector;
    this._init();
  }

  _init() {
    this.slider = new Swiper(this.selector, {
      modules: [Navigation, Pagination],
      autoHeight: true,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      pagination: {
        el: '.swiper-pagination',
        bulletElement: 'div',
        bulletClass: 'slider__pagination-bullet',
        bulletActiveClass: 'slider__pagination-bullet--active',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        hideOnClick: true,
      },
    });
  }
}

export default Slider;
