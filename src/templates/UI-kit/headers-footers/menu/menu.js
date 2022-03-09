class Menu {
  constructor() {
    this.subMenuLists = document.querySelectorAll('.sub-menu-list')
    this.subMenus = []
    this._getSubMenus()
    this.handleSubMenuClick(this.subMenus)
  }

  handleSubMenuClick(subMenus) {
    this.clickHandlerSubMenu = this.clickHandlerSubMenu.bind(this)
    subMenus.forEach((subMenu) => {
      subMenu.addEventListener('click', this.clickHandlerSubMenu)
    })
  }

  clickHandlerSubMenu(event) {
    const { currentTarget } = event
    this.subMenuElements = [...currentTarget.children]

    this.subMenuElements.forEach((elem) => {
      if (elem.classList.contains('sub-menu-list')) {
        this.subMenuList = elem
      } else if (elem.classList.contains('menu-list__link-wrapper')) {
        const items = [...elem.children]
        items.forEach((item) => {
          if (item.classList.contains('menu-list__arrow')) {
            this.subMenuArrow = item
          }
        })
      }
    })

    if (currentTarget.classList.contains('menu-list__item--clicked')) {
      currentTarget.classList.remove('menu-list__item--clicked')
      this.subMenuList.classList.remove('sub-menu-list--visible')
      this.subMenuArrow.classList.remove('menu-list__arrow--expanded')
    } else {
      currentTarget.classList.add('menu-list__item--clicked')
      this.subMenuList.classList.add('sub-menu-list--visible')
      this.subMenuArrow.classList.add('menu-list__arrow--expanded')
    }
  }

  _getSubMenus() {
    this.subMenuLists.forEach((item) => {
      this.subMenus.push(item.parentElement)
    })
  }
}

export default Menu
