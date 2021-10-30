import * as $ from 'jquery'
import './like-button-disabled.svg'
import './like-button-enabled.svg'

$(function (){
  var likeToggleCounter = 0;
  $('button[name="like"]').click(function(){
    if (likeToggleCounter == 0) {
      $('.like__img').attr('src', 'assets/img/like-button-enabled.svg')
      $(this).toggleClass('like--active');
      likeToggleCounter = 1;
    } else {
      $('.like__img').attr('src', 'assets/img/like-button-disabled.svg');
      $(this).toggleClass('like--active');
      likeToggleCounter = 0;
    }
  });
});

$(function (){
  var likeToggleCounter = 0;
  $('button[name="likeEnabled"]').click(function(){
    if (likeToggleCounter == 0) {
      $('.like__img').attr('src', 'assets/img/like-button-enabled.svg')
      $(this).toggleClass('like--active');
      likeToggleCounter = 1;
    } else {
      $('.like__img').attr('src', 'assets/img/like-button-disabled.svg');
      $(this).toggleClass('like--active');
      likeToggleCounter = 0;
    }
  });
});