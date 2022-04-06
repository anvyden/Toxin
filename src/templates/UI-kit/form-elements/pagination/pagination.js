class Pagination {
  constructor(selector, options) {
    this.pagination = document.querySelector(`${selector}`)
    this.options = options
    this.selector = selector
    this.dataValue = 1
    this._render()
  }

  handlePageButtonClick(item) {
    this.clickHandlerPage = this.clickHandlerPage.bind(this)
    item.addEventListener('click', this.clickHandlerPage)
  }

  clickHandlerPage(event) {
    this.getTargetDataValue(event)
    this._render()
    this.getPage()
    this.addActivePage()
  }

  handleArrowButtonClick(item) {
    this.clickHandlerArrow = this.clickHandlerArrow.bind(this)
    item.addEventListener('click', this.clickHandlerArrow)
  }

  clickHandlerArrow(event) {
    this.getTargetArrowButton(event)
    this.getDataValue()
    if (this.isArrowPrev) {
      if (this.dataValue !== 1) {
        this.dataValue -= 1
      }
      this._render()
      this.getPage()
      this.addActivePage()
    } else if (this.isArrowNext) {
      if (this.dataValue !== this.countOfPages) {
        this.dataValue += 1
      }
      this._render()
      this.getPage()
      this.addActivePage()
    }
  }

  getPage() {
    this.page = document.querySelector(`${this.selector} [data-value="${this.dataValue}"]`)
  }

  addActivePage() {
    this.item = this.page.parentNode
    this.item.classList.add('pagination__item--active')
  }

  getDataValue() {
    this.dataValue = Number(this.page.dataset.value)
  }

  getTargetDataValue(event) {
    this.dataValue = Number(event.target.dataset.value)
  }

  getTargetArrowButton(event) {
    this.arrowButton = event.target
  }

  get isArrowPrev() {
    return this.arrowButton.classList.contains('pagination__arrow-prev')
  }

  get isArrowNext() {
    return this.arrowButton.classList.contains('pagination__arrow-next')
  }

  destroy() {
    this.pagination.innerHTML = ''
    this.pagination.style.display = 'none'
  }

  _setup() {
    const { countOfItems, itemsPerPage } = this.options
    this.countOfPages = Math.ceil(countOfItems / itemsPerPage)
    this.firstPage = 1
  }

  _render() {
    this.pagination.innerHTML = ''
    this._setup()
    this._getTemplate()
    this.pagination.appendChild(this.listTemplate)
    this.pagination.appendChild(this.listInfoTemplate)
  }

  _getTemplate() {
    this.listTemplate = this._getList()
    this.listInfoTemplate = this._getListInfo()
  }

  _getList() {
    this.list = document.createElement('ul')
    this.list.classList.add('pagination__list')
    this._renderItems()
    return this.list
  }

  _getListInfo() {
    const { itemsPerPage } = this.options
    this.listInfo = document.createElement('span')
    this.listInfo.classList.add('pagination__description')
    this.startItem = itemsPerPage * (this.dataValue - 1) + 1
    this.endItem = itemsPerPage * this.dataValue
    this.listInfo.innerHTML = `${this.startItem} – ${this.endItem} из 100+ вариантов аренды`

    return this.listInfo
  }

  _renderItems() {
    if (this.dataValue !== 1) {
      this.list.appendChild(this._getArrowPrev())
    }

    if (this.countOfPages <= 4) {
      for (let i = 1; i <= this.countOfPages; i += 1) {
        this.list.appendChild(this._getItems(i))
      }
    }

    if (this.countOfPages >= 5) {
      this.list.appendChild(this._getItems(this.firstPage))

      if (((this.dataValue - 2) > this.firstPage) && this.dataValue === this.countOfPages) {
        this.list.appendChild(this._getItems('...'))
        this.list.appendChild(this._getItems(this.dataValue - 2))
      } else if ((this.dataValue - 2) > this.firstPage) {
        this.list.appendChild(this._getItems('...'))
      }

      if (this.dataValue > 2) {
        this.list.appendChild(this._getItems(this.dataValue - this.firstPage))
      }

      if ((this.dataValue !== this.firstPage) && (this.dataValue !== this.countOfPages)) {
        this.list.appendChild(this._getItems(this.dataValue))
      }

      if (this.dataValue < (this.countOfPages - this.firstPage)) {
        this.list.appendChild(this._getItems(this.dataValue + this.firstPage))
      }

      if (((this.dataValue + 2) < this.countOfPages) && (this.dataValue === this.firstPage)) {
        this.list.appendChild(this._getItems(this.dataValue + 2))
        this.list.appendChild(this._getItems('...'))
      } else if ((this.dataValue + 2) < this.countOfPages) {
        this.list.appendChild(this._getItems('...'))
      }

      this.list.appendChild(this._getItems(this.countOfPages))
    }

    if (this.dataValue !== this.countOfPages) {
      this.list.appendChild(this._getArrowNext())
    }
  }

  _getItems(value) {
    this.item = document.createElement('li')
    this.item.classList.add('pagination__item')

    this.itemLink = document.createElement('a')
    this.itemLink.classList.add('pagination__item-link')
    this.itemLink.dataset.value = value
    this.itemLink.innerHTML = value

    if (this.dataValue === 1 && value === 1) {
      this.page = this.itemLink
      this.item.classList.add('pagination__item--active')
    }

    if (value === '...') {
      this.item.classList.add('pagination__item--disabled')
    }

    if ((value !== '...') && (value !== this.dataValue)) {
      this.handlePageButtonClick(this.itemLink)
    }

    this.item.appendChild(this.itemLink)

    return this.item
  }

  _getArrowPrev() {
    this._getArrow()
    this.arrowLink = document.createElement('a')
    this.arrowLink.classList.add('pagination__item-link', 'material-icons', 'pagination__arrow-prev')
    this.arrowLink.innerHTML = 'arrow_back'
    this.handleArrowButtonClick(this.arrowLink)
    this.arrow.appendChild(this.arrowLink)

    return this.arrow
  }

  _getArrowNext() {
    this._getArrow()
    this.arrowLink = document.createElement('a')
    this.arrowLink.classList.add('pagination__item-link', 'material-icons', 'pagination__arrow-next')
    this.arrowLink.innerHTML = 'arrow_forward'
    this.handleArrowButtonClick(this.arrowLink)
    this.arrow.appendChild(this.arrowLink)

    return this.arrow
  }

  _getArrow() {
    this.arrow = document.createElement('li')
    this.arrow.classList.add('pagination__item', 'pagination__item--with-arrow')

    return this.arrow
  }
}

export default Pagination
