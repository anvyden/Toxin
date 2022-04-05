import declination from '@form-elements/dropdown/utils/declination'

class VotesPieChart {
  constructor(params) {
    this.params = params
    this._render(params)
  }

  calculateChartLines(params) {
    const {
      perfectly,
      well,
      satisfactory,
      disappointed,
      total,
    } = params

    const disappointedLenght = (disappointed / total) * 364
    const satisfactoryLenght = (satisfactory / total) * 364
    const wellLenght = (well / total) * 364
    const perfectlyLenght = (perfectly / total) * 364

    const disappointedStrokeDasharray = `${disappointedLenght}, 364`
    const satisfactoryStrokeDasharray = `${satisfactoryLenght}, 364`
    const wellStrokeDasharray = `${wellLenght}, 364`
    const perfectlyStrokeDasharray = `${perfectlyLenght}, 364`

    const disappointedStrokeDashoffset = disappointedLenght ? -2 : 0
    const satisfactoryStrokeDashoffset = -((-disappointedStrokeDashoffset) + disappointedLenght + 2)
    const wellStrokeDashoffset = -((-satisfactoryStrokeDashoffset) + satisfactoryLenght + 2)
    const perfectlyStrokeDashoffset = -((-wellStrokeDashoffset) + wellLenght + 2)

    this.chartParams = {
      disappointedStrokeDasharray,
      satisfactoryStrokeDasharray,
      wellStrokeDasharray,
      perfectlyStrokeDasharray,
      disappointedStrokeDashoffset,
      satisfactoryStrokeDashoffset,
      wellStrokeDashoffset,
      perfectlyStrokeDashoffset,
    }

    return this.chartParams
  }

  handleLineClick() {
    this.lines = Object.values(this._getLines())
    this.clickHandlerLine = this.clickHandlerLine.bind(this)
    this.lines.forEach((line) => {
      line.addEventListener('click', this.clickHandlerLine)
    })
  }

  clickHandlerLine(event) {
    const { target } = event
    const { votesCount, votesText, votesWrapper } = this._getVotes()
    const {
      legendItemPerfectly,
      legendItemWell,
      legendItemSatisfactory,
      legendItemDisappointed,
    } = this._getLegendItems()

    const {
      perfectly,
      well,
      satisfactory,
      disappointed,
      total,
    } = this.params

    target.classList.toggle('votes-chart__chart-item--active')

    if (this.currentLine === undefined) {
      this.currentLine = target
    } else if (this.currentLine !== target) {
      this.currentLine.classList.remove('votes-chart__chart-item--active')
      votesWrapper.classList = 'votes-chart__chart-votes-wrapper js-chart-votes-wrapper'
      this.currentLine = target
    }

    switch (true) {
      case target.classList.contains('js-chart-item-votes-perfectly'):
        this.pasteVotes(perfectly, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--perfectly')
        this.currentLegend = legendItemPerfectly
        break
      case target.classList.contains('js-chart-item-votes-well'):
        this.pasteVotes(well, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--well')
        this.currentLegend = legendItemWell
        break
      case target.classList.contains('js-chart-item-votes-satisfactory'):
        this.pasteVotes(satisfactory, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--satisfactory')
        this.currentLegend = legendItemSatisfactory
        break
      case target.classList.contains('js-chart-item-votes-disappointed'):
        this.pasteVotes(disappointed, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--disappointed')
        this.currentLegend = legendItemDisappointed
        break
      default:
        this.pasteVotes(total, votesText, votesCount)
    }

    if (!this.lines.find((line) => line.classList.contains('votes-chart__chart-item--active'))) {
      this.pasteVotes(total, votesText, votesCount)
    }
  }

  handleLegendItemClick() {
    this.legendItems = Object.values(this._getLegendItems())
    this.clickHandlerLegendItem = this.clickHandlerLegendItem.bind(this)
    this.legendItems.forEach((item) => {
      item.addEventListener('click', this.clickHandlerLegendItem)
    })
  }

  clickHandlerLegendItem(event) {
    const { target } = event
    const {
      chartVotesPerfectly,
      chartVotesWell,
      chartVotesSatisfactory,
      chartVotesDisappointed,
    } = this._getLines()

    const { votesCount, votesText, votesWrapper } = this._getVotes()
    const {
      perfectly,
      well,
      satisfactory,
      disappointed,
      total,
    } = this.params

    if (this.currentLegend === undefined) {
      this.currentLegend = target
    } else if (this.currentLegend !== target) {
      this.currentLine.classList.remove('votes-chart__chart-item--active')
      votesWrapper.classList = 'votes-chart__chart-votes-wrapper js-chart-votes-wrapper'
      this.currentLegend = target
    }

    switch (true) {
      case target.classList.contains('js-chart-legend-perfectly'):
        this.pasteVotes(perfectly, votesText, votesCount)
        chartVotesPerfectly.classList.toggle('votes-chart__chart-item--active')
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--perfectly')
        this.currentLine = chartVotesPerfectly
        break
      case target.classList.contains('js-chart-legend-well'):
        this.pasteVotes(well, votesText, votesCount)
        chartVotesWell.classList.toggle('votes-chart__chart-item--active')
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--well')
        this.currentLine = chartVotesWell
        break
      case target.classList.contains('js-chart-legend-satisfactory'):
        this.pasteVotes(satisfactory, votesText, votesCount)
        chartVotesSatisfactory.classList.toggle('votes-chart__chart-item--active')
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--satisfactory')
        this.currentLine = chartVotesSatisfactory
        break
      case target.classList.contains('js-chart-legend-disappointed'):
        this.pasteVotes(disappointed, votesText, votesCount)
        chartVotesDisappointed.classList.toggle('votes-chart__chart-item--active')
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--disappointed')
        this.currentLine = chartVotesDisappointed
        break
      default:
        this.pasteVotes(total, votesText, votesCount)
    }

    if (!this.lines.find((line) => line.classList.contains('votes-chart__chart-item--active'))) {
      this.pasteVotes(total, votesText, votesCount)
    }
  }

  pasteVotes(votes, votesText, votesCount) {
    this.votesTextElements = {
      count: votesCount,
      text: votesText,
    }

    const names = ['голос', 'голоса', 'голосов']
    const votesTextDeclination = declination(votes, names)

    this.votesTextElements.count.innerHTML = votes
    this.votesTextElements.text.innerHTML = votesTextDeclination
  }

  _render(params) {
    const {
      chartVotesPerfectly,
      chartVotesWell,
      chartVotesSatisfactory,
      chartVotesDisappointed,
    } = this._getLines()

    const { votesCount } = this._getVotes()
    const { total } = params

    const {
      disappointedStrokeDasharray,
      satisfactoryStrokeDasharray,
      wellStrokeDasharray,
      perfectlyStrokeDasharray,
      disappointedStrokeDashoffset,
      satisfactoryStrokeDashoffset,
      wellStrokeDashoffset,
      perfectlyStrokeDashoffset,
    } = this.calculateChartLines(params)

    chartVotesDisappointed.setAttribute('stroke-dasharray', disappointedStrokeDasharray)
    chartVotesSatisfactory.setAttribute('stroke-dasharray', satisfactoryStrokeDasharray)
    chartVotesWell.setAttribute('stroke-dasharray', wellStrokeDasharray)
    chartVotesPerfectly.setAttribute('stroke-dasharray', perfectlyStrokeDasharray)

    chartVotesDisappointed.setAttribute('stroke-dashoffset', disappointedStrokeDashoffset)
    chartVotesSatisfactory.setAttribute('stroke-dashoffset', satisfactoryStrokeDashoffset)
    chartVotesWell.setAttribute('stroke-dashoffset', wellStrokeDashoffset)
    chartVotesPerfectly.setAttribute('stroke-dashoffset', perfectlyStrokeDashoffset)

    votesCount.innerHTML = total

    this.handleLineClick()
    this.handleLegendItemClick()
  }

  _getLines() {
    const chartVotesPerfectly = document.querySelector('.js-chart-item-votes-perfectly')
    const chartVotesWell = document.querySelector('.js-chart-item-votes-well')
    const chartVotesSatisfactory = document.querySelector('.js-chart-item-votes-satisfactory')
    const chartVotesDisappointed = document.querySelector('.js-chart-item-votes-disappointed')

    this.chartLines = {
      chartVotesPerfectly,
      chartVotesWell,
      chartVotesSatisfactory,
      chartVotesDisappointed,
    }

    return this.chartLines
  }

  _getVotes() {
    this.chartVotes = {
      votesCount: document.querySelector('.js-chart-votes-count'),
      votesText: document.querySelector('.js-chart-votes-text'),
      votesWrapper: document.querySelector('.js-chart-votes-wrapper'),
    }

    return this.chartVotes
  }

  _getLegendItems() {
    this.chartLegendItems = {
      legendItemPerfectly: document.querySelector('.js-chart-legend-perfectly'),
      legendItemWell: document.querySelector('.js-chart-legend-well'),
      legendItemSatisfactory: document.querySelector('.js-chart-legend-satisfactory'),
      legendItemDisappointed: document.querySelector('.js-chart-legend-disappointed'),
    }

    return this.chartLegendItems
  }
}

export default VotesPieChart
