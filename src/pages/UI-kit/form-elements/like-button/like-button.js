import * as $ from 'jquery'

function toggleLikeBtn() {

    // Присваиваю id картинкам
    let idValue = 1;
    $('.js-like-button__img').each(function(){
      $(this).attr('id', `likeImg-${idValue}`);
      idValue++;
    })

    // Toggle class active
    const likeBtns = document.querySelectorAll('.js-like-button__button')

    likeBtns.forEach(likeBtn => {
    likeBtn.addEventListener('click', event => {

      let currentTarget = event.currentTarget;
      let imgId = $(currentTarget).children('img').attr('id');
      let likeCounter = $(currentTarget).children('span').html();

      $(currentTarget).toggleClass('like-button__button--active');

      if ($(currentTarget).hasClass('like-button__button--active')){
        likeCounter++;

        $(`#${imgId}`).attr('src', 'assets/img/like-button-enabled.svg');
        $(currentTarget).children('span').html(likeCounter);
      } else {
        likeCounter--;

        $(`#${imgId}`).attr('src', 'assets/img/like-button-disabled.svg');
        $(currentTarget).children('span').html(likeCounter);
      }
    })
  })
}

export {toggleLikeBtn}