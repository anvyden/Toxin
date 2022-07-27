class StarRating {
  constructor(selector, score) {
    this.starRating = document.querySelector(`${selector}`);
    this.score = score;
    this._render();
  }

  _render() {
    this._validate();
    this.rateList = [];

    for (let i = 0; i < 5; i++) {
      this.star = document.createElement('span');
      this.star.classList.add('star-rating__star', 'material-icons');
      if (i < this.score) {
        this.star.innerHTML = 'star';
      } else {
        this.star.innerHTML = 'star_border';
      }
      this.rateList.push(this.star);
    }

    this.rateList.forEach((item) => {
      this.starRating.appendChild(item);
    });
  }

  _validate() {
    this.score = Math.round(this.score);
  }
}

export default StarRating;
