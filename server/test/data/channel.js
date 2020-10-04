const Channel = require('../../data/channel')
const  Chat = require('../../data/chat')
const Score = require('../../data/score')


const score1 = new Score()
const chat1 = new Chat()
const channel1 = new Channel(score1, chat1)

channel1.addMsg({name: "mung1", chat: "test1"})
channel1.addMsg({name: "mung2", chat: "test2"})
channel1.addMsg({name: "mung3", chat: "test3"})
channel1.addMsg({name: "mung4", chat: "test4"})

channel1.addScore({name: "mung1", score: 11})
channel1.addScore({name: "mung2", score: 1})
channel1.addScore({name: "mung3", score: 20})
channel1.addScore({name: "mung4", score: 4})
channel1.addScore({name: "mung5", score: 4})

console.log(channel1.getChats())
console.log(channel1.getScores())