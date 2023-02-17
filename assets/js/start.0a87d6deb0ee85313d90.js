"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[441],{1028:(e,t,n)=>{n(3238),n(5849);function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}const o=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.root=t,this._init()}var t,n,o;return t=e,(n=[{key:"_init",value:function(){this._getSelectors(),this._findDOMElements(),this._bindItemListeners(),this._bindDocumentListener()}},{key:"_getSelectors",value:function(){this.arrowSelector=".js-menu__item-arrow",this.subMenuSelector=".js-menu__sub-menu",this.arrowRotateModifier="menu__item-arrow--rotated",this.subMenuVisibleModifier="menu__sub-menu--visible",this.linkDataType="link",this.arrowDataType="arrow",this.itemDataType="item"}},{key:"_findDOMElements",value:function(){this.arrow=this.root.querySelector(this.arrowSelector),this.subMenu=this.root.querySelector(this.subMenuSelector)}},{key:"_bindItemListeners",value:function(){this.root.addEventListener("pointerdown",this._handleItemPointerDown.bind(this)),this.root.addEventListener("keydown",this._handleItemKeyDown.bind(this))}},{key:"_bindDocumentListener",value:function(){this.handleDocumentPointerDown=this._handleDocumentPointerDown.bind(this)}},{key:"_addDocumentListener",value:function(){document.addEventListener("pointerdown",this.handleDocumentPointerDown)}},{key:"_removeDocumentListener",value:function(){document.removeEventListener("pointerdown",this.handleDocumentPointerDown)}},{key:"_handleItemPointerDown",value:function(e){var t=e.target;(t.dataset.type===this.itemDataType||t.dataset.type===this.linkDataType||t.dataset.type===this.arrowDataType)&&(this._toggleSubMenu(),this._rotateArrow()),this.subMenu.classList.contains(this.subMenuVisibleModifier)?this._addDocumentListener():this._removeDocumentListener()}},{key:"_handleItemKeyDown",value:function(e){var t=e.code;"Space"===t&&(e.preventDefault(),this._toggleSubMenu(),this._rotateArrow()),"Escape"===t&&(e.preventDefault(),this._closeSubMenu()),this.subMenu.classList.contains(this.subMenuVisibleModifier)?this._addDocumentListener():this._removeDocumentListener()}},{key:"_handleDocumentPointerDown",value:function(e){var t=e.target;this.root.contains(t)||(this._closeSubMenu(),this._removeDocumentListener())}},{key:"_rotateArrow",value:function(){this.arrow.classList.toggle(this.arrowRotateModifier)}},{key:"_toggleSubMenu",value:function(){this.subMenu.classList.toggle(this.subMenuVisibleModifier)}},{key:"_closeSubMenu",value:function(){this.subMenu.classList.remove(this.subMenuVisibleModifier),this.arrow.classList.remove(this.arrowRotateModifier)}}])&&i(t.prototype,n),o&&i(t,o),e}();document.querySelectorAll(".js-menu__item").forEach((function(e){return new o(e)}))},3007:(e,t,n)=>{n(1028)}},e=>{e.O(0,[216],(()=>{return t=3007,e(e.s=t);var t}));e.O()}]);