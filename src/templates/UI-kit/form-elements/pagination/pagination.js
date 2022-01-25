class Pagination {
  constructor(selector, options) {
    this.pagination = document.getElementById(selector)
    this.options = options
    this.selector = selector
    this.dataValue = 1
    this._render()
  }

  _render() {
    this.pagination.innerHTML = ''
    this._setup()
    this._getTemplate()
    this.pagination.appendChild(this.listTemplate)
    this.pagination.appendChild(this.listInfoTemplate)
  }

  _setup() {
    const { countOfItems, itemsPerPage } = this.options
    this.countOfPages = Math.ceil(countOfItems / itemsPerPage)
  }

  _getTemplate() {
    this.listTemplate = this._getList()
    this.listInfoTemplate = this._getListInfo()
  }

  _getList() {
    this.list = document.createElement('ul')
    this.list.classList.add('pagination__list')

    if (this.dataValue !== 1) {
      this.list.appendChild(this._getArrowPrev())
    }
    this._getItems()
    for (let i = 1; i <= this.countOfPages; i += 1) {
      this.list.appendChild(this.items[i])
    }

    if (this.dataValue !== this.countOfPages) {
      this.list.appendChild(this._getArrowNext())
    }

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

  _getItems() {
    this.items = {}
    for (let i = 1; i <= this.countOfPages; i += 1) {
      this.item = document.createElement('li')
      this.item.classList.add('pagination__item')
      this.item.classList.add('text--with-type-h3')

      this.itemLink = document.createElement('a')
      this.itemLink.classList.add('pagination__link')
      this.itemLink.dataset.value = i
      this.itemLink.innerHTML = i

      if (i === 1) {
        this.page = this.itemLink
        this.item.classList.add('pagination__item--active')
      }
      this.handlePageButtonClick(this.itemLink)
      this.item.appendChild(this.itemLink)

      this.items[i] = this.item
    }
  }

  _getArrow() {
    this.arrow = document.createElement('li')
    this.arrow.classList.add('pagination__item')
    this.arrow.classList.add('text--with-type-h3')
    this.arrow.classList.add('pagination__item--with-arrow')

    return this.arrow
  }

  _getArrowPrev() {
    this._getArrow()
    this.arrowLink = document.createElement('a')
    this.arrowLink.classList.add('pagination__link')
    this.arrowLink.classList.add('pagination__arrow-prev')
    this.arrowLink.innerHTML = 'arrow_back'
    this.handleArrowButtonClick(this.arrowLink)
    this.arrow.appendChild(this.arrowLink)

    return this.arrow
  }

  _getArrowNext() {
    this._getArrow()
    this.arrowLink = document.createElement('a')
    this.arrowLink.classList.add('pagination__link')
    this.arrowLink.classList.add('pagination__arrow-next')
    this.arrowLink.innerHTML = 'arrow_forward'
    this.handleArrowButtonClick(this.arrowLink)
    this.arrow.appendChild(this.arrowLink)

    return this.arrow
  }

  handlePageButtonClick(item) {
    this.clickHandlerPage = this.clickHandlerPage.bind(this)
    item.addEventListener('click', this.clickHandlerPage)
  }

  clickHandlerPage(event) {
    this.getTargetDataValue(event)
    this.getPage()
    this.removeActivePage()
    this.addActivePage()
  }

  handleArrowButtonClick(item) {
    this.clickHandlerArrow = this.clickHandlerArrow.bind(this)
    item.addEventListener('click', this.clickHandlerArrow)
  }

  clickHandlerArrow(event) {
    this.getTargetArrowButton(event)
    if (this.isArrowPrev) {
      this.getDataValue()
      if (this.dataValue !== 1) {
        this.dataValue -= 1
      }
      this.getPage()
      this.removeActivePage()
      this.addActivePage()
    } else if (this.isArrowNext) {
      this.getDataValue()
      if (this.dataValue !== this.countOfPages) {
        this.dataValue += 1
      }
      this.getPage()
      this.removeActivePage()
      this.addActivePage()
    }
  }

  getPage() {
    this.page = document.querySelector(`[data-value="${this.dataValue}"]`)
  }

  removeActivePage() {
    this.prevActivePage = document.querySelector(`#${this.selector} .pagination__item--active`)
    this.prevActivePage.classList.remove('pagination__item--active')
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
}

export default Pagination
