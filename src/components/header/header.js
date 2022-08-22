class Header {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventsListeners();
  }

  _findElements() {
    this.menu = this.root.querySelector('.js-header__burger-menu-wrapper');
    this.button = this.root.querySelector('.js-header__burger-button');
  }

  _bindEventsListeners() {
    this.button.addEventListener(
      'pointerdown',
      this._handleButtonPointerDown.bind(this),
    );
    this.button.addEventListener(
      'keydown',
      this._handleButtonKeyDown.bind(this),
    );
  }

  _handleButtonPointerDown() {
    this._toggle();
  }

  _handleButtonKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();
      this._toggle();
    }
  }

  _toggle() {
    this.button.classList.toggle('header__burger-button--active');
    this.menu.classList.toggle('header__burger-menu-wrapper--visible');
  }
}

export default Header;
