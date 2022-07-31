import { list } from 'postcss'

class Pagination {
  constructor(selector, options) {
    this.selector = selector
    this.options = options
    this._init()
  }

  destroy() {
    this.pagination.innerHTML = ''
    this.pagination.style.display = 'none'
  }

  getDataValue() {
    return this.dataValue
  }

  _init() {
    this._findDOMElements()
    this._setup()
    this._render()
  }

  _findDOMElements() {
    this.pagination = document.querySelector(this.selector)
  }

  _setup() {
    const { countOfItems, itemsPerPage } = this.options
    this.countOfPages = Math.ceil(countOfItems / itemsPerPage)
    this.dataValue = 1
  }

  _render() {
    this.pagination.innerHTML = ''

    const list = this._createList()
    const listValues = this._getListValues(this.dataValue, this.countOfPages)

    listValues.forEach(value => {
      if (value === 'arrow_forward' || value === 'arrow_back') {
        const arrow = this._createArrow(value)

        arrow.addEventListener('pointerdown', this._handleArrowPointerDown.bind(this))
        arrow.addEventListener('keydown', this._handleArrowKeyDown.bind(this))

        list.appendChild(arrow)
      } else {
        const item = this._createItem(value)

        if (value !== '...') {
          item.addEventListener('pointerdown', this._handleItemPointerDown.bind(this))
          item.addEventListener('keydown', this._handleItemKeyDown.bind(this))
        }

        list.appendChild(item)
      }
    })

    const description = this._createDescription()

    this.pagination.appendChild(list)
    this.pagination.appendChild(description)
  }

  _handleItemPointerDown({ target }) {
    this.dataValue = Number(target.dataset.value)
    this._render()
  }

  _handleItemKeyDown(event) {
    const { code, target } = event

    if (code === 'Space') {
      event.preventDefault()
      this.dataValue = Number(target.dataset.value)
      this._render()
    }
  }

  _handleArrowPointerDown({ target }) {
    const { type } = target.dataset

    if (type === 'next') this.dataValue += 1
    if (type === 'prev') this.dataValue -= 1

    this._render()
  }

  _handleArrowKeyDown(event) {
    const { code, target } = event
    const { type } = target.dataset

    if (code === 'Space') {
      event.preventDefault()

      if (type === 'next') this.dataValue += 1
      if (type === 'prev') this.dataValue -= 1

      this._render()
    }
  }

  _getListValues(dataValue, countOfPages) {
    const values = []

    for (let i = 0; i < countOfPages; i++) {
      values.push(i + 1)
    }

    const correctValues = values.map(value => {
      const isMoreDataValueByTwo = ((countOfPages - (dataValue + 2)) > 2) && (value > dataValue + 2)
      const isLessDataValueByTwo = (((dataValue - 2) - 1) > 2) && (value < dataValue - 2)
      const isDiffersByLessThanTwo = dataValue + 2 >= value && value >= dataValue - 2

      if (value === 1 || value === countOfPages) {
        return value
      } else if (isMoreDataValueByTwo) {
        return '...'
      } else if (isLessDataValueByTwo) {
        return '...'
      } else if (isDiffersByLessThanTwo) {
        return value
      } else {
        return value
      }
    })

    const firstHalf = correctValues.slice(0, dataValue)
    const secondHalf = correctValues.slice(dataValue, countOfPages)

    let filteredValues = [
      ...firstHalf.filter((item, index) => firstHalf.indexOf(item) === index),
      ...secondHalf.filter((item, index) => secondHalf.indexOf(item) === index)
    ]

    if (dataValue !== 1) filteredValues = ['arrow_back', ...filteredValues]
    if (dataValue !== countOfPages) filteredValues = [...filteredValues, 'arrow_forward']

    return filteredValues

    // filteredValues.filter((item, index) => filteredValues.indexOf(item) === index)

    // if (countOfPages < 6) {
    //   const filteredValues = values.filter(value => {
    //     (dataValue + 2 >= value) && (value >= dataValue - 2)
    //   })
    //   if (dataValue === 1) return [...filteredValues, '...', countOfPages, 'arrow_forward']
    //   else if (dataValue === countOfPages) return ['arrow_back', 1, '...', ...filteredValues]
    //   else return ['arrow_back', 1, ...values, countOfPages, 'arrow_forward']
    // } else {
    //   if (dataValue === 1) {
    //     const filteredValues = values.filter(value => value <= dataValue + 2)
    //     return [...filteredValues, '...', countOfPages, 'arrow_forward']
    //   }
    //
    //   if (dataValue === countOfPages) {
    //     const filteredValues = values.filter(value => value >= dataValue - 2)
    //     return ['arrow_back', 1, '...', ...filteredValues]
    //   }
    //
    //   if (dataValue <= 4) {
    //     const filteredValues = values.filter(value => value <= dataValue + 1)
    //     return ['arrow_back', ...filteredValues, '...', countOfPages, 'arrow_forward']
    //   }
    //
    //   if (dataValue >= countOfPages - 3) {
    //     const filteredValues = values.filter(value => value >= dataValue - 1)
    //     return ['arrow_back', 1, '...', ...filteredValues, 'arrow_forward']
    //   }
    //   if ((dataValue - 2 !== 1) && (dataValue + 2 !== countOfPages)) {
    //     const filteredValues = values.filter(value => (dataValue + 1 >= value) && (value >= dataValue - 1))
    //     return ['arrow_back', 1, '...', ...filteredValues, '...', countOfPages, 'arrow_forward']
    //   }
    // }

  }

  _createList() {
    const list = document.createElement('ul')
    list.classList.add('pagination__list')

    return list
  }

  _createItem(value) {
    const item = document.createElement('li')
    item.classList.add('pagination__item')

    if (this.dataValue === value) item.classList.add('pagination__item--active')
    if (value === '...') item.classList.add('pagination__item--disabled')

    const link = document.createElement('a')
    link.classList.add('pagination__item-link')
    link.dataset.value = value
    link.innerHTML = value

    if (value !== '...') link.tabIndex = 0

    item.appendChild(link)

    return item
  }

  _createArrow(value) {
    const arrow = document.createElement('li')
    arrow.classList.add('pagination__item', 'pagination__item--with-arrow')

    const arrowLink = document.createElement('a')
    arrowLink.classList.add('pagination__item-link', 'material-icons')
    arrowLink.textContent = value
    arrowLink.tabIndex = 0

    if (value === 'arrow_forward') {
      arrowLink.classList.add(...['pagination__arrow-prev', 'js-pagination__arrow-prev'])
      arrowLink.dataset.type = 'next'
    } else {
      arrowLink.classList.add(...['pagination__arrow-next', 'js-pagination__arrow-next'])
      arrowLink.dataset.type = 'prev'
    }

    arrow.appendChild(arrowLink)

    return arrow
  }

  _createDescription() {
    const { itemsPerPage } = this.options

    const description = document.createElement('span')
    description.classList.add('pagination__description')

    const startItem = itemsPerPage * (this.dataValue - 1) + 1
    const endItem = itemsPerPage * this.dataValue
    description.textContent = `${startItem} – ${endItem} из 100+ вариантов аренды`

    return description
  }

}

// class Pagination {
//   constructor(selector, options) {
//     this.pagination = document.querySelector(`${selector}`)
//     this.options = options
//     this.selector = selector
//     this.dataValue = 1
//     this._render()
//   }
//
//   handlePageButtonClick(item) {
//     this.clickHandlerPage = this.clickHandlerPage.bind(this)
//     item.addEventListener('click', this.clickHandlerPage)
//   }
//
//   clickHandlerPage(event) {
//     this.getTargetDataValue(event)
//     this._render()
//     this.getPage()
//     this.addActivePage()
//   }
//
//   handleArrowButtonClick(item) {
//     this.clickHandlerArrow = this.clickHandlerArrow.bind(this)
//     item.addEventListener('click', this.clickHandlerArrow)
//   }
//
//   clickHandlerArrow(event) {
//     this.getTargetArrowButton(event)
//     this.getDataValue()
//     if (this.isArrowPrev) {
//       if (this.dataValue !== 1) {
//         this.dataValue -= 1
//       }
//       this._render()
//       this.getPage()
//       this.addActivePage()
//     } else if (this.isArrowNext) {
//       if (this.dataValue !== this.countOfPages) {
//         this.dataValue += 1
//       }
//       this._render()
//       this.getPage()
//       this.addActivePage()
//     }
//   }
//
//   getPage() {
//     this.page = document.querySelector(`${this.selector} [data-value="${this.dataValue}"]`)
//   }
//
//   addActivePage() {
//     this.item = this.page.parentNode
//     this.item.classList.add('pagination__item--active')
//   }
//
//   getDataValue() {
//     this.dataValue = Number(this.page.dataset.value)
//   }
//
//   getTargetDataValue(event) {
//     this.dataValue = Number(event.target.dataset.value)
//   }
//
//   getTargetArrowButton(event) {
//     this.arrowButton = event.target
//   }
//
//   get isArrowPrev() {
//     return this.arrowButton.classList.contains('js-pagination__arrow-prev')
//   }
//
//   get isArrowNext() {
//     return this.arrowButton.classList.contains('js-pagination__arrow-next')
//   }
//
//   destroy() {
//     this.pagination.innerHTML = ''
//     this.pagination.style.display = 'none'
//   }
//
//   _setup() {
//     const { countOfItems, itemsPerPage } = this.options
//     this.countOfPages = Math.ceil(countOfItems / itemsPerPage)
//     this.firstPage = 1
//   }
//
//   _render() {
//     this.pagination.innerHTML = ''
//     this._setup()
//     this._getTemplate()
//     this.pagination.appendChild(this.listTemplate)
//     this.pagination.appendChild(this.listInfoTemplate)
//   }
//
//   _getTemplate() {
//     this.listTemplate = this._getList()
//     this.listInfoTemplate = this._getListInfo()
//   }
//
//   _getList() {
//     this.list = document.createElement('ul')
//     this.list.classList.add('pagination__list')
//     this._renderItems()
//     return this.list
//   }
//
//   _getListInfo() {
//     const { itemsPerPage } = this.options
//     this.listInfo = document.createElement('span')
//     this.listInfo.classList.add('pagination__description')
//     this.startItem = itemsPerPage * (this.dataValue - 1) + 1
//     this.endItem = itemsPerPage * this.dataValue
//     this.listInfo.innerHTML = `${this.startItem} – ${this.endItem} из 100+ вариантов аренды`
//
//     return this.listInfo
//   }
//
//   _renderItems() {
//     if (this.dataValue !== 1) {
//       this.list.appendChild(this._getArrowPrev())
//     }
//
//     if (this.countOfPages <= 4) {
//       for (let i = 1; i <= this.countOfPages; i += 1) {
//         this.list.appendChild(this._getItems(i))
//       }
//     }
//
//     if (this.countOfPages >= 5) {
//       this.list.appendChild(this._getItems(this.firstPage))
//
//       if (((this.dataValue - 2) > this.firstPage) && this.dataValue === this.countOfPages) {
//         this.list.appendChild(this._getItems('...'))
//         this.list.appendChild(this._getItems(this.dataValue - 2))
//       } else if ((this.dataValue - 2) > this.firstPage) {
//         this.list.appendChild(this._getItems('...'))
//       }
//
//       if (this.dataValue > 2) {
//         this.list.appendChild(this._getItems(this.dataValue - this.firstPage))
//       }
//
//       if ((this.dataValue !== this.firstPage) && (this.dataValue !== this.countOfPages)) {
//         this.list.appendChild(this._getItems(this.dataValue))
//       }
//
//       if (this.dataValue < (this.countOfPages - this.firstPage)) {
//         this.list.appendChild(this._getItems(this.dataValue + this.firstPage))
//       }
//
//       if (((this.dataValue + 2) < this.countOfPages) && (this.dataValue === this.firstPage)) {
//         this.list.appendChild(this._getItems(this.dataValue + 2))
//         this.list.appendChild(this._getItems('...'))
//       } else if ((this.dataValue + 2) < this.countOfPages) {
//         this.list.appendChild(this._getItems('...'))
//       }
//
//       this.list.appendChild(this._getItems(this.countOfPages))
//     }
//
//     if (this.dataValue !== this.countOfPages) {
//       this.list.appendChild(this._getArrowNext())
//     }
//   }
//
//   _getItems(value) {
//     this.item = document.createElement('li')
//     this.item.classList.add('pagination__item')
//
//     this.itemLink = document.createElement('a')
//     this.itemLink.classList.add('pagination__item-link')
//     this.itemLink.dataset.value = value
//     this.itemLink.innerHTML = value
//
//     if (this.dataValue === 1 && value === 1) {
//       this.page = this.itemLink
//       this.item.classList.add('pagination__item--active')
//     }
//
//     if (value === '...') {
//       this.item.classList.add('pagination__item--disabled')
//     }
//
//     if ((value !== '...') && (value !== this.dataValue)) {
//       this.handlePageButtonClick(this.itemLink)
//     }
//
//     this.item.appendChild(this.itemLink)
//
//     return this.item
//   }
//
//   _getArrowPrev() {
//     this._getArrow()
//     this.arrowLink = document.createElement('a')
//     this.arrowLink.classList.add('pagination__item-link', 'material-icons', 'pagination__arrow-prev', 'js-pagination__arrow-prev')
//     this.arrowLink.innerHTML = 'arrow_back'
//     this.handleArrowButtonClick(this.arrowLink)
//     this.arrow.appendChild(this.arrowLink)
//
//     return this.arrow
//   }
//
//   _getArrowNext() {
//     this._getArrow()
//     this.arrowLink = document.createElement('a')
//     this.arrowLink.classList.add('pagination__item-link', 'material-icons', 'pagination__arrow-next', 'js-pagination__arrow-next')
//     this.arrowLink.innerHTML = 'arrow_forward'
//     this.handleArrowButtonClick(this.arrowLink)
//     this.arrow.appendChild(this.arrowLink)
//
//     return this.arrow
//   }
//
//   _getArrow() {
//     this.arrow = document.createElement('li')
//     this.arrow.classList.add('pagination__item', 'pagination__item--with-arrow')
//
//     return this.arrow
//   }
// }

export default Pagination
