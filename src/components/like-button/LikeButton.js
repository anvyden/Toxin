class LikeButton {
  constructor(button) {
    this.likeButton = button;
    this._init();
  }

  _init() {
    this._getSelectors();
    this._bindEventListeners();
  }

  _getSelectors() {
    this.buttonActiveModifier = 'like-button__button--active';
  }

  _bindEventListeners() {
    this.likeButton.addEventListener(
      'pointerdown',
      this._pointerDownHandlerLikeButton.bind(this),
    );
    this.likeButton.addEventListener(
      'keydown',
      this._keyDownHandlerLikeButton.bind(this),
    );
  }

  get isActive() {
    return this.likeButton.classList.contains(this.buttonActiveModifier);
  }

  _pointerDownHandlerLikeButton() {
    this.counter = Number(this.likeButton.value);

    if (this.isActive) {
      this._toggle();
      this._counterDown();
    } else {
      this._toggle();
      this._counterUp();
    }
  }

  _keyDownHandlerLikeButton(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();
      this.counter = Number(this.likeButton.value);

      if (this.isActive) {
        this._toggle();
        this._counterDown();
      } else {
        this._toggle();
        this._counterUp();
      }
    }
  }

  _toggle() {
    this.likeButton.classList.toggle(this.buttonActiveModifier);
  }

  _counterUp() {
    this.likeButton.value = this.counter + 1;
    this.likeButton.textContent = this.counter + 1;
  }

  _counterDown() {
    this.likeButton.value = this.counter - 1;
    this.likeButton.textContent = this.counter - 1;
  }
}

export default LikeButton;
