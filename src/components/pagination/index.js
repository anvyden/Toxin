import Pagination from './pagination';
import './pagination.scss';

const paginations = document.querySelectorAll('.js-pagination');
paginations.forEach((pagination) => new Pagination(pagination));
