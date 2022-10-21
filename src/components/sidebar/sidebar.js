class Sidebar {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._getSelectors();
    this._findElements();
    this._bindEventsListeners();
    this._bindDocumentListener();
  }

  _getSelectors() {
    this.buttonSelector = '.js-sidebar__button';

    this.sidebarVisibleModifier = 'sidebar--visible';
  }

  _findElements() {
    this.button = this.root.querySelector(this.buttonSelector);
  }

  _bindEventsListeners() {
    this.button.addEventListener(
      'pointerdown',
      this._handleSidebarPointerDown.bind(this)
    );
    this.button.addEventListener(
      'keydown',
      this._handleSidebarKeyDown.bind(this)
    );
  }

  _handleSidebarPointerDown() {
    this._toggle();

    this.root.classList.contains(this.sidebarVisibleModifier)
      ? this._addDocumentListener()
      : this._removeDocumentListener();
  }

  _handleSidebarKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();
      this._toggle();

      this.root.classList.contains(this.sidebarVisibleModifier)
        ? this._addDocumentListener()
        : this._removeDocumentListener();
    }
  }

  _bindDocumentListener() {
    this.handleDocumentPointerDown = this._handleDocumentPointerDown.bind(this);
  }

  _addDocumentListener() {
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
  }

  _removeDocumentListener() {
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
  }

  _handleDocumentPointerDown(event) {
    const { target } = event;

    if (!this.root.contains(target)) {
      this._close();
      this._removeDocumentListener();
    }
  }

  _close() {
    this.root.classList.remove(this.sidebarVisibleModifier);
  }

  _toggle() {
    this.root.classList.toggle(this.sidebarVisibleModifier);
  }
}

export default Sidebar;
