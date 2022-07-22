class CheckboxList {
  constructor(selector) {
    this.selector = selector;
    this._init();
  }

  _init() {
    this._getElements();
    this._bindEventListeners();
  }

  _getElements() {
    this.checkbox = document.querySelector(this.selector);
    this.dropdown = this.checkbox.querySelector('.js-checkbox-list__dropdown');
    this.list = this.checkbox.querySelector('.js-checkbox-list__list');
    this.button = this.checkbox.querySelector('.js-checkbox-list__button');
  }

  _bindEventListeners() {
    this.dropdown.addEventListener(
      'pointerdown',
      this._pointerDownHandlerCheckboxList.bind(this)
    );
    this.dropdown.addEventListener(
      'keydown',
      this._keyDownHandlerCheckboxList.bind(this)
    );
  }

  _keyDownHandlerCheckboxList(event) {
    const { code } = event;
    if (code === 'Space') {
      event.preventDefault();
      this._dropdownToggle();
      this._buttonToggle();
    }
  }

  _pointerDownHandlerCheckboxList() {
    this._dropdownToggle();
    this._buttonToggle();
  }

  _dropdownToggle() {
    this.list.classList.toggle('checkbox-list__list--hidden');
  }

  _buttonToggle() {
    this.button.classList.toggle('checkbox-list__button--rotate');
  }
}

export default CheckboxList;
