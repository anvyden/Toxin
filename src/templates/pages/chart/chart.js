class Chart {
  constructor(params) {
    this.params = params
    this.chartParams = {}
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

  _render(params) {
    const {
      chartVotesPerfectly,
      chartVotesWell,
      chartVotesSatisfactory,
      chartVotesDisappointed,
    } = this._getElements()

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
  }

  _getElements() {
    const chartVotesPerfectly = document.querySelector('.js-chart-item-votes-perfectly')
    const chartVotesWell = document.querySelector('.js-chart-item-votes-well')
    const chartVotesSatisfactory = document.querySelector('.js-chart-item-votes-satisfactory')
    const chartVotesDisappointed = document.querySelector('.js-chart-item-votes-disappointed')

    this.chartItems = {
      chartVotesPerfectly,
      chartVotesWell,
      chartVotesSatisfactory,
      chartVotesDisappointed,
    }

    return this.chartItems
  }
}

export default Chart
