import * as $ from 'jquery'
import './like-button-disabled.svg'
import './like-button-enabled.svg'

$(document).ready(function (){


  // give function for like-button image id
  $(function giveLikeBtnsImageId(){
    let idNumber = 1;
    $('.like-button__img').each(function(){
      $(this).attr('id', `likeImg-${idNumber}`);
      idNumber++;
    })
  });
  
  // toggle function for like-buttons через addEventListener
  const likeBtns = document.querySelectorAll('.like-button__button')
  likeBtns.forEach(likeBtn => {
    likeBtn.addEventListener('click', e => {

      let currentTarget = e.currentTarget;
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

  // toggle function for like-buttons через click

  // $(function (){
  //   $('.like').click(function(e){
  //     let likeBtnImageId = $(e.currentTarget).children('img').attr('id');
  //     console.log(e)
  //     console.log(likeBtnImageId)
  //     $(this).toggleClass('like--active');
  //     if ($(this).hasClass('like--active')){
  //       $(`#${likeBtnImageId}`).attr('src', 'assets/img/like-button-enabled.svg')
  //     } else {
  //       $(`#${likeBtnImageId}`).attr('src', 'assets/img/like-button-disabled.svg');
  //     }
  //   })
  // })

});
