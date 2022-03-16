class Menu {
  constructor() {
    this.subMenuLists = document.querySelectorAll('.js-sub-menu')
    this.subMenus = []
    this.menuItems = document.querySelectorAll('.js-menu-item')
    this._getSubMenus(this.subMenuLists)
    this.handleSubMenuClick(this.subMenus)
    this.handleMenuItemKeyup(this.menuItems)
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

    this._findSubMenuElements(this.subMenuElements)

    this.subMenuList.classList.toggle('sub-menu--visible')
    this.subMenuArrow.classList.toggle('menu__item-arrow--expanded')

    this._getTargetElemsByFirstClick(currentTarget)

    if (this.currentTarget !== currentTarget) {
      this.currentTargetList.classList.remove('sub-menu--visible')
      this.currentTargetArrow.classList.remove('menu__item-arrow--expanded')
      this.currentTarget = currentTarget
      this.currentTargetList = this.subMenuList
      this.currentTargetArrow = this.subMenuArrow
    }
  }

  handleMenuItemKeyup(menuItems) {
    this.keyupHandlerMenuItem = this.keyupHandlerMenuItem.bind(this)
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('keyup', this.keyupHandlerMenuItem)
    })
  }

  keyupHandlerMenuItem(event) {
    if (event.key === 'Enter') {
      const { target } = event
      const [...itemElements] = target.children

      if (itemElements.find((elem) => elem.classList.contains('menu__item-link-wrapper'))) {
        this._findSubMenuElements(itemElements)
        this.subMenuList.classList.toggle('sub-menu--visible')
        this.subMenuArrow.classList.toggle('menu__item-arrow--expanded')

        this._getTargetElemsByFirstClick(target)

        if (this.currentTarget !== target) {
          this.currentTargetList.classList.remove('sub-menu--visible')
          this.currentTargetArrow.classList.remove('menu__item-arrow--expanded')
          this.currentTarget = target
          this.currentTargetList = this.subMenuList
          this.currentTargetArrow = this.subMenuArrow
        }

        this.subMenuItems = document.querySelectorAll('.js-sub-menu-item')
        this.keyupHandlerSubMenuItem = this.keyupHandlerSubMenuItem.bind(this)

        if (this.subMenuList.classList.contains('sub-menu--visible')) {
          this.subMenuItems.forEach((item) => {
            item.addEventListener('keyup', this.keyupHandlerSubMenuItem)
          })
        } else {
          this.subMenuItems.forEach((item) => {
            item.removeEventListener('keyup', this.keyupHandlerSubMenuItem)
          })
        }
      } else {
        itemElements.forEach((elem) => {
          if (elem.classList.contains('menu__item-link')) {
            this.itemLink = elem
          }
        })

        this.itemLinkHref = this.itemLink.href
        if (this.itemLinkHref) {
          window.location = this.itemLinkHref
        }
      }
    }
  }

  keyupHandlerSubMenuItem(event) {
    if (event.key === 'Enter') {
      const { target } = event
      const [...itemElements] = target.children

      itemElements.forEach((elem) => {
        if (elem.classList.contains('sub-menu__item-link')) {
          this.itemLink = elem
        }
      })

      this.itemLinkHref = this.itemLink.href
      if (this.itemLinkHref) {
        window.location = this.itemLinkHref
      }
    }
  }

  _findSubMenuElements(subMenuElements) {
    subMenuElements.forEach((elem) => {
      if (elem.classList.contains('sub-menu')) {
        this.subMenuList = elem
      } else if (elem.classList.contains('menu__item-link-wrapper')) {
        const items = [...elem.children]
        items.forEach((item) => {
          if (item.classList.contains('menu__item-arrow')) {
            this.subMenuArrow = item
          }
        })
      }
    })
  }

  _getTargetElemsByFirstClick(target) {
    if (this.currentTarget === undefined) {
      this.currentTarget = target
      this.currentTargetList = this.subMenuList
      this.currentTargetArrow = this.subMenuArrow
    }
  }

  _getSubMenus(menus) {
    menus.forEach((item) => {
      this.subMenus.push(item.parentElement)
    })
  }
}

export default Menu
