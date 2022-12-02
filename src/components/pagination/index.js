import Pagination from './Pagination';
import './pagination.scss';

const paginations = document.querySelectorAll('.js-pagination');
paginations.forEach((pagination) => new Pagination(pagination));
