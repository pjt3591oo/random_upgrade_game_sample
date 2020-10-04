import io from 'socket.io-client'

import { onScoreInit } from '../state/modules/score'
import { onChatInit } from '../state/modules/chat'
import { onChannelInit } from '../state/modules/channel'

const SOCKET = {
  IP: "127.0.0.1",
  PORT: "3000"
}

class Socket {
  constructor () {
    this.URL = `http://${SOCKET.IP}:${SOCKET.PORT}?data=KRW-BTC`
    this.socket = io(this.URL)
    
    this.store = null

    console.log("[SOCKET] CONNECTED: ", this.URL, )
  }

  setStore (store) {
    this.store = store
    
    this.onChat()
    this.onScore()
    this.onGameData()
  }

  gameInit (channel, name) {
    this.store.dispatch(onChannelInit(channel, name))
    this.socket.emit('/channel', {channel, name})
  }

  onChat () {
    this.socket.on('/chat/complete', data => {
      let { chats } = data
      this.store.dispatch(onChatInit(chats))
    })
  }

  onScore () {
    this.socket.on('/rank/complete', data => {
      let { scores } = data
      
      this.store.dispatch(onScoreInit(scores))
    })
  }

  onGameData () {
    this.socket.on('/channel/complete', data => {
      let { chats, scores } = data
      console.log(data)
      this.store.dispatch(onScoreInit(scores))
      this.store.dispatch(onChatInit(chats))
    })
  }

  emitChat (name, chat) {
    this.socket.emit('/chat', {name, chat})
  }

  emitScore (name, score) {
    this.socket.emit('/rank', {name, score})
  }

  emitOut (name) {
    this.socket.emit('/out', {name})
  }
}

const s = new Socket()

export default s