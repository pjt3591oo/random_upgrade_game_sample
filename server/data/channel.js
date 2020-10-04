class Channel {
  constructor (score, chat) {
    this.score = score
    this.chat = chat
  }

  addMsg(msg) {
    /*
      msg: {name, chat}
    */

    this.chat.add(msg)
  }

  addScore(score) {
    /*
      msg: {name, score}
    */
    this.score.add(score)
  }

  getChats() {
    return this.chat.msgs
  }

  getScores() {
    return this.score.scores
  }
}

module.exports = Channel