import AirDatepicker from 'air-datepicker';

import BookingCard from '~/components/booking-card/booking-card';

import './datepicker.scss';

class Datepicker {
  constructor(root) {
    this.root = root;
    const { props } = this.root.dataset;

    try {
      this.props = JSON.parse(props);
      this._init();
    } catch (error) {
      throw new Error('failed to get props for Datepicker class', error);
    }
  }

  _init() {
    const { initialDates, inline = false, size = '' } = this.props;

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

    const params = {
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

    const paramsWithTwoInputs = {
      position: 'bottom left',
      dateFormat: 'dd.MM.yyyy',
      range: true,
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

    this.params = hasTwoInputs ? paramsWithTwoInputs : params;
  }

  _findDOMElements() {
    const { hasTwoInputs } = this.props;

    this.filterDateDropdown = this.root.querySelector(
      '[data-type="filter-date-dropdown"]'
    );
    this.arrowButtons = this.root.querySelectorAll('[data-type="arrow"]');

    if (hasTwoInputs) {
      this.startInput = this.root.querySelector(
        '[data-type="date-dropdown-start"]'
      );
      this.endInput = this.root.querySelector(
        '[data-type="date-dropdown-end"]'
      );
    }
  }

  _createButtons() {
    this.acceptButton = {
      content: 'Применить',
      attrs: {
        type: 'button',
        tabindex: '-1',
        'data-type': 'apply',
      },
      onClick: (datepicker) => {
        datepicker.$datepicker.classList.remove('-active-');
      },
    };

    this.clearButton = {
      content: 'Очистить',
      className: 'air-datepicker-button--hidden',
      attrs: {
        type: 'button',
        tabindex: '-1',
        'data-type': 'clear',
      },
      onClick: (datepicker) => {
        datepicker.clear();
      },
    };

    return [this.clearButton, this.acceptButton];
  }

  _onSelect({ formattedDate }) {
    const { hasTwoInputs, bookingCardParams = undefined } = this.props;
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

    if (bookingCardParams !== undefined) {
      const oneDay = 1000 * 60 * 60 * 24;
      const parsedStartDate = Date.parse(endDate.split('.').reverse());
      const parsedEndDate = Date.parse(startDate.split('.').reverse());
      this.days = Math.round((parsedStartDate - parsedEndDate) / oneDay) || 0;
      new BookingCard(bookingCardParams).render(this.days);
    }
  }

  _onChangeView(view) {
    if (view === 'months' || view === 'years') {
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

    if (type === 'date-dropdown-start') this._toggle();
    if (type === 'date-dropdown-end') this._toggle();
    if (type === 'arrow') this._toggle();
    if (type === 'filter-date-dropdown') this._toggle();
  }

  _handleDateDropdownKeyDown(event) {
    const { code, target } = event;
    const { type } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === 'date-dropdown-start') this._toggle();
      if (type === 'date-dropdown-end') this._toggle();
      if (type === 'arrow') this._toggle();
      if (type === 'filter-date-dropdown') this._toggle();
    }

    if (code === 'Enter') {
      event.preventDefault();
    }
  }

  _bindDocumentListener() {
    this.handleDocumentPoitnerDown = this._handleDocumentPoitnerDown.bind(this);
  }

  _handleDocumentPoitnerDown(event) {
    if (!this._isPoitnerDownOnDatepicker(event)) this._close();
  }

  _isPoitnerDownOnDatepicker({ target }) {
    return target.closest('.js-date-dropdown');
  }

  get isOpen() {
    return this.container.classList.contains('-active-');
  }

  _close() {
    this.container.classList.remove('-active-');
    this._arrowDown();
    document.removeEventListener('pointerdown', this.handleDocumentPoitnerDown);
  }

  _open() {
    this.container.classList.add('-active-');
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
      arrow.classList.add('text-field__arrow-button--rotate')
    );
  }

  _arrowDown() {
    this.arrowButtons.forEach((arrow) =>
      arrow.classList.remove('text-field__arrow-button--rotate')
    );
  }

  _showClearButton() {
    this.clearButton.classList.remove('air-datepicker-button--hidden');
  }

  _hideClearButton() {
    this.clearButton.classList.add('air-datepicker-button--hidden');
  }

  _showButtons() {
    this.buttons.style.display = 'block';
  }

  _hideButtons() {
    this.buttons.style.display = 'none';
  }

  _createSmallDatepicker() {
    this.container.classList.add('air-datepicker--size-small');
  }
}

export default Datepicker;