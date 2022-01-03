import * as $ from 'jquery'

class LikeButton {

  constructor() {
    this.$el = document.querySelectorAll('.js-like-button__button')
    this.getId()
    this.like()
  }

  // Присваиваю id картинкам
  getId() {

    let idValue = 0

    this.$el.forEach( element => {
      $(element).children('img').attr('id', `likeImg-${idValue}`)
      idValue++
    })
  }

  // Toggle class active
  like() {

    this.$el.forEach( element => {
      element.addEventListener('click', event => {

        let currentTarget = event.currentTarget
        let imgId = $(currentTarget).children('img').attr('id')
        let likeCounter = $(currentTarget).children('span').html()

        $(currentTarget).toggleClass('like-button__button--active')

        if ($(currentTarget).hasClass('like-button__button--active')){
          
          likeCounter++
  
          $(`#${imgId}`).attr('src', 'assets/img/like-button-enabled.svg')
          $(currentTarget).children('span').html(likeCounter)
        
        } else {
          
          likeCounter--
  
          $(`#${imgId}`).attr('src', 'assets/img/like-button-disabled.svg')
          $(currentTarget).children('span').html(likeCounter)

        }
      })
    })
  }
}

const like = new LikeButton()

export default LikeButton