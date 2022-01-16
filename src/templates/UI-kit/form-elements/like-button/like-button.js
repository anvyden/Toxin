class LikeButton {
  constructor() {
    this.$el = document.querySelectorAll('.js-like-button')
    this.like()
  }

  like() {
    this.$el.forEach((element) => {
      element.addEventListener('click', (event) => {
        const target = event.currentTarget
        let likeCounter = +$(target).html()
        $(target).toggleClass('like-button__button--active')

        if ($(target).hasClass('like-button__button--active')) {
          likeCounter += 1
          $(target).html(likeCounter)
        } else {
          likeCounter -= 1
          $(target).html(likeCounter)
        }
      })
    })
  }
}

const like = new LikeButton()

export default LikeButton
