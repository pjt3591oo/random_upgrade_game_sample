class Score {
  constructor () {
    this.scores = []
  }

  add (score) {
    /*
      msg: {name, score}
    */

    this.scores.push(score)
    this.scores.sort(this._sort)
  }

  _sort(a, b) {
    if(a.score === b.score){ 
      return 0
    } 
    
    return a.score > b.score ? -1 : 1;
  }
}
module.exports = Score