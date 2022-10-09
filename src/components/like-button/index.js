import LikeButton from './like-button';
import './like-button.scss';

const likeButtons = document.querySelectorAll('.js-like-button__button');
likeButtons.forEach((button) => new LikeButton(button));
