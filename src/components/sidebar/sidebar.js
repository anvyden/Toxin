class Sidebar {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._findElements();
    this._bindEventsListeners();
  }

  _findElements() {
    this.button = this.root.querySelector('.js-sidebar__button');
  }

  _bindEventsListeners() {
    this.button.addEventListener(
      'pointerdown',
      this._handleSidebarPointerDown.bind(this),
    );
    this.button.addEventListener(
      'keydown',
      this._handleSidebarKeyDown.bind(this),
    );
  }

  _handleSidebarPointerDown() {
    this._toggle();

    this.root.classList.contains('sidebar--visible')
      ? this._addDocumentListener()
      : this._removeDocumentListener();
  }

  _handleSidebarKeyDown(event) {
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

    if (!target.closest('.js-sidebar')) {
      this._close();
    }
  }

  _close() {
    this.root.classList.remove('sidebar--visible');
  }

  _toggle() {
    this.root.classList.toggle('sidebar--visible');
  }
}

export default Sidebar;
