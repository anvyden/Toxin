class Menu {
  constructor(root) {
    this.root = root;
    this._init();
  }

  _init() {
    this.arrow = this.root.querySelector('.js-menu__item-arrow');
    this.subMenu = this.root.querySelector('.js-menu__sub-menu');
    this._bindItemListeners();
    this._bindDocumentListener();
  }

  _bindItemListeners() {
    this.root.addEventListener(
      'pointerdown',
      this._handleItemPointerDown.bind(this),
    );
    this.root.addEventListener('keydown', this._handleItemKeyDown.bind(this));
  }

  _bindDocumentListener() {
    this.handleDocumentPoinerDown = this._handleDocumentPoinerDown.bind(this);
  }

  _addDocumentListener() {
    document.addEventListener('pointerdown', this.handleDocumentPoinerDown);
  }

  _removeDocumentListener() {
    document.removeEventListener('pointerdown', this.handleDocumentPoinerDown);
  }

  _handleItemPointerDown(event) {
    const { target } = event;
    const isItem = target.dataset.type === 'item' || target.dataset.type === 'link' || target.dataset.type === 'arrow';

    if (isItem) {
      this._toggleSubMenu();
      this._rotateArrow();
    }

    this.subMenu.classList.contains('menu__sub-menu--visible')
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

    this.subMenu.classList.contains('menu__sub-menu--visible')
      ? this._addDocumentListener()
      : this._removeDocumentListener();
  }

  _handleDocumentPoinerDown(event) {
    const { target } = event;

    if (!this.root.contains(target)) {
      this._closeSubMenu();
      this._removeDocumentListener();
    }
  }

  _rotateArrow() {
    this.arrow.classList.toggle('menu__item-arrow--rotate');
  }

  _toggleSubMenu() {
    this.subMenu.classList.toggle('menu__sub-menu--visible');
  }

  _closeSubMenu() {
    this.subMenu.classList.remove('menu__sub-menu--visible');
    this.arrow.classList.remove('menu__item-arrow--rotate');
  }
}

export default Menu;
