import declination from '~/components/dropdown/utils/declination';

class PieChart {
  constructor(root) {
    this.root = root;
    const { votes } = this.root.dataset;

    try {
      this.items = JSON.parse(votes);
    } catch (error) {
      throw new Error('failed to get votes data for PieChart class', error);
    }

    this._init();
  }

  _init() {
    this._getSelectors();
    this.root.insertAdjacentHTML('afterbegin', this._getMainTemplate());
    this.totalVotes = this._getTotalVotes();

    this._addChartElements();
    this._addEventsListeners();
  }

  _getSelectors() {
    this.chartClass = 'pie-chart__chart';
    this.chartBodyClass = 'pie-chart__body';
    this.chartLineClass = 'pie-chart__line';
    this.legendBodyClass = 'pie-chart__legend';
    this.legendListClass = 'pie-chart__legend-list';
    this.legendItemClass = 'pie-chart__legend-item';
    this.votesBodyClass = 'pie-chart__votes';
    this.votesCountClass = 'pie-chart__votes-count';
    this.votesTextClass = 'pie-chart__votes-text';

    this.chartLineFocusModifier = 'pie-chart__line--focused';

    this.chartBodySelector = `.js-${this.chartBodyClass}`;
    this.legendBodySelector = `.js-${this.legendBodyClass}`;
    this.votesBodySelector = `.js-${this.votesBodyClass}`;
  }

  _getTotalVotes() {
    return this.items.reduce((votes, item) => item.votesAmount + votes, 0);
  }

  _addChartElements() {
    this.chartBody = this.root.querySelector(this.chartBodySelector);
    this.legendBody = this.root.querySelector(this.legendBodySelector);
    this.votesBody = this.root.querySelector(this.votesBodySelector);

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
        this._getLinearGradientTemplate(
          item.id,
          item.firstStopColor,
          item.secondStopColor,
        ),
      );
      this.chartBody.insertAdjacentHTML(
        'beforeend',
        this._getLineTemplate(item.id, strokeDasharray, strokeDashoffset),
      );
      this.legendList.insertAdjacentHTML(
        'afterbegin',
        this._getLegendItemTemplate(item.id, item.text),
      );
    });

    this.votesBody.innerHTML = this._getVotesTemplate(this.totalVotes);
  }

  _createLegendList() {
    this.legendList = document.createElement('ul');
    this.legendList.classList.add(this.legendListClass);

    return this.legendList;
  }

  _addEventsListeners() {
    this.root.addEventListener(
      'pointerover',
      this._handleChartFocus.bind(this),
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
          this.votesBody.innerHTML = this._getVotesTemplate(item.votesAmount);
          this.votesBody.classList.add(`${this.votesBodyClass}--${id}`);

          const currentLine = this.chartBody.querySelector(`[data-id=${id}]`);
          currentLine.classList.add(this.chartLineFocusModifier);
        }
      });
    }
  }

  _handleChartBlur({ target }) {
    const { id } = target.dataset;
    this.votesBody.innerHTML = this._getVotesTemplate(this.totalVotes);
    this.votesBody.classList.remove(`${this.votesBodyClass}--${id}`);

    const currentLine = this.chartBody.querySelector(`[data-id=${id}]`);
    if (currentLine) currentLine.classList.remove(this.chartLineFocusModifier);
  }

  _getMainTemplate() {
    return `
      <div class='${this.chartClass}'>
        <svg class='${this.chartBodyClass} js-${this.chartBodyClass}' viewBox='0 0 120 120'></svg>
        <div class='${this.votesBodyClass} js-${this.votesBodyClass}'></div>
      </div>
      <div class='${this.legendBodyClass} js-${this.legendBodyClass}'></div>
    `;
  }

  _getLinearGradientTemplate(
    id = '',
    firstStopColor = '',
    secondStopColor = '',
  ) {
    return `
      <linearGradient id="${id}" x1='1' y1='0' x2='0' y2='0'>
        <stop offset="0%" stop-color=${firstStopColor}></stop>
        <stop offset="100%" stop-color=${secondStopColor}></stop>
      </linearGradient>
    `;
  }

  _getLineTemplate(id = '', strokeDasharray = '', strokeDashoffset = '') {
    return `
      <circle class='${this.chartLineClass}' cx='50%' cy='50%' r='58' stroke-width='4' stroke='url(#${id})' data-id=${id} stroke-dasharray='${strokeDasharray}, 360' stroke-dashoffset='${strokeDashoffset}'></circle>
    `;
  }

  _getVotesTemplate(votes = 0) {
    return `
      <h3 class='${this.votesCountClass}'>${votes}</h3>
      <h3 class='${this.votesTextClass}'>
        ${declination(
          votes,
          [
            'голос',
            'голоса',
            'голосов',
          ],
        )}
      </h3>
    `;
  }

  _getLegendItemTemplate(id = '', text = '') {
    return `
      <li class='${this.legendItemClass} ${this.legendItemClass}--${id}' data-id=${id} tabindex='0'>
        ${text}
      </li>
    `;
  }
}

export default PieChart;
