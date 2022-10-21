import AirDatepicker from 'air-datepicker';

import BookingCard from '~/components/booking-card/booking-card';

import './air-datepicker.scss';

class Datepicker {
  constructor(root) {
    this.root = root;
    const { props } = this.root.dataset;

    try {
      this.props = JSON.parse(props);
    } catch (error) {
      throw new Error('failed to get props for Datepicker class', error);
    }

    this._init();
  }

  _init() {
    const { initialDates, inline = false, size = '' } = this.props;

    this._getSelector();
    this._findDOMElements();
    this._setup();

    this.datepicker = new AirDatepicker(this.root, this.params);

    this.container = this.datepicker.$datepicker;
    this.buttons = this.container.querySelector('.air-datepicker--buttons');
    this.clearButton = this.buttons.querySelector('[data-type="clear"]');

    if (!inline) this.container.classList.remove('-inline-');
    if (size === 'small') this._createSmallDatepicker();

    this.root.addEventListener(
      'pointerdown',
      this._handleDateDropdownClick.bind(this)
    );
    this.root.addEventListener(
      'keydown',
      this._handleDateDropdownKeyDown.bind(this)
    );
    this._bindDocumentListener();

    if (initialDates) this._setInitialDates(initialDates);
  }

  _setup() {
    const { hasTwoInputs } = this.props;

    this.params = {
      dateFormat: 'dd MMM',
      range: true,
      multipleDatesSeparator: ' - ',
      buttons: this._createButtons(),
      navTitles: {
        days: 'MMMM yyyy',
      },
      onSelect: this._onSelect.bind(this),
      onChangeView: this._onChangeView.bind(this),
      prevHtml:
        '<span class="material-icons air-datepicker-arrow">arrow_back</span>',
      nextHtml:
        '<span class="material-icons air-datepicker-arrow">arrow_forward</span>',
    };

    if (!hasTwoInputs) {
      this.params = {
        ...this.params,
        multipleDatesSeparator: ' - ',
      };
    }

    if (hasTwoInputs) {
      this.params = {
        ...this.params,
        position: 'bottom left',
        dateFormat: 'dd.MM.yyyy',
      };
    }
  }

  _getSelector() {
    this.startInputDataType = 'date-dropdown-start';
    this.endInputDataType = 'date-dropdown-end';
    this.singleInputDataType = 'filter-date-dropdown';
    this.arrowButtonsDataType = 'arrow';
    this.acceptButtonDataType = 'apply';
    this.clearButtonDataType = 'clear';

    this.startInputSelector = `[data-type="${this.startInputDataType}"]`;
    this.endInputSelector = `[data-type="${this.endInputDataType}"]`;
    this.singleInputSelector = `[data-type="${this.singleInputDataType}"]`;
    this.arrowButtonsSelector = `[data-type="${this.arrowButtonsDataType}"]`;

    this.datepickerActiveClass = '-active-';
    this.arrowButtonRotateModifier = 'text-field__arrow-button--rotate';
    this.datepickerButtonHiddenModifier = 'air-datepicker-button--hidden';
    this.datepickerSizeSmallModifier = 'air-datepicker--size-small';
  }

  _findDOMElements() {
    const { hasTwoInputs } = this.props;

    if (hasTwoInputs) {
      this.startInput = this.root.querySelector(this.startInputSelector);
      this.endInput = this.root.querySelector(this.endInputSelector);
    } else {
      this.filterDateDropdown = this.root.querySelector(
        this.singleInputSelector
      );
    }

    this.arrowButtons = this.root.querySelectorAll(this.arrowButtonsSelector);
  }

  _createButtons() {
    this.acceptButton = {
      content: 'Применить',
      attrs: {
        type: 'button',
        tabindex: '-1',
        'data-type': this.acceptButtonDataType,
      },
      onClick: () => {
        this._close();
      },
    };

    this.clearButton = {
      content: 'Очистить',
      className: this.datepickerButtonHiddenModifier,
      attrs: {
        type: 'button',
        tabindex: '-1',
        'data-type': this.clearButtonDataType,
      },
      onClick: (datepicker) => {
        datepicker.clear();
      },
    };

    return [this.clearButton, this.acceptButton];
  }

  _onSelect({ formattedDate }) {
    const { hasTwoInputs, bookingCardParams } = this.props;
    const [startDate = '', endDate = ''] = formattedDate;

    if (formattedDate.length) {
      this._showClearButton();
    } else {
      this._hideClearButton();
    }

    if (hasTwoInputs) {
      this.startInput.value = startDate;
      this.endInput.value = endDate;
    }

    if (this.filterDateDropdown) {
      this.filterDateDropdown.value = formattedDate.join(' - ');
    }

    if (bookingCardParams) {
      const oneDay = 1000 * 60 * 60 * 24;
      const parsedStartDate = Date.parse(endDate.split('.').reverse());
      const parsedEndDate = Date.parse(startDate.split('.').reverse());
      this.days = Math.round((parsedStartDate - parsedEndDate) / oneDay) || 0;
      new BookingCard(bookingCardParams).render(this.days);
    }
  }

  _onChangeView(view) {
    if (view !== 'days') {
      this._hideButtons();
    } else {
      this._showButtons();
    }
  }

  _setInitialDates(dates = []) {
    this.datepicker.selectDate(dates);
    this._showClearButton();
  }

  _handleDateDropdownClick({ target }) {
    const { type } = target.dataset;

    if (type === this.startInputDataType) this._toggle();
    if (type === this.endInputDataType) this._toggle();
    if (type === this.singleInputDataType) this._toggle();
    if (type === this.arrowButtonsDataType) this._toggle();
  }

  _handleDateDropdownKeyDown(event) {
    const { code, target } = event;
    const { type } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === this.startInputDataType) this._toggle();
      if (type === this.endInputDataType) this._toggle();
      if (type === this.singleInputDataType) this._toggle();
      if (type === this.arrowButtonsDataType) this._toggle();
    }

    if (code === 'Enter') {
      event.preventDefault();
    }
  }

  _bindDocumentListener() {
    this.handleDocumentPoitnerDown = this._handleDocumentPoitnerDown.bind(this);
  }

  _handleDocumentPoitnerDown(event) {
    if (!this._isPointerDownOnDatepicker(event)) this._close();
  }

  _isPointerDownOnDatepicker({ target }) {
    return this.root.contains(target);
  }

  get isOpen() {
    return this.container.classList.contains(this.datepickerActiveClass);
  }

  _close() {
    this.container.classList.remove(this.datepickerActiveClass);
    this._arrowDown();
    document.removeEventListener('pointerdown', this.handleDocumentPoitnerDown);
  }

  _open() {
    this.container.classList.add(this.datepickerActiveClass);
    this._arrowUp();
    document.addEventListener('pointerdown', this.handleDocumentPoitnerDown);
  }

  _toggle() {
    if (this.isOpen) {
      this._close();
    } else {
      this._open();
    }
  }

  _arrowUp() {
    this.arrowButtons.forEach((arrow) =>
      arrow.classList.add(this.arrowButtonRotateModifier)
    );
  }

  _arrowDown() {
    this.arrowButtons.forEach((arrow) =>
      arrow.classList.remove(this.arrowButtonRotateModifier)
    );
  }

  _showClearButton() {
    this.clearButton.classList.remove(this.datepickerButtonHiddenModifier);
  }

  _hideClearButton() {
    this.clearButton.classList.add(this.datepickerButtonHiddenModifier);
  }

  _showButtons() {
    this.buttons.style.display = 'block';
  }

  _hideButtons() {
    this.buttons.style.display = 'none';
  }

  _createSmallDatepicker() {
    this.container.classList.add(this.datepickerSizeSmallModifier);
  }
}

export default Datepicker;
