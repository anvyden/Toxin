import StarRating from './StarRating';
import './star-rating.scss';

const starRatings = document.querySelectorAll('.js-star-rating');
starRatings.forEach((starRating) => new StarRating(starRating));
