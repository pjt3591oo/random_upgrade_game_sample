class Chat{
  
  constructor () {
    this.msgs = []  
  }

  add (msg) {
    /*
      msg: {name, chat}
    */
    this.msgs.push(msg)
  }
}

module.exports = Chat