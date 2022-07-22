import declination from './utils/declination';

class Dropdown {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.options = options;
    this._init();
  }

  _init() {
    this._findDOMElements();
    this._checkOptions();
    this._setDataIndexItems();
    this._validateItems();
    this._bindEventListeners();
  }

  _findDOMElements() {
    this.dropdown = document.querySelector(this.selector);
    this.input = this.dropdown.querySelector('.js-dropdown__input');
    this.arrowButton = this.dropdown.querySelector(
      '.js-dropdown__arrow-button',
    );
    this.items = this.dropdown.querySelectorAll('.js-dropdown__item');
    this.clearButton = this.dropdown.querySelector('.js-dropdown__button--clear') || '';

    this.itemsData = [...this.items].map((item) => ({
      decrement: item.querySelector(
        '.js-dropdown__item-button--type-decrement',
      ),
      counter: item.querySelector('.js-dropdown__item-counter'),
      increment: item.querySelector(
        '.js-dropdown__item-button--type-increment',
      ),
      id: item.dataset.id,
    }));
  }

  _checkOptions() {
    const keys = this.getMaxLengthItems
      ? Object.keys(this.getMaxLengthItems)
      : [];

    this.options.maxLengthItems = Object.fromEntries(
      [...this.items].map((item, index) => {
        const key = `item${index}`;
        let value;

        keys.includes(key)
          ? (value = this.options.maxLengthItems[key])
          : (value = 8);

        return [key, value];
      }),
    );
  }

  get getMaxLengthItems() {
    const { maxLengthItems } = this.options;
    return maxLengthItems;
  }

  _setDataIndexItems() {
    this.items.forEach((item, i) => {
      this.item = item;
      this.item.dataset.index = i;
    });
  }

  _validateItems() {
    const maxLengthItems = this.getMaxLengthItems;

    this.itemsData.forEach((item, index) => {
      const itemMaxLength = maxLengthItems[`item${index}`];
      this.itemData = item;

      if (Number(item.counter.textContent) <= 0) {
        this.itemData.counter.textContent = 0;
        this._setItemButtonDisabled(item.decrement);
      }

      if (Number(item.counter.textContent) >= itemMaxLength) {
        this.itemData.counter.textContent = itemMaxLength;
        this._setItemButtonDisabled(item.increment);
      }

      if (this.dropdown.classList.contains('dropdown--opened')) {
        this._turnArrowUp();
      }
    });

    this._checkClearButton();
    this._setInputValue();
  }

  _bindEventListeners() {
    this.dropdown.addEventListener(
      'pointerdown',
      this._handleDropdownPointerDown.bind(this),
    );
    this.dropdown.addEventListener(
      'keydown',
      this._handleDropdownKeyDown.bind(this),
    );
    document.addEventListener(
      'pointerdown',
      this._handleDocumentPointerDown.bind(this),
    );
  }

  _handleDropdownPointerDown({ target }) {
    const { type } = target.dataset;

    if (type === 'input') this._toggle();
    if (type === 'arrow') this._toggle();
    if (type === 'increment') this._increment(target);
    if (type === 'decrement') this._decrement(target);
    if (type === 'clear') this._clear();
    if (type === 'apply') this._close();
  }

  _handleDropdownKeyDown(event) {
    const { code, target } = event;
    const { type } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === 'input') this._toggle();
      if (type === 'arrow') this._toggle();
      if (type === 'increment') this._increment(target);
      if (type === 'decrement') this._decrement(target);
      if (type === 'clear') this._clear();
      if (type === 'apply') this._close();
    }
  }

  _handleDocumentPointerDown(event) {
    if (!event.target.closest('.dropdown')) this._close();
  }

  _countTotal() {
    return this.itemsData.reduce((acc, item) => {
      const value = Number(item.counter.textContent);
      return value + acc;
    }, 0);
  }

  _increment(target) {
    const { parentNode } = target;
    const counter = parentNode.querySelector('.js-dropdown__item-counter');
    const increment = parentNode.querySelector(
      '.js-dropdown__item-button--type-increment',
    );
    const decrement = parentNode.querySelector(
      '.js-dropdown__item-button--type-decrement',
    );

    const maxLengthItems = this.getMaxLengthItems;
    const item = target.closest('.js-dropdown__item');

    const currentValue = Number(counter.textContent);
    const newValue = currentValue + 1;
    counter.textContent = newValue;

    if (newValue === maxLengthItems[`item${item.dataset.index}`]) {
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
    const counter = parentNode.querySelector('.js-dropdown__item-counter');
    const increment = parentNode.querySelector(
      '.js-dropdown__item-button--type-increment',
    );
    const decrement = parentNode.querySelector(
      '.js-dropdown__item-button--type-decrement',
    );

    const maxLengthItems = this.getMaxLengthItems;
    const item = target.closest('.js-dropdown__item');

    const currentValue = Number(counter.textContent);
    const newValue = currentValue - 1;
    counter.textContent = newValue;

    if (newValue === 0) {
      this._setItemButtonDisabled(decrement);
      this._checkClearButton();
    }

    if (newValue < maxLengthItems[`item${item.dataset.index}`]) {
      this._setItemButtonActive(increment);
    }

    this._setInputValue();
  }

  _setItemButtonDisabled(button) {
    this.itemButton = button;
    this.itemButton.disabled = true;
    this.itemButton.classList.add('dropdown__item-button--disabled');
  }

  _setItemButtonActive(button) {
    this.itemButton = button;
    this.itemButton.disabled = false;
    this.itemButton.classList.remove('dropdown__item-button--disabled');
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
        ? this.clearButton.classList.add('button__button--hidden')
        : this.clearButton.classList.remove('button__button--hidden');
    }
  }

  _setInputValue() {
    const { plurals, type } = this.options;
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
    return this.dropdown.classList.contains('dropdown--opened');
  }

  _toggle() {
    if (this.isOpen) {
      this._close();
    } else {
      this._open();
    }
  }

  _open() {
    this.dropdown.classList.add('dropdown--opened');
    this._turnArrowUp();
  }

  _close() {
    this.dropdown.classList.remove('dropdown--opened');
    this._turnArrowDown();
  }

  _turnArrowUp() {
    this.arrowButton.classList.add('dropdown__arrow-button--rotate');
  }

  _turnArrowDown() {
    this.arrowButton.classList.remove('dropdown__arrow-button--rotate');
  }
}

export default Dropdown;
