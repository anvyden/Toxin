class LikeButton {
  constructor() {
    this.$el = document.querySelectorAll('.js-like-button__button')
    this.getId()
    this.like()
  }

  // Присваиваю id картинкам
  getId() {
    let idValue = 0

    this.$el.forEach((element) => {
      $(element).children('img').attr('id', `likeImg-${idValue}`)
      idValue += 1
    })
  }

  // Toggle class active
  like() {
    this.$el.forEach((element) => {
      element.addEventListener('click', (event) => {
        const target = event.currentTarget
        const imgId = $(target).children('img').attr('id')
        let likeCounter = +$(target).children('span').html()

        $(target).toggleClass('like-button__button--active')

        if ($(target).hasClass('like-button__button--active')) {
          likeCounter += 1
          $(`#${imgId}`).attr('src', 'assets/img/like-button-enabled.svg')
          $(target).children('span').html(likeCounter)
        } else {
          likeCounter -= 1
          $(`#${imgId}`).attr('src', 'assets/img/like-button-disabled.svg')
          $(target).children('span').html(likeCounter)
        }
      })
    })
  }
}

const like = new LikeButton()

export default LikeButton
