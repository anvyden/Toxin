class StarRating {
  constructor(starRating) {
    this.starRating = starRating;
    this._init();
  }

  _init() {
    this._getSelector();
    this._findDOMElements();
    this._setup();
    this._render(this.rating);
    this._bindEventListeners();
  }

  _getSelector() {
    this.starSelector = '.js-star-rating__star';
    this.starFillModifier = 'star-rating__star--fill';
    this.starEmptyModifier = 'star-rating__star--empty';
  }

  _findDOMElements() {
    this.stars = this.starRating.querySelectorAll(this.starSelector);
  }

  _setup() {
    this.rating = this.starRating.dataset.rating;
  }

  _bindEventListeners() {
    this.starRating.addEventListener(
      'pointerdown',
      this._handlePointerDown.bind(this)
    );
    this.starRating.addEventListener('keydown', this._handleKeyDown.bind(this));

    this.stars.forEach((star) => {
      star.addEventListener('mouseover', this._handleMouseOver.bind(this));
      star.addEventListener('mouseout', this._handleMouseOut.bind(this));
      star.addEventListener('focus', this._handleFocus.bind(this));
      star.addEventListener('blur', this._handleBlur.bind(this));
    });
  }

  _handlePointerDown({ target }) {
    const { value } = target.dataset;

    this.rating = value;
    if (value) this._render(this.rating);
  }

  _handleKeyDown(event) {
    const { code, target } = event;
    const { value } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      this.rating = value;
      if (value) this._render(this.rating);
    }
  }

  _handleMouseOver({ target }) {
    const { value } = target.dataset;

    if (value) this._render(value);
  }

  _handleMouseOut() {
    this._render(this.rating);
  }

  _handleFocus({ target }) {
    const { value } = target.dataset;

    if (value) this._render(value);
  }

  _handleBlur() {
    this._render(this.rating);
  }

  _render(rating) {
    this.stars.forEach((star) => {
      if (star.dataset.value <= rating) {
        star.classList.remove(this.starEmptyModifier);
        star.classList.add(this.starFillModifier);
      } else {
        star.classList.remove(this.starFillModifier);
        star.classList.add(this.starEmptyModifier);
      }
    });
  }
}

export default StarRating;
