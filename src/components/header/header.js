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

    this.menu.classList.contains('header__burger-menu-wrapper--visible')
      ? this._addDocumentListener()
      : this._removeDocumentListener();
  }

  _handleButtonKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();
      this._toggle();

      this.menu.classList.contains('header__burger-menu-wrapper--visible')
        ? this._addDocumentListener()
        : this._removeDocumentListener();
    }
  }

  _addDocumentListener() {
    document.addEventListener(
      'pointerdown',
      this._handleDocumentPointerDown.bind(this),
    );
  }

  _removeDocumentListener() {
    document.removeEventListener(
      'pointerdown',
      this._handleDocumentPointerDown.bind(this),
    );
  }

  _handleDocumentPointerDown(event) {
    const { target } = event;

    if (!this.root.contains(target)) {
      this._close();
    }
  }

  _close() {
    this.button.classList.remove('header__burger-button--active');
    this.menu.classList.remove('header__burger-menu-wrapper--visible');
  }

  _toggle() {
    this.button.classList.toggle('header__burger-button--active');
    this.menu.classList.toggle('header__burger-menu-wrapper--visible');
  }
}

export default Header;
