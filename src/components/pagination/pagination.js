class Pagination {
  constructor(selector, options) {
    this.selector = selector;
    this.options = options;
    this._init();
  }

  destroy() {
    this.pagination.innerHTML = '';
    this.pagination.style.display = 'none';
  }

  getDataValue() {
    return this.dataValue;
  }

  _init() {
    this._findDOMElements();
    this._setup();
    this._render();
  }

  _findDOMElements() {
    this.pagination = document.querySelector(this.selector);
  }

  _setup() {
    const { countOfItems, itemsPerPage } = this.options;
    this.countOfPages = Math.ceil(countOfItems / itemsPerPage);
    this.dataValue = 1;
  }

  _render() {
    this.pagination.innerHTML = '';

    const list = this._createList();
    const listValues = this._getListValues(this.dataValue, this.countOfPages);

    listValues.forEach((value) => {
      if (value === 'arrow_forward' || value === 'arrow_back') {
        const arrow = this._createArrow(value);

        arrow.addEventListener(
          'pointerdown',
          this._handleArrowPointerDown.bind(this)
        );
        arrow.addEventListener('keydown', this._handleArrowKeyDown.bind(this));

        list.appendChild(arrow);
      } else {
        const item = this._createItem(value);

        if (value !== '...') {
          item.addEventListener(
            'pointerdown',
            this._handleItemPointerDown.bind(this)
          );
          item.addEventListener('keydown', this._handleItemKeyDown.bind(this));
        }

        list.appendChild(item);
      }
    });

    const description = this._createDescription();

    this.pagination.appendChild(list);
    this.pagination.appendChild(description);
  }

  _handleItemPointerDown({ target }) {
    this.dataValue = Number(target.dataset.value);
    this._render();
  }

  _handleItemKeyDown(event) {
    const { code, target } = event;

    if (code === 'Space') {
      event.preventDefault();
      this.dataValue = Number(target.dataset.value);
      this._render();
    }
  }

  _handleArrowPointerDown({ target }) {
    const { type } = target.dataset;

    if (type === 'next') this.dataValue += 1;
    if (type === 'prev') this.dataValue -= 1;

    this._render();
  }

  _handleArrowKeyDown(event) {
    const { code, target } = event;
    const { type } = target.dataset;

    if (code === 'Space') {
      event.preventDefault();

      if (type === 'next') this.dataValue += 1;
      if (type === 'prev') this.dataValue -= 1;

      this._render();
    }
  }

  _getListValues(dataValue, countOfPages) {
    const values = [];

    for (let i = 0; i < countOfPages; i++) {
      values.push(i + 1);
    }

    const correctValues = values.map((value) => {
      const isMoreDataValueByTwo =
        countOfPages - (dataValue + 2) > 2 && value > dataValue + 2;
      const isLessDataValueByTwo =
        dataValue - 2 - 1 > 2 && value < dataValue - 2;
      const isDiffersByLessThanTwo =
        dataValue + 2 >= value && value >= dataValue - 2;

      if (value === 1 || value === countOfPages) {
        return value;
      } else if (isMoreDataValueByTwo) {
        return '...';
      } else if (isLessDataValueByTwo) {
        return '...';
      } else if (isDiffersByLessThanTwo) {
        return value;
      } else {
        return value;
      }
    });

    const firstHalf = correctValues.slice(0, dataValue);
    const secondHalf = correctValues.slice(dataValue, countOfPages);

    let filteredValues = [
      ...firstHalf.filter((item, index) => firstHalf.indexOf(item) === index),
      ...secondHalf.filter((item, index) => secondHalf.indexOf(item) === index),
    ];

    if (dataValue !== 1) filteredValues = ['arrow_back', ...filteredValues];
    if (dataValue !== countOfPages)
      filteredValues = [...filteredValues, 'arrow_forward'];

    return filteredValues;
  }

  _createList() {
    const list = document.createElement('ul');
    list.classList.add('pagination__list');

    return list;
  }

  _createItem(value) {
    const item = document.createElement('li');
    item.classList.add('pagination__item');

    if (this.dataValue === value)
      item.classList.add('pagination__item--active');
    if (value === '...') item.classList.add('pagination__item--disabled');

    const link = document.createElement('a');
    link.classList.add('pagination__item-link');
    link.dataset.value = value;
    link.innerHTML = value;

    if (value !== '...') link.tabIndex = 0;

    item.appendChild(link);

    return item;
  }

  _createArrow(value) {
    const arrow = document.createElement('li');
    arrow.classList.add('pagination__item', 'pagination__item--with-arrow');

    const arrowLink = document.createElement('a');
    arrowLink.classList.add('pagination__item-link', 'material-icons');
    arrowLink.textContent = value;
    arrowLink.tabIndex = 0;

    if (value === 'arrow_forward') {
      arrowLink.classList.add(
        ...['pagination__arrow-prev', 'js-pagination__arrow-prev']
      );
      arrowLink.dataset.type = 'next';
    } else {
      arrowLink.classList.add(
        ...['pagination__arrow-next', 'js-pagination__arrow-next']
      );
      arrowLink.dataset.type = 'prev';
    }

    arrow.appendChild(arrowLink);

    return arrow;
  }

  _createDescription() {
    const { itemsPerPage } = this.options;

    const description = document.createElement('span');
    description.classList.add('pagination__description');

    const startItem = itemsPerPage * (this.dataValue - 1) + 1;
    const endItem = itemsPerPage * this.dataValue;
    description.textContent = `${startItem} – ${endItem} из 100+ вариантов аренды`;

    return description;
  }
}

export default Pagination;
