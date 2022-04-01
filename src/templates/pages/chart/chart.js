import declination from '@form-elements/dropdown/utils/declination'

class Chart {
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
      perfectly,
      well,
      satisfactory,
      disappointed,
      total,
    } = this.params
    console.log(target)
    target.classList.toggle('votes-chart__chart-item--active')

    if (this.currentTarget === undefined) {
      this.currentTarget = target
    } else if (this.currentTarget !== target) {
      this.currentTarget.classList.remove('votes-chart__chart-item--active')
      votesWrapper.classList = 'votes-chart__chart-votes-wrapper js-chart-votes-wrapper'
      this.currentTarget = target
    }

    switch (true) {
      case target.classList.contains('js-chart-item-votes-perfectly'):
        this.pasteVotes(perfectly, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--perfectly')
        break
      case target.classList.contains('js-chart-item-votes-well'):
        this.pasteVotes(well, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--well')
        break
      case target.classList.contains('js-chart-item-votes-satisfactory'):
        this.pasteVotes(satisfactory, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--satisfactory')
        break
      case target.classList.contains('js-chart-item-votes-disappointed'):
        this.pasteVotes(disappointed, votesText, votesCount)
        votesWrapper.classList.toggle('votes-chart__chart-votes-wrapper--disappointed')
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
}

export default Chart
