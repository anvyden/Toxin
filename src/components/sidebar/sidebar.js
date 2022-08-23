class sidebar {
  constructor(selector) {
    this.selector = selector
    this._init()
  }

  _init() {
    this._findElements()
  }

  _findElements() {
    this.button = this.selector.querySelector('.js-sidebar__button')
  }

  _handleSidebarPointerDown() {
    this._toggle()
  }

  _toggle() {
    this.button.classList.toggle('content__sidebar--visible')
  }
}