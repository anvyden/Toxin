class LikeButton {
  constructor(selector) {
    this.likeButtons = document.querySelectorAll(selector)
    this.like()
  }

  like() {
    this.likeButtons.forEach((item) => {
      this.handleLikeButtonClick(item)
    })
  }

  handleLikeButtonClick(item) {
    this.clickHandler = this.clickHandler.bind(this)
    item.addEventListener('click', this.clickHandler)
  }

  get isActived() {
    return this.target.classList.contains('like-button__button--active')
  }

  clickHandler(event) {
    this.target = event.currentTarget
    this.counter = Number(this.target.value)

    if (this.isActived) {
      this.toggle()
      this.counterDown()
    } else {
      this.toggle()
      this.counterUp()
    }
  }

  toggle() {
    this.target.classList.toggle('like-button__button--active')
  }

  counterUp() {
    this.target.value = this.counter + 1
    this.target.innerHTML = this.counter + 1
  }

  counterDown() {
    this.target.value = this.counter - 1
    this.target.innerHTML = this.counter - 1
  }
}

const like = new LikeButton('.js-like-button')

export default LikeButton
