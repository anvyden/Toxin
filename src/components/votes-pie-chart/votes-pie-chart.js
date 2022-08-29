import declination from '~/components/dropdown/utils/declination';

class PieChart {
  constructor(root, items) {
    this.root = root;
    this.items = items;
    this._init();
  }

  _init() {
    this.root.insertAdjacentHTML('afterbegin', PieChart.getMainTemplate());
    this.totalVotes = this._getTotalVotes();

    this._addChartElements();
    this._addEventsListeners();
  }

  _getTotalVotes() {
    return this.items.reduce((votes, item) => item.votesAmount + votes, 0);
  }

  _addChartElements() {
    this.chartBody = this.root.querySelector('.js-pie-chart__body');
    this.legendBody = this.root.querySelector('.js-pie-chart__legend');
    this.votesBody = this.root.querySelector('.js-pie-chart__votes');

    this.legendBody.appendChild(this._createLegendList());

    let strokeDasharray = 0;
    let strokeDashoffset = 0;

    this.items.forEach((item, index) => {
      if (index === 0) {
        item.votesAmount === 0
          ? (strokeDashoffset = 0)
          : (strokeDashoffset = -2);
      } else {
        strokeDashoffset = -(-strokeDashoffset + strokeDasharray + 2);
      }

      strokeDasharray = (item.votesAmount / this.totalVotes) * 360;

      this.chartBody.insertAdjacentHTML(
        'afterbegin',
        PieChart.getLinearGradientTemplate(
          item.id,
          item.firstStopColor,
          item.secondStopColor
        )
      );
      this.chartBody.insertAdjacentHTML(
        'beforeend',
        PieChart.getLineTemplate(
          item.id,
          strokeDasharray,
          strokeDashoffset
        )
      );
      this.legendList.insertAdjacentHTML(
        'afterend',
        PieChart.getLegendItemTemplate(item.id, item.text)
      );
    });

    this.votesBody.innerHTML = PieChart.getVotesTemplate(this.totalVotes);
  }

  _createLegendList() {
    this.legendList = document.createElement('ul');
    this.legendList.classList.add('pie-chart__legend-list');

    return this.legendList;
  }

  _addEventsListeners() {
    this.root.addEventListener(
      'pointerover',
      this._handleChartFocus.bind(this)
    );
    this.root.addEventListener('pointerout', this._handleChartBlur.bind(this));
    this.root.addEventListener('focusin', this._handleChartFocus.bind(this));
    this.root.addEventListener('focusout', this._handleChartBlur.bind(this));
  }

  _handleChartFocus({ target }) {
    const { id } = target.dataset;

    if (id) {
      this.items.forEach((item) => {
        if (item.id === id) {
          this.votesBody.innerHTML = PieChart.getVotesTemplate(
            item.votesAmount
          );
          this.votesBody.classList.add(`pie-chart__votes--${id}`);

          const currentLine = this.chartBody.querySelector(`[data-id=${id}]`);
          currentLine.classList.add('pie-chart__line--focused');
        }
      });
    }
  }

  _handleChartBlur({ target }) {
    const { id } = target.dataset;
    this.votesBody.innerHTML = PieChart.getVotesTemplate(this.totalVotes);
    this.votesBody.classList.remove(`pie-chart__votes--${id}`);

    const currentLine = this.chartBody.querySelector(`[data-id=${id}]`);
    if (currentLine) currentLine.classList.remove('pie-chart__line--focused');
  }

  static getMainTemplate() {
    return `
      <div class='pie-chart__chart'>
        <svg class='pie-chart__body js-pie-chart__body' viewBox='0 0 120 120'></svg>
        <div class='pie-chart__votes js-pie-chart__votes'></div>
      </div>
      <div class='pie-chart__legend js-pie-chart__legend'></div>
    `;
  }

  static getLinearGradientTemplate(
    id = '',
    firstStopColor = '',
    secondStopColor = ''
  ) {
    return `
      <linearGradient id="${id}" x1='1' y1='0' x2='0' y2='0'>
        <stop offset="0%" stop-color=${firstStopColor}></stop>
        <stop offset="100%" stop-color=${secondStopColor}></stop>
      </linearGradient>
    `;
  }

  static getLineTemplate(id = '', strokeDasharray = '', strokeDashoffset = '') {
    return `
      <circle class='pie-chart__line' cx='50%' cy='50%' r='58' stroke-width='4' stroke='url(#${id})' data-id=${id} stroke-dasharray='${strokeDasharray}, 360' stroke-dashoffset='${strokeDashoffset}'></circle>
    `;
  }

  static getVotesTemplate(votes = 0) {
    return `
      <h1 class='pie-chart__votes-count'>${votes}</h1>
      <h3 class='pie-chart__votes-text'>${declination(votes, [
        'голос',
        'голоса',
        'голосов',
      ])}</h3>
    `;
  }

  static getLegendItemTemplate(id = '', text = '') {
    return `
      <li class='pie-chart__legend-item pie-chart__legend-item--${id}' data-id=${id} tabindex='0'>
        ${text}
      </li>
    `;
  }
}

export default PieChart;
