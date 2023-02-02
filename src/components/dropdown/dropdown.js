import declination from './utils/declination';

class Dropdown {
  constructor(dropdown) {
    this.dropdown = dropdown;
    const { props } = this.dropdown.dataset;

    try {
      this.props = JSON.parse(props);
    } catch (error) {
      throw new Error('failed to get props for Dropdown class', error);
    }

    this._init();
  }

  _init() {
    this._getSelector();
    this._findDOMElements();
    this._setDataIndexItems();
    this._validateItems();
    this._bindEventListeners();
  }

  _getSelector() {
    this.inputSelector = '.js-dropdown__input';
    this.arrowButtonSelector = '.js-dropdown__arrow-button';
    this.itemSelector = '.js-dropdown__item';
    this.clearButtonSelector = '.js-dropdown__button--clear';
    this.decrementSelector = '.js-dropdown__item-button--type-decrement';
    this.incrementSelector = '.js-dropdown__item-button--type-increment';
    this.counterSelector = '.js-dropdown__item-counter';

    this.dropdownOpenModifier = 'dropdown--opened';
    this.buttonHiddenModifier = 'button--hidden';
    this.arrowButtonRotateModifier = 'dropdown__arrow-button--rotated';

    this.inputDataType = 'input';
    this.arrowButtonDataType = 'arrow';
    this.incrementDataType = 'increment';
    this.decrementDataType = 'decrement';
    this.clearButtonDataType = 'clear';
    this.applyButtonDataType = 'apply';
  }

  _findDOMElements() {
    this.input = this.dropdown.querySelector(this.inputSelector);
    this.arrowButton = this.dropdown.querySelector(this.arrowButtonSelector);
    this.items = this.dropdown.querySelectorAll(this.itemSelector);
    this.clearButton =
      this.dropdown.querySelector(this.clearButtonSelector) || '';

    this.itemsData = [...this.items].map((item) => ({
      decrement: item.querySelector(this.decrementSelector),
      counter: item.querySelector(this.counterSelector),
      increment: item.querySelector(this.incrementSelector),
      id: item.dataset.id,
    }));
  }

  _setDataIndexItems() {
    this.items.forEach((item, i) => {
      this.item = item;
      this.item.dataset.index = i;
    });
  }

  _validateItems() {
    const { maxLengthItems } = this.props;


    this.itemsData.forEach((item, index) => {
      const itemMaxLength = maxLengthItems[index];
      this.itemData = item;

      if (Number(item.counter.textContent) <= 0) {
        this.itemData.counter.textContent = 0;
        this._setItemButtonDisabled(item.decrement);
      }

      if (Number(item.counter.textContent) >= itemMaxLength) {
        this.itemData.counter.textContent = itemMaxLength;
        this._setItemButtonDisabled(item.increment);
      }

      if (this.isOpen) {
        this._turnArrowUp();
      }
    });

    this._checkClearButton();
    this._setInputValue();
  }

  _bindEventListeners() {
    this.dropdown.addEventListener(
      'pointerdown',
      this._handleDropdownPointerDown.bind(this)
    );
    this.dropdown.addEventListener(
      'keydown',
      this._handleDropdownKeyDown.bind(this)
    );
    document.addEventListener(
      'pointerdown',
      this._handleDocumentPointerDown.bind(this)
    );
  }

  _handleDropdownPointerDown({ target }) {
    const { type } = target.dataset;

    if (type === this.inputDataType) this._toggle();
    if (type === this.arrowButtonDataType) this._toggle();
    if (type === this.incrementDataType) this._increment(target);
    if (type === this.decrementDataType) this._decrement(target);
    if (type === this.clearButtonDataType) this._clear();
    if (type === this.applyButtonDataType) this._close();
  }

  _handleDropdownKeyDown(event) {
    const { code, target } = event;
    const { type } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === this.inputDataType) this._toggle();
      if (type === this.arrowButtonDataType) this._toggle();
      if (type === this.incrementDataType) this._increment(target);
      if (type === this.decrementDataType) this._decrement(target);
      if (type === this.clearButtonDataType) this._clear();
      if (type === this.applyButtonDataType) this._close();
    }
  }

  _handleDocumentPointerDown(event) {
    if (!this._isPointerDownOnDropdown(event)) this._close();
  }

  _isPointerDownOnDropdown({ target }) {
    return this.dropdown.contains(target);
  }

  _countTotal() {
    return this.itemsData.reduce((acc, item) => {
      const value = Number(item.counter.textContent);
      return value + acc;
    }, 0);
  }

  _increment(target) {
    const { parentNode } = target;
    const { maxLengthItems } = this.props;

    const counter = parentNode.querySelector(this.counterSelector);
    const increment = parentNode.querySelector(this.incrementSelector);
    const decrement = parentNode.querySelector(this.decrementSelector);
    const item = target.closest(this.itemSelector);

    const currentValue = Number(counter.textContent);
    const newValue = currentValue + 1;

    if (currentValue < maxLengthItems[item.dataset.index]) {
      counter.textContent = newValue;
    }

    if (newValue === maxLengthItems[item.dataset.index]) {
      this._setItemButtonDisabled(increment);
    }

    if (newValue > 0) {
      this._setItemButtonActive(decrement);
      this._checkClearButton();
    }

    this._setInputValue();
  }

  _decrement(target) {
    const { parentNode } = target;
    const { maxLengthItems } = this.props;

    const counter = parentNode.querySelector(this.counterSelector);
    const increment = parentNode.querySelector(this.incrementSelector);
    const decrement = parentNode.querySelector(this.decrementSelector);
    const item = target.closest(this.itemSelector);

    const currentValue = Number(counter.textContent);
    const newValue = currentValue - 1;

    if (currentValue >= 1) {
      counter.textContent = newValue;
    }

    if (newValue === 0) {
      this._setItemButtonDisabled(decrement);
      this._checkClearButton();
    }

    if (newValue < maxLengthItems[item.dataset.index]) {
      this._setItemButtonActive(increment);
    }

    this._setInputValue();
  }

  _setItemButtonDisabled(button) {
    this.itemButton = button;
    this.itemButton.disabled = true;
  }

  _setItemButtonActive(button) {
    this.itemButton = button;
    this.itemButton.disabled = false;
  }

  _clear() {
    this.itemsData.forEach((item) => {
      this.itemData = item;
      this.itemData.counter.textContent = 0;
      this._setItemButtonDisabled(item.decrement);
      this._setItemButtonActive(item.increment);
    });

    this.input.value = '';
    this._checkClearButton();
  }

  _checkClearButton() {
    if (this.clearButton) {
      const total = this._countTotal();

      total === 0
        ? this.clearButton.classList.add(this.buttonHiddenModifier)
        : this.clearButton.classList.remove(this.buttonHiddenModifier);
    }
  }

  _setInputValue() {
    const { plurals, type } = this.props;
    const value = [];

    if (type === 'comfort') {
      this.itemsData.forEach((item) => {
        const count = Number(item.counter.textContent);

        if (count === 0) return;

        const text = declination(count, plurals[item.id]);
        const itemValue = `${count} ${text}`;

        value.push(itemValue);
      });
    }

    if (type === 'guests') {
      const total = this._countTotal();
      const totalText = declination(total, plurals.guests);
      const totalValue = `${total} ${totalText}`;

      const babiesItem = this.itemsData.find((item) => item.id === 'babies');
      const babiesCount = Number(babiesItem.counter.textContent);
      const babiesText = declination(babiesCount, plurals.babies);
      const babiesValue = `${babiesCount} ${babiesText}`;

      if (total !== 0) value.push(totalValue);
      if (babiesCount !== 0) value.push(babiesValue);
    }

    this.input.value = value.join(', ');
  }

  get isOpen() {
    return this.dropdown.classList.contains(this.dropdownOpenModifier);
  }

  _toggle() {
    if (this.isOpen) {
      this._close();
    } else {
      this._open();
    }
  }

  _open() {
    this.dropdown.classList.add(this.dropdownOpenModifier);
    this._turnArrowUp();
  }

  _close() {
    this.dropdown.classList.remove(this.dropdownOpenModifier);
    this._turnArrowDown();
  }

  _turnArrowUp() {
    this.arrowButton.classList.add(this.arrowButtonRotateModifier);
  }

  _turnArrowDown() {
    this.arrowButton.classList.remove(this.arrowButtonRotateModifier);
  }
}

export default Dropdown;
