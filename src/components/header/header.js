class Header {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._getSelectors();
    this._findElements();
    this._bindEventsListeners();
  }

  _getSelectors() {
    this.burgerMenuWrapperSelector = '.js-header__burger-menu-wrapper';
    this.burgerButtonSelector = '.js-header__burger-button';

    this.burgerMenuWrapperVisibleModifier =
      'header__burger-menu-wrapper--visible';
    this.burgerButtonActiveModifier = 'header__burger-button--active';
  }

  _findElements() {
    this.menu = this.root.querySelector(this.burgerMenuWrapperSelector);
    this.button = this.root.querySelector(this.burgerButtonSelector);
  }

  _bindEventsListeners() {
    this.button.addEventListener(
      'pointerdown',
      this._handleButtonPointerDown.bind(this)
    );
    this.button.addEventListener(
      'keydown',
      this._handleButtonKeyDown.bind(this)
    );
  }

  _handleButtonPointerDown() {
    this._toggle();

    this.menu.classList.contains(this.burgerMenuWrapperVisibleModifier)
      ? this._addDocumentListener()
      : this._removeDocumentListener();
  }

  _handleButtonKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();
      this._toggle();

      this.menu.classList.contains(this.burgerMenuWrapperVisibleModifier)
        ? this._addDocumentListener()
        : this._removeDocumentListener();
    }
  }

  _addDocumentListener() {
    document.addEventListener(
      'pointerdown',
      this._handleDocumentPointerDown.bind(this)
    );
  }

  _removeDocumentListener() {
    document.removeEventListener(
      'pointerdown',
      this._handleDocumentPointerDown.bind(this)
    );
  }

  _handleDocumentPointerDown(event) {
    const { target } = event;

    if (!this.root.contains(target)) {
      this._close();
    }
  }

  _close() {
    this.button.classList.remove(this.burgerButtonActiveModifier);
    this.menu.classList.remove(this.burgerMenuWrapperVisibleModifier);
  }

  _toggle() {
    this.button.classList.toggle(this.burgerButtonActiveModifier);
    this.menu.classList.toggle(this.burgerMenuWrapperVisibleModifier);
  }
}

export default Header;
