class CheckboxList {
  constructor(checkbox) {
    this.checkbox = checkbox;
    this._init();
  }

  _init() {
    this._getSelectors();
    this._getElements();
    this._bindEventListeners();
  }

  _getSelectors() {
    this.dropdownSelector = '.js-checkbox-list__dropdown';
    this.listSelector = '.js-checkbox-list__list';
    this.buttonSelector = '.js-checkbox-list__dropdown-button';

    this.listHiddenModifier = 'checkbox-list__list--hidden';
    this.buttonRotateModifier = 'checkbox-list__dropdown-button--rotate';
  }

  _getElements() {
    this.dropdown = this.checkbox.querySelector(this.dropdownSelector);
    this.list = this.checkbox.querySelector(this.listSelector);
    this.button = this.checkbox.querySelector(this.buttonSelector);
  }

  _bindEventListeners() {
    this.dropdown.addEventListener(
      'pointerdown',
      this._pointerDownHandlerCheckboxList.bind(this),
    );
    this.dropdown.addEventListener(
      'keydown',
      this._keyDownHandlerCheckboxList.bind(this),
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
    this.list.classList.toggle(this.listHiddenModifier);
  }

  _buttonToggle() {
    this.button.classList.toggle(this.buttonRotateModifier);
  }
}

export default CheckboxList;
