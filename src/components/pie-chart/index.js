import PieChart from './PieChart';
import './pie-chart.scss';

const pieCharts = document.querySelectorAll('.js-pie-chart');
pieCharts.forEach((pieChart) => new PieChart(pieChart));
