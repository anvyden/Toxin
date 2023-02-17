class Menu {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this._getSelectors();
    this._findDOMElements();
    this._bindItemListeners();
    this._bindDocumentListener();
  }

  _getSelectors() {
    this.arrowSelector = '.js-menu__item-arrow';
    this.subMenuSelector = '.js-menu__sub-menu';

    this.arrowRotateModifier = 'menu__item-arrow--rotated';
    this.subMenuVisibleModifier = 'menu__sub-menu--visible';

    this.linkDataType = 'link';
    this.arrowDataType = 'arrow';
    this.itemDataType = 'item';
  }

  _findDOMElements() {
    this.arrow = this.root.querySelector(this.arrowSelector);
    this.subMenu = this.root.querySelector(this.subMenuSelector);
  }

  _bindItemListeners() {
    this.root.addEventListener(
      'pointerdown',
      this._handleItemPointerDown.bind(this),
    );
    this.root.addEventListener('keydown', this._handleItemKeyDown.bind(this));
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

  _handleItemPointerDown(event) {
    const { target } = event;
    const isItem = target.dataset.type === this.itemDataType
      || target.dataset.type === this.linkDataType
      || target.dataset.type === this.arrowDataType;

    if (isItem) {
      this._toggleSubMenu();
      this._rotateArrow();
    }

    this.subMenu.classList.contains(this.subMenuVisibleModifier)
      ? this._addDocumentListener()
      : this._removeDocumentListener();
  }

  _handleItemKeyDown(event) {
    const { code } = event;

    if (code === 'Space') {
      event.preventDefault();
      this._toggleSubMenu();
      this._rotateArrow();
    }

    if (code === 'Escape') {
      event.preventDefault();
      this._closeSubMenu();
    }

    this.subMenu.classList.contains(this.subMenuVisibleModifier)
      ? this._addDocumentListener()
      : this._removeDocumentListener();
  }

  _handleDocumentPointerDown(event) {
    const { target } = event;

    if (!this.root.contains(target)) {
      this._closeSubMenu();
      this._removeDocumentListener();
    }
  }

  _rotateArrow() {
    this.arrow.classList.toggle(this.arrowRotateModifier);
  }

  _toggleSubMenu() {
    this.subMenu.classList.toggle(this.subMenuVisibleModifier);
  }

  _closeSubMenu() {
    this.subMenu.classList.remove(this.subMenuVisibleModifier);
    this.arrow.classList.remove(this.arrowRotateModifier);
  }
}

export default Menu;
